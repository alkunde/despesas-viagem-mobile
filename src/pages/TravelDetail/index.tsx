import React, { useRef, useCallback, useState } from 'react';
import { ScrollView, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Yup from 'yup';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { TravelProps } from '../../components/Travel';
import { Container, Content } from './styles';

interface RouteParams {
  travelSelected: TravelProps;
}

interface TravelFormData {
  origin: string;
  destination: string;
  departureDate: Date;
  departureYear: number;
  departureMonth: number;
  departureDay: number;
  arrivalDate: Date;
  arrivalYear: number;
  arrivalMonth: number;
  arrivalDay: number;
  reason: string;
  advancedAmount: number;
  user?: object;
}

const TravelDetail: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [showDepartureDatePicker, setShowDepartureDatePicker] = useState(false);
  const [showArrivalDatePicker, setShowArrivalDatePicker] = useState(false);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(new Date());

  const formRef = useRef<FormHandles>(null);

  const handleAddTravel = useCallback(async (data: TravelFormData) => {
    console.log(`departure ${departureDate}`);
    console.log(`arrival ${arrivalDate}`);
    if (departureDate > arrivalDate) {
      console.log('entrou');
      formRef.current?.setFieldError('departureDate', 'Data de partida não pode ser maior');
      return;
    }

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        origin: Yup.string().required('Campo obrigatório'),
        destination: Yup.string().required('Campo obrigatório'),
        // departureDate: Yup.date().required('Campo obrigatório'),
        // arrivalDate: Yup.date().required('Campo obrigatório'),
        reason: Yup.string().required('Campo obrigatório'),
        // advancedAmount: Yup.number(),
      });

      Keyboard.dismiss();
      setLoading(true);

      await schema.validate(data, {
        abortEarly: false,
      });

      data.user = user;
      data.advancedAmount = 0;
      data.departureYear = departureDate.getFullYear();
      data.departureMonth = departureDate.getMonth() + 1;
      data.departureDay = departureDate.getDate();
      data.arrivalYear = arrivalDate.getFullYear();
      data.arrivalMonth = arrivalDate.getMonth() + 1;
      data.arrivalDay = arrivalDate.getDate();

      await api.post('/travels', data);

      Alert.alert(
        'Sucesso',
        'Viagem cadastrada com sucesso!'
      );
      navigation.goBack();
    } catch (err) {
      setLoading(false);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        console.log(errors);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Falha de conexão',
        'Tente novamente mais tarde',
      );
    }
  }, [navigation]);

  const handleCancelDepartureDate = useCallback(() => {
    setShowDepartureDatePicker(false);
  }, []);

  const handleCancelArrivalDate = useCallback(() => {
    setShowArrivalDatePicker(false);
  }, []);

  const handleConfirmDepartureDate = useCallback((data) => {
    setDepartureDate(data);
    formRef.current?.setFieldValue('departureDate', data.toLocaleDateString('pt-BR'));

    setShowDepartureDatePicker(false);
  }, []);

  const handleConfirmArrivalDate = useCallback((data) => {
    setArrivalDate(data);
    formRef.current?.setFieldValue('arrivalDate', data.toLocaleDateString('pt-BR'));

    setShowArrivalDatePicker(false);
  }, []);

  return (
    <Container>
      <Header>Viagem</Header>
      <Content>
        <ScrollView>
          <Form ref={formRef} onSubmit={handleAddTravel}>
            <Input
              autoCapitalize="words"
              name="origin"
              placeholder="Informe a cidade de origem"
              returnKeyType="next"
            />
            <Input
              autoCapitalize="words"
              name="destination"
              placeholder="Informe a cidade de destino"
              returnKeyType="next"
            />
            <Input
              name="departureDate"
              placeholder="Informe a data de partida"
              onPressIn={() => setShowDepartureDatePicker(true)}
            />
            <Input
              name="arrivalDate"
              placeholder="Informe a data de chegada"
              onPressIn={() => setShowArrivalDatePicker(true)}
            />
            <Input
              autoCapitalize="sentences"
              name="reason"
              placeholder="Informe o motivo"
              returnKeyType="next"
            />
            <Input
              keyboardType="decimal-pad"
              name="advancedAmount"
              placeholder="Informe o valor adiantado"
              returnKeyType="done"
            />
          </Form>
        </ScrollView>
        <Button
          loading={loading}
          onPress={() => formRef.current?.submitForm()}
        >
          Cadastrar
        </Button>
      </Content>

      <DateTimePickerModal
        cancelTextIOS="Cancelar"
        confirmTextIOS="Confirmar"
        isVisible={showDepartureDatePicker}
        mode="date"
        date={departureDate}
        onConfirm={data => handleConfirmDepartureDate(data)}
        onCancel={handleCancelDepartureDate}
      />

      <DateTimePickerModal
        cancelTextIOS="Cancelar"
        confirmTextIOS="Confirmar"
        isVisible={showArrivalDatePicker}
        mode="date"
        date={arrivalDate}
        onConfirm={data => handleConfirmArrivalDate(data)}
        onCancel={handleCancelArrivalDate}
      />

    </Container>
  );
}

export default TravelDetail;

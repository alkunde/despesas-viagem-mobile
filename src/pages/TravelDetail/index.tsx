import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
  ScrollView,
  TextInput,
  Keyboard,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { CostCenterProps } from '../../components/CostCenter';
// import { TravelProps } from '../../components/Travel';

import {
  Container,
  Content,
  HeaderModal,
  HeaderTitle,
  BackButton,
  ItemList,
} from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  amount: number;
  costCenter: CostCenterProps;
  user?: object;
}

const TravelDetail: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [showDepartureDatePicker, setShowDepartureDatePicker] = useState(false);
  const [showArrivalDatePicker, setShowArrivalDatePicker] = useState(false);
  const [costCenters, setCostCenters] = useState<CostCenterProps[]>([]);
  const [costCenter, setCostCenter] = useState({} as CostCenterProps);
  const [showPicker, setShowPicker] = useState(false);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(new Date());

  const formRef = useRef<FormHandles>(null);
  const advancedAmountRef = useRef<TextInput>(null);

  useEffect(() => {
    async function loadCostCenters() {
      const response = await api.get('/cost_centers');

      setCostCenters(response.data);
    }

    loadCostCenters();
  }, []);

  const toFloatNumber = useCallback((value: String) => {
    const str = value.trim().replace(/([^0-9])/g, '');
    const numero = parseInt(str) / 100;

    return numero;
  }, []);


  const handleAddTravel = useCallback(async (data: TravelFormData) => {
    if (departureDate > arrivalDate) {
      formRef.current?.setFieldError('departureDate', 'Data de partida não pode ser maior');
      return;
    }

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        origin: Yup.string().required('Campo obrigatório'),
        destination: Yup.string().required('Campo obrigatório'),
        arrivalDate: Yup.string().required('Campo obrigatório'),
        departureDate: Yup.string().required('Campo obrigatório'),
        reason: Yup.string().required('Campo obrigatório'),
        costCenter: Yup.string().required('Campo obrigatório'),
      });

      Keyboard.dismiss();
      setLoading(true);

      await schema.validate(data, {
        abortEarly: false,
      });

      data.user = user;
      data.amount = toFloatNumber(formRef.current?.getFieldValue('advancedAmount'));
      data.departureYear = departureDate.getFullYear();
      data.departureMonth = departureDate.getMonth() + 1;
      data.departureDay = departureDate.getDate();
      data.arrivalYear = arrivalDate.getFullYear();
      data.arrivalMonth = arrivalDate.getMonth() + 1;
      data.arrivalDay = arrivalDate.getDate();
      data.costCenter = costCenter;

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

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Falha de conexão',
        'Tente novamente mais tarde',
      );
    }
  }, [navigation, costCenter]);

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

  const changeAdvancedAmountValue = useCallback((text: String) => {
    const str = text.toString().trim().replace(/([^0-9])/g, '');
    const numero = parseInt(str) / 100;
    const converted = numero.toLocaleString(
      'pt-BR',
      { style: 'currency', currency: 'BRL' }
    );
    formRef.current?.setFieldValue('advancedAmount', converted);
  }, []);

  const handleItemSelected = useCallback((item: CostCenterProps) => {
    formRef.current?.setFieldValue('costCenter', item.description);
    setCostCenter(item);
    setShowPicker(false);
  }, []);

  return (
    <Container>
      <Header>Viagem</Header>
      <Content>
        <ScrollView showsVerticalScrollIndicator={false}>
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
              onSubmitEditing={() => advancedAmountRef.current?.focus()}
            />
            <Input
              ref={advancedAmountRef}
              keyboardType="numeric"
              name="advancedAmount"
              onChangeText={text => changeAdvancedAmountValue(text)}
              placeholder="Informe o valor adiantado"
              returnKeyType="next"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            <Input
              name="costCenter"
              placeholder="Selecione o centro de custo"
              onPressIn={() => setShowPicker(true)}
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

      <Modal
        animationType={"slide"}
        presentationStyle="formSheet"
        visible={showPicker}
      >
        <>
          <HeaderModal>
            <BackButton onPress={() => setShowPicker(false)}>
              <Icon name="chevron-left" color="#000" size={25} />
            </BackButton>
            <HeaderTitle>Centros de custo</HeaderTitle>
          </HeaderModal>
          <FlatList
            data={costCenters}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleItemSelected(item)}>
                <ItemList>{item.description}</ItemList>
              </TouchableOpacity>
            )}
          />
        </>
      </Modal>

    </Container>
  );
}

export default TravelDetail;

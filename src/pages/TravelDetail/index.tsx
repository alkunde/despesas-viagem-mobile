import React, { useRef, useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, Keyboard, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
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
  arrivalDate: Date;
  reason: string;
  advancedAmount: number;
  user?: object;
}

const TravelDetail: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const routeParams = route.params as RouteParams;
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const handleAddTravel = useCallback(async (data: TravelFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        origin: Yup.string().required('Campo obrigatório'),
        destination: Yup.string().required('Campo obrigatório'),
        departureDate: Yup.date().required('Campo obrigatório'),
        arrivalDate: Yup.date().required('Campo obrigatório'),
        reason: Yup.string().required('Campo obrigatório'),
      });

      Keyboard.dismiss();
      setLoading(true);

      await schema.validate(data, {
        abortEarly: false,
      });

      data.user = user;
      data.arrivalDate = new Date();
      data.departureDate = new Date();
      data.advancedAmount = 0;

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
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              name="arrivalDate"
              placeholder="Informe a data de partida"
            />
            <Input
              name="departureDate"
              placeholder="Informe a data de chegada"
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
              returnKeyType="next"
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
    </SafeAreaView>
  );
}

export default TravelDetail;

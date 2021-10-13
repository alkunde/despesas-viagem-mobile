import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Keyboard, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { LedgerAccountProps } from '../../components/LedgerAccount';

import { Container, Content } from './styles';

interface RouteParams {
  ledgerAccountSelected: LedgerAccountProps;
}

const LedgerAccountDetail: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (routeParams.ledgerAccountSelected.id) {
      formRef.current?.setData({
        code: routeParams.ledgerAccountSelected.code,
        description: routeParams.ledgerAccountSelected.description,
      });
    }
  }, []);

  const handleAddLedgerAccount = useCallback(async (data: LedgerAccountProps) => {
    if (loading) return;

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        code: Yup.string().required('Campo obrigatório'),
        description: Yup.string().required('Campo obrigatório'),
      });

      Keyboard.dismiss();
      setLoading(true);

      await schema.validate(data, {
        abortEarly: false,
      });

      if (routeParams.ledgerAccountSelected.id) {
        await api.put(`/ledger_accounts/${routeParams.ledgerAccountSelected.id}`, data);
      } else {
        await api.post('/ledger_accounts', data);
      }

      Alert.alert('Sucesso', 'Conta contábil salva!');

      navigation.goBack();
    } catch (err) {
      setLoading(false);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert('Falha de conexão', 'Tente novamente mais tarde');
    }
  }, [navigation]);

  return (
    <Container>
      <Header>Conta Contábil</Header>
      <Content>
        <Form ref={formRef} onSubmit={handleAddLedgerAccount}>
          <Input
            name="code"
            placeholder="Informe o código"
            returnKeyType="done"
          />
          <Input
            autoCapitalize="words"
            name="description"
            placeholder="Informe a descrição"
            returnKeyType="done"
          />
        </Form>

        <Button
          loading={loading}
          onPress={() => formRef.current?.submitForm()}
        >
          Salvar
        </Button>
      </Content>
    </Container>
  );
}

export default LedgerAccountDetail;

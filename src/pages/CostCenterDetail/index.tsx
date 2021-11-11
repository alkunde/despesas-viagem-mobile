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
import { CostCenterProps } from '../../components/CostCenter';

import { Container, Content } from './styles';

interface RouteParams {
  costCenterSelected: CostCenterProps;
}

const CostCenterDetail: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (routeParams.costCenterSelected.id) {
      formRef.current?.setData({
        code: routeParams.costCenterSelected.code,
        description: routeParams.costCenterSelected.description,
      });
    }
  }, []);

  const handleAddCostCenter = useCallback(
    async (data: CostCenterProps) => {
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

        if (routeParams.costCenterSelected.id) {
          await api.put(
            `/cost_centers/${routeParams.costCenterSelected.id}`,
            data,
          );
        } else {
          await api.post('/cost_centers', data);
        }

        Alert.alert('Sucesso', 'Centro de Custo salvo!');

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
    },
    [navigation],
  );

  return (
    <Container>
      <Header>Centro de Custo</Header>
      <Content>
        <Form ref={formRef} onSubmit={handleAddCostCenter}>
          <Input
            name="code"
            keyboardType="number-pad"
            placeholder="Informe o código"
            returnKeyType="next"
          />
          <Input
            autoCapitalize="words"
            name="description"
            placeholder="Informe a descrição"
            returnKeyType="done"
          />
          <Button
            loading={loading}
            onPress={() => formRef.current?.submitForm()}
          >
            Salvar
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CostCenterDetail;

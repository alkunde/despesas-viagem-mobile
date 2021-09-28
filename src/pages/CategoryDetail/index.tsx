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
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import { CategoryProps } from '../../components/Category';

import { Container, Content } from './styles';

interface RouteParams {
  categorySelected: CategoryProps;
}

const CategoryDetail: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (routeParams.categorySelected.id) {
      formRef.current?.setData({
        description: routeParams.categorySelected.description,
      });
    }
  }, []);

  const handleAddCategory = useCallback(async (data: CategoryProps) => {
    if (loading) return;

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        description: Yup.string().required('Campo obrigatório'),
      });

      Keyboard.dismiss();
      setLoading(true);

      await schema.validate(data, {
        abortEarly: false,
      });

      if (routeParams.categorySelected.id) {
        data.id = routeParams.categorySelected.id;
        await api.put('/categories', data);
      } else {
        await api.post('/categories', data);
      }

      Alert.alert(
        'Sucesso',
        'Categoria salva!'
      );

      navigation.goBack();
    } catch (err) {
      setLoading(false);
      if (err instanceof Yup.ValidationError) {
        console.log(err);
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
    <Container>
      <Header>Categoria</Header>
      <Content>
        <Form ref={formRef} onSubmit={handleAddCategory}>
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

export default CategoryDetail;

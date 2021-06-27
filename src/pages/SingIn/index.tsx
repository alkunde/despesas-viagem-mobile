import React, { useCallback, useRef } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/core';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container, Title
} from './styles';
import api from '../../services/api';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        console.log(data);
        console.log("Teste");
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        console.log(data);
        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais',
        );
      }
    }, [signIn]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <Container>
          <View>
            <Title>Faça login</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSignIn}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
            />
            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="password"
              icon="lock"
              placeholder="Senha"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <Button onPress={() => formRef.current?.submitForm()}>
              Entrar
            </Button>
          </Form>
        </Container>
        {/* <Form ref={formRef} onSubmit={() => { }}>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          name="email"
          placeholder="E-mail"
          returnKeyType="next"
        />
        <Input
          ref={passwordInputRef}
          secureTextEntry
          name="password"
          placeholder="Senha"
          returnKeyType="send"
        />

        <Button onPress={() => formRef.current?.submitForm()}>
          Entrar
        </Button>
      </Form> */}
      </View>
    </>
  );
};

export default SignIn;

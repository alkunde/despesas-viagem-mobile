import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Keyboard, Alert, Modal, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { CategoryProps } from '../../components/Category';
import { LedgerAccountProps } from '../../components/LedgerAccount';

import {
  Container,
  Content,
  HeaderModal,
  BackButton,
  HeaderTitle,
  ItemList,
} from './styles';

interface RouteParams {
  categorySelected: CategoryProps;
}

const CategoryDetail: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [ledgerAccounts, setLedgerAccounts] = useState<LedgerAccountProps[]>([]);
  const [ledgerAccount, setLedgerAccount] = useState({} as LedgerAccountProps);

  useEffect(() => {
    async function loadLedgerAccounts() {
      const response = await api.get('/ledger_accounts');

      setLedgerAccounts(response.data);
    };

    loadLedgerAccounts();

    if (routeParams.categorySelected.id) {
      formRef.current?.setData({
        description: routeParams.categorySelected.description,
        ledgerAccount: routeParams.categorySelected.ledgerAccount.description,
      });
    }
  }, []);

  const handleAddCategory = useCallback(async (data: CategoryProps) => {
    if (loading) return;

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        description: Yup.string().required('Campo obrigatório'),
        ledgerAccount: Yup.string().required('Campo obrigatório'),
      });

      Keyboard.dismiss();
      setLoading(true);

      await schema.validate(data, {
        abortEarly: false,
      });

      data.ledgerAccount = ledgerAccount;

      console.log(data);
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
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
      console.log(err);

      Alert.alert(
        'Falha de conexão',
        'Tente novamente mais tarde',
      );
    }
  }, [navigation, ledgerAccount]);

  const handleItemSelected = useCallback((item: LedgerAccountProps) => {
    formRef.current?.setFieldValue('ledgerAccount', item.description);
    setLedgerAccount(item);
    setShowPicker(false);
  }, [ledgerAccount]);

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
          <Input
            name="ledgerAccount"
            placeholder="Selecione a conta contábil"
            onPressIn={() => setShowPicker(true)}
          />
        </Form>
        <Button
          loading={loading}
          onPress={() => formRef.current?.submitForm()}
        >
          Salvar
        </Button>
      </Content>

      <Modal
        animationType={"slide"}
        presentationStyle="formSheet"
        visible={showPicker}
        onRequestClose={() => {
          Alert.alert('Modal is closed');
        }}
      >
        <>
          <HeaderModal>
            <BackButton onPress={() => setShowPicker(false)}>
              <Icon name="chevron-left" color="#000" size={25} />
            </BackButton>
            <HeaderTitle>Contas Contábeis</HeaderTitle>
          </HeaderModal>
          <FlatList
            data={ledgerAccounts}
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

export default CategoryDetail;

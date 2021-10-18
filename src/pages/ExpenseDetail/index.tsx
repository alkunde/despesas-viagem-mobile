import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Alert,
  Keyboard,
  ScrollView,
  TextInput,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

import {
  Container,
  Content,
  HeaderModal,
  BackButton,
  HeaderTitle,
  ItemList,
} from './styles';

import { CategoryProps, ExpenseProps } from '../../components/Expense';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface RouteParams {
  expenseSelected: ExpenseProps;
}

interface ExpenseFormData {
  id?: number;
  description: string;
  amount: number;
  category: CategoryProps;
  expenseDate: Date;
  day: number;
  month: number;
  year: number;
  user?: object;
}

const ExpenseDetail: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const routeParams = route.params as RouteParams;
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [category, setCategory] = useState({} as CategoryProps);
  const [expenseDate, setExpenseDate] = useState(new Date());

  const formRef = useRef<FormHandles>(null);
  const amountRef = useRef<TextInput>(null);

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const response = await api.get('/categories');

      setCategories(response.data);
    }

    loadCategories();

    if (routeParams.expenseSelected.id) {
      const { expenseSelected } = routeParams;
      setExpenseDate(new Date(expenseSelected.expenseDate));

      formRef.current?.setData({
        description: expenseSelected.description,
        amount: toCurrency(expenseSelected.amount),
        category: expenseSelected.category.description,
        expenseDate: expenseDate.toLocaleDateString('pt-BR'),
      });
      // formRef.current?.setFieldValue('amount', toCurrency(expenseSelected.amount));
      setCategory(expenseSelected.category);
    } else {
      formRef.current?.setFieldValue('expenseDate', expenseDate.toLocaleDateString('pt-BR'))
    }
  }, []);

  const toCurrency = useCallback((value: number) => {
    const newNumber = parseFloat(value.toString()).toFixed(2);
    const str = newNumber.toString().trim().replace(/([^0-9])/g, '');
    const numero = parseInt(str) / 100;

    return numero.toLocaleString(
      'pt-BR',
      { style: 'currency', currency: 'BRL' }
    );
  }, []);

  const toFloatNumber = useCallback((value: String) => {
    const str = value.trim().replace(/([^0-9])/g, '');
    const numero = parseInt(str) / 100;

    return numero;
  }, []);

  const handleConfirmDate = useCallback((data: Date) => {
    setExpenseDate(data);
    formRef.current?.setFieldValue('expenseDate', data.toLocaleDateString('pt-BR'));

    setShowDatePicker(false);
  }, []);

  const handleCancelDate = useCallback(() => {
    setShowDatePicker(false);
  }, []);

  const handleAddExpense = useCallback(async (data: ExpenseFormData) => {
    if (loading) return;

    const teste = toFloatNumber(formRef.current?.getFieldValue('amount'));
    if (!teste || teste <= 0) {
      Keyboard.dismiss();
      formRef.current?.setFieldError('amount', 'Valor deve ser maior que 0');
      return;
    }

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        description: Yup.string().required('Campo obrigatório'),
        category: Yup.string().required('Campo obrigatório'),
      });

      Keyboard.dismiss();
      setLoading(true);

      await schema.validate(data, {
        abortEarly: false,
      });

      data.user = user;
      data.day = expenseDate.getDate();
      data.month = expenseDate.getMonth() + 1;
      data.year = expenseDate.getFullYear();
      data.category = category;
      data.amount = toFloatNumber(formRef.current?.getFieldValue('amount'));

      if (routeParams.expenseSelected.id) {
        data.id = routeParams.expenseSelected.id;
        await api.put(`/expenses/${data.id}`, data);
      } else {
        await api.post('/expenses', data);
      }

      Alert.alert(
        'Sucesso',
        'Despesa cadastrada!',
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
  }, [navigation, category]);

  const changeAmountValue = useCallback((text: String) => {
    const str = text.toString().trim().replace(/([^0-9])/g, '');
    const numero = parseInt(str) / 100;
    const converted = numero.toLocaleString(
      'pt-BR',
      { style: 'currency', currency: 'BRL' }
    );
    formRef.current?.setFieldValue('amount', converted);
  }, []);

  const handleItemSelected = useCallback((item: CategoryProps) => {
    formRef.current?.setFieldValue('category', item.description);
    setCategory(item);
    setShowPicker(false);
  }, []);

  return (
    <Container>
      <Header>Despesa</Header>
      <Content>
        <ScrollView>
          <Form ref={formRef} onSubmit={handleAddExpense}>
            <Input
              autoCapitalize="words"
              name="description"
              placeholder="Informe a descrição"
              returnKeyType="next"
              onSubmitEditing={() => amountRef.current?.focus()}
            />
            <Input
              ref={amountRef}
              keyboardType="numeric"
              name="amount"
              onChangeText={text => changeAmountValue(text)}
              placeholder="Informe o valor"
              returnKeyType="next"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            <Input
              name="category"
              placeholder="Selecione a categoria"
              onPressIn={() => setShowPicker(true)}
            />
            <Input
              name="expenseDate"
              placeholder="Informe a data"
              onPressIn={() => setShowDatePicker(true)}
            />
          </Form>
        </ScrollView>

        <Button
          loading={loading}
          onPress={() => formRef.current?.submitForm()}
        >
          Salvar
        </Button>
      </Content>

      <DateTimePickerModal
        cancelTextIOS="Cancelar"
        confirmTextIOS="Confirmar"
        headerTextIOS="Selecionar data"
        isVisible={showDatePicker}
        mode="date"
        date={expenseDate}
        onConfirm={data => handleConfirmDate(data)}
        onCancel={handleCancelDate}
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
            <HeaderTitle>Categorias</HeaderTitle>
          </HeaderModal>
          <FlatList
            data={categories}
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

export default ExpenseDetail;

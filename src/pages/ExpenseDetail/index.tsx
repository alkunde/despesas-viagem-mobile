import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  View,
  TextInput,
  Text,
  Modal,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Yup from 'yup';

import { Container } from './styles';

import { CategoryProps, ExpenseProps } from '../../components/Expense';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import { formatDate } from '../../utils/format';

interface RouteParams {
  expenseSelected: ExpenseProps;
}

interface ExpenseFormData {
  id?: number;
  description: string;
  amount: number;
  category: CategoryProps;
  expenseDate: Date;
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
  const [categories, setCategories] = useState(null);
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
      const date = new Date(routeParams.expenseSelected.expenseDate);

      formRef.current?.setData({
        description: routeParams.expenseSelected.description,
        amount: routeParams.expenseSelected.amount.toString(),
        category: routeParams.expenseSelected.category.description,
        expenseDate: routeParams.expenseSelected.expenseDate
        // expenseDate: date.toLocaleDateString("pt-BR")
      });
      setCategory(routeParams.expenseSelected.category);
      setExpenseDate(date);
    } else {
      formRef.current?.setFieldValue('expenseDate', expenseDate.toLocaleDateString("pt-BR"))
    }
  }, []);

  const handleConfirmDate = useCallback((data: Date) => {
    formRef.current?.setFieldValue('expenseDate', data.toLocaleDateString("pt-BR"));

    setShowDatePicker(false);
  }, []);

  const handleCancelDate = useCallback(() => {
    setShowDatePicker(false);
  }, []);

  const handleAddExpense = useCallback(async (data: ExpenseFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        description: Yup.string().required('Campo obrigatório'),
        amount: Yup.number().min(0.01).required('Campo obrigatório'),
        category: Yup.string().required('Campo obrigatório'),
        expenseDate: Yup.date().max(new Date()).required('Data não pode ser futura'),
      });

      Keyboard.dismiss();
      setLoading(true);

      await schema.validate(data, {
        abortEarly: false,
      });

      data.user = user;
      data.expenseDate = expenseDate;

      if (routeParams.expenseSelected.id) {
        data.id = routeParams.expenseSelected.id;
        data.category = category;
        await api.put('/expenses', data);
      } else {
        data.category = category;
        await api.post('/expenses', data);
      }

      Alert.alert(
        'Cadastro realizado com sucesso!',
        'Você já pode fazer login',
      );

      navigation.goBack();
    } catch (err) {
      console.log(err);
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

  const handleItemSelected = useCallback((item: CategoryProps) => {
    formRef.current?.setFieldValue('category', item.description);
    setCategory(item);
    setShowPicker(false);
  }, []);

  return (
    <SafeAreaView>
      <Header>Despesa</Header>
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
          placeholder="Informe o valor"
          returnKeyType="next"
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <Input
          name="category"
          placeholder="Informe a categoria"
          onPressIn={() => setShowPicker(true)}
        />
        <Input
          name="expenseDate"
          placeholder="Informe a data"
          onPressIn={() => setShowDatePicker(true)}
        />

        <Button
          loading={loading}
          onPress={() => formRef.current?.submitForm()}
        >
          Cadastrar
        </Button>
      </Form>

      <DateTimePickerModal
        cancelTextIOS="Cancelar"
        confirmTextIOS="Confirmar"
        headerTextIOS="Selecionar data"
        isVisible={showDatePicker}
        mode="date"
        onConfirm={data => handleConfirmDate(data)}
        onCancel={handleCancelDate}
      />

      <Modal
        animationType={"slide"}
        presentationStyle="formSheet"
        visible={showPicker}
        onRequestClose={() => {
          Alert.alert('Modal is closed');
        }}>
        <>
          <View style={{ flexDirection: 'row', height: 46, alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                width: 46,
                height: 46,
                marginLeft: 16,
                marginRight: 16,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => setShowPicker(false)}
            >
              <Icon name="chevron-left" color="#000" size={25} />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontSize: 22 }}>Categorias</Text>
          </View>
          <FlatList
            data={categories}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleItemSelected(item)}>
                <Text style={{ padding: 16, fontSize: 16 }}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      </Modal>
    </SafeAreaView>
  );
}

export default ExpenseDetail;
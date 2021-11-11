import React, { useState, useCallback } from 'react';
import { View, FlatList, Alert, ActivityIndicator } from 'react-native';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';

import api from '../../services/api';

import Header from '../../components/Header';
import Button from '../../components/Button';
import NotFound from '../../components/NotFound';
import ServerDown from '../../components/ServerDown';
import { TravelExpense, ExpenseProps } from '../../components/Expense';
import { TravelProps } from '../../components/Travel';

import { Container, Content } from './styles';

interface RouteParams {
  travelSelected: TravelProps;
}

const TravelExpenses: React.FC = () => {
  const route = useRoute();
  const { travelSelected } = route.params as RouteParams;
  const title = `Relatório: ${travelSelected.id.toString()}`;

  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [expenseList, setExpenseList] = useState<ExpenseProps[]>([]);

  const { navigate, goBack } = useNavigation();

  const loadExpenses = useCallback(async id => {
    try {
      setLoading(true);
      const response = await api.get(`/travel/${id}`);

      setExpenseList(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setNetworkError(true);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadExpenses(travelSelected.id);
    }, []),
  );

  function handleAddExpenses() {
    if (sendLoading) return;

    if (
      travelSelected.status === 'aberto' ||
      travelSelected.status === 'reprovado'
    ) {
      navigate('ExpensesToTravel', { travelSelected });
    } else {
      Alert.alert('Aviso', 'Relatório não está disponível para alteração');
    }
  }

  async function handleSendTravel() {
    if (sendLoading) return;

    if (
      travelSelected.status === 'em aprovação' ||
      travelSelected.status === 'fechado'
    ) {
      Alert.alert('Aviso', 'Relatório já foi enviado');
      return;
    }

    if (expenseList && expenseList.length > 0) {
      setSendLoading(true);

      try {
        await api.patch(`/travels/${travelSelected.id}/approval`);

        Alert.alert('Sucesso', 'Relatório enviado com sucesso', [
          { text: 'OK', onPress: () => goBack() },
        ]);
      } catch (err) {
        Alert.alert('Aviso', 'Falha na operação', [
          { text: 'OK', onPress: () => setSendLoading(false) },
        ]);
      }
    } else {
      setSendLoading(false);
    }
  }

  async function handleDeleteExpense(item: ExpenseProps) {
    if (
      travelSelected.status === 'aprovado' ||
      travelSelected.status === 'em aprovação'
    ) {
      Alert.alert('Aviso', 'Não é possível alterar este relatório');
      return;
    }

    try {
      await api.patch(`/expenses/${item.id}/clear-travel`);
      loadExpenses(travelSelected.id);
    } catch (err) {
      Alert.alert('Aviso', 'Falha na conexão');
    }
  }

  return (
    <Container>
      <Header>{title}</Header>
      <Content>
        <View style={{ flexDirection: 'row' }}>
          <Button
            style={{ flex: 1, marginEnd: 8 }}
            onPress={handleAddExpenses}
            loading={false}
          >
            Adicionar
          </Button>
          <Button
            style={{ flex: 1, marginStart: 8 }}
            onPress={handleSendTravel}
            loading={sendLoading}
          >
            Enviar
          </Button>
        </View>
        {loading && (
          <ActivityIndicator
            style={{ marginTop: 16 }}
            size="large"
            color="#666"
          />
        )}
        {!loading && networkError && <ServerDown />}
        {!loading &&
          !networkError &&
          (!expenseList || expenseList.length === 0) && <NotFound />}
        {!loading && !networkError && (
          <FlatList
            style={{ marginTop: 8 }}
            data={expenseList}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <TravelExpense
                data={item}
                onPress={() => handleDeleteExpense(item)}
              />
            )}
          />
        )}
      </Content>
    </Container>
  );
};

export default TravelExpenses;

import React, { useState, useCallback } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';

import api from '../../services/api';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { TravelExpense, ExpenseProps } from '../../components/Expense';
import { TravelProps } from '../../components/Travel';

import { Container, Content } from './styles';

interface RouteParams {
  travelSelected: TravelProps;
}

const TravelExpenses: React.FC = () => {
  const route = useRoute();
  const { travelSelected } = route.params as RouteParams;
  const title: string = `Relatório: ${travelSelected.id.toString()}`

  const [loading, setLoading] = useState(false);
  const [expenseList, setExpenseList] = useState<ExpenseProps[]>([]);

  const { navigate, goBack } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      loadExpenses(travelSelected.id);
    }, [])
  );

  const loadExpenses = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await api.get("/expenses/travel/" + id);

      setExpenseList(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert(
        'Aviso',
        'Falha na conexão'
      );
    }
  }, []);

  function handleAddExpenses() {
    if (travelSelected.status === 'aberto') {
      navigate("ExpensesToTravel", { travelSelected });
    } else {
      Alert.alert(
        'Aviso',
        'Relatório não está disponível para alteração'
      );
    }
  }

  async function handleSendTravel() {
    if (travelSelected.status !== 'aberto') {
      Alert.alert(
        'Aviso',
        'Relatório já foi enviado'
      );
      return;
    }

    if (expenseList && expenseList.length > 0) {
      setLoading(true);

      try {
        await api.put(`/travels/${travelSelected.id}/to-approval`);

        Alert.alert(
          'Sucesso',
          'Relatório enviado com sucesso',
          [
            { text: "OK", onPress: () => goBack() }
          ]
        );
      } catch (err) {
        Alert.alert(
          'Aviso',
          'Falha na operação'
        );
      }
    } else {
      setLoading(false);
      Alert.alert(
        'Aviso',
        'Relatório sem despesas vinculadas'
      );
    }
  }

  async function handleDeleteExpense(item: ExpenseProps) {
    if (travelSelected.status !== 'aberto') {
      Alert.alert(
        'Aviso',
        'Não é possível alterar este relatório'
      );
      return;
    }

    try {
      const response = await api.put(`/expenses/${item.id}/clear-travel`);
      console.log(response);
      loadExpenses(travelSelected.id);
    } catch (err) {
      Alert.alert(
        'Aviso',
        'Falha na comunicação'
      );
    }
  }

  return (
    <Container>
      <Header>{title}</Header>
      <Content>
        <View style={{ flexDirection: 'row' }}>
          <Button style={{ flex: 1 }} onPress={handleAddExpenses} loading={false}>Adicionar</Button>
          <Button style={{ flex: 1 }} onPress={handleSendTravel} loading={loading}>Enviar</Button>
        </View>
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
      </Content>
    </Container>
  )
}

export default TravelExpenses;

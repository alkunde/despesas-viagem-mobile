import React, { useState, useCallback } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';

import api from '../../services/api';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { Expense, ExpenseProps } from '../../components/Expense';

import { Container, Content } from './styles';

const TravelExpenses: React.FC = () => {
  const route = useRoute();

  const [loading, setLoading] = useState(false);
  const [expenseList, setExpenseList] = useState<ExpenseProps[]>([]);

  const { navigate } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      loadExpenses(route.params.id);
    }, [])
  );

  const loadExpenses = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await api.get("/expenses/travel/" + id);

      setExpenseList(response.data);
    } catch (err) {
      Alert.alert(
        'Aviso',
        'Falha na conexão'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  function handleAddExpenses() {
    //TODO: ExpenseList diferente?
    navigate("ExpensesToTravel");
  }

  function handleSendTravel() {
    if (expenseList && expenseList.length > 0) {
      setLoading(true);
    } else {
      setLoading(false);
      Alert.alert(
        'Aviso',
        'Relatório sem despesas vinculadas'
      );
    }
  }

  return (
    <Container>
      <Header>Despesas</Header>
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
            <Expense
              data={item}
              onPress={() => { }}
            />
          )}
        />
      </Content>
    </Container>
  )
}

export default TravelExpenses;

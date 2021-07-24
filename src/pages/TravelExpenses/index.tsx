import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Header from '../../components/Header';
import Button from '../../components/Button';
import { Expense, ExpenseProps } from '../../components/Expense';

import { Container, Content } from './styles';

const TravelExpenses: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [expenseList, setExpenseList] = useState<ExpenseProps[]>([]);

  const { navigate } = useNavigation();

  useEffect(() => {
    if (loading) {

    }
  }, [loading]);

  function handleAddExpenses() {
    //TODO: ExpenseList diferente?
    navigate("ExpensesToTravel");
  }

  function handleSendTravel() {
    setLoading(true);
  }

  return (
    <Container>
      <Header>Despesas</Header>
      <Content>
        <View style={{ flexDirection: 'row' }}>
          <Button style={{ flex: 1 }} onPress={handleAddExpenses} loading={false}>Adicionar</Button>
          <Button style={{ flex: 1 }} onPress={handleSendTravel} loading={loading}>Enviar</Button>
        </View>
      </Content>
    </Container>
  )
}

export default TravelExpenses;

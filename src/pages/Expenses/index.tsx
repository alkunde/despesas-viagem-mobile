import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { Expense, ExpenseProps } from '../../components/Expense';

import Header from '../../components/Header';
import api from '../../services/api';

// import { Container } from './styles';

const Expenses: React.FC = () => {
  const [expenseList, setExpenseList] = useState<ExpenseProps[]>([]);

  useEffect(() => {
    console.log("useEffect");
    async function getExpenses(): Promise<void> {
      const response = await api.get("/expenses");
      console.log(response.data);

      setExpenseList(response.data);
    }

    getExpenses();
  }, []);

  function handleExpenseDetail(expenseSelected: ExpenseProps) {
    console.log(expenseSelected);
  }

  return (
    <>
      <SafeAreaView>
        <Header>Despesas</Header>
        <FlatList
          data={expenseList}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Expense
              data={item}
              onPress={() => handleExpenseDetail(item)}
            />
          )}
        />
      </SafeAreaView>
    </>
  );
}

export default Expenses;

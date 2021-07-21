import React, { useState, useCallback } from 'react';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList, ActivityIndicator, Text, Alert } from 'react-native';
import Header from '../../components/Header';

import { Container } from './styles';

import api from '../../services/api';
import { Expense } from '../../components/Expense';

const ApprovalDetail: React.FC = () => {
  const route = useRoute();

  const [loading, setLoading] = useState(true);
  const [expenseList, setExpenseList] = useState([]);

  const { navigate } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      console.log(route.params);
      loadExpenses()
    }, [])
  );

  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/expenses/travel/" + 1);

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

  return (
    <Container>
      <Header>Detalhes</Header>
      {
        loading
          ? <ActivityIndicator style={{ marginTop: 16 }} size="large" color="#666" />
          : <></>
      }
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
    </Container>
  );
}

export default ApprovalDetail;

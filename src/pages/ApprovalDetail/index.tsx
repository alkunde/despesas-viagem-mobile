import React, { useState, useCallback } from 'react';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList, ActivityIndicator, Alert, View } from 'react-native';

import Header from '../../components/Header';
import Button from '../../components/Button';
import { ExpenseReport } from '../../components/ExpenseReport';
import { CategoryProps } from '../../components/Category';
import { TravelProps } from '../../components/Travel';
import api from '../../services/api';

import { Container, Content } from './styles';

interface ApprovalExpense {
  id: number;
  expenseDate: Date;
  amount: number;
  description: string;
  category: CategoryProps
  user: object;
  travel: TravelProps;
  checked: boolean;
}

const ApprovalDetail: React.FC = () => {
  const route = useRoute();

  const [loading, setLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [expenseList, setExpenseList] = useState<ApprovalExpense[]>([]);

  const { goBack } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      loadExpenses(route.params.id);
    }, [])
  );

  const loadExpenses = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await api.get(`/expenses/travel/${id}`);

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

  async function handleClose() {
    if (sendLoading || reportLoading) return;

    setSendLoading(true);
    let anyChecked = false;
    expenseList.map(expense => {
      if (expense.checked) {
        Alert.alert(
          'Aviso',
          'Existem despesas marcadas para reportar. Verifique!',
          [
            { text: "OK", onPress: () => setSendLoading(false) }
          ]
        );
        anyChecked = true;

        return;
      }
    });

    if (!anyChecked) {
      await api.patch(`/travels/${route.params.id}/approve`);
      goBack();
    }
  }

  async function handleReport() {
    let anyChecked = false;
    expenseList.map(expense => {
      if (expense.checked) {
        anyChecked = true;
      }
    });

    if (!anyChecked) {
      Alert.alert('Aviso', 'Selecione as despesas a serem reportadas');

      return;
    }

    await api.patch(`/travels/${route.params.id}/reprove`);
    goBack();
  }

  const handleCheck = useCallback((item: ApprovalExpense) => {
    item.checked = true;
  }, []);

  return (
    <Container>
      <Header>Detalhes</Header>
      <Content>
        { loading && <ActivityIndicator style={{ marginTop: 16 }} size="large" color="#666" /> }
        <FlatList
          style={{ marginTop: 8 }}
          data={expenseList}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ExpenseReport
              data={item}
              onPress={() => handleCheck(item)}
            />
          )}
        />
        <View style={{ flexDirection: 'row' }}>
          <Button
            style={{ flex: 1 }}
            onPress={handleClose}
            loading={sendLoading}
          >
            Finalizar
          </Button>
          <Button
            style={{ flex: 1, backgroundColor: '#dad' }}
            onPress={handleReport}
            loading={reportLoading}
          >
            Reportar
          </Button>
        </View>
      </Content>
    </Container>
  );
}

export default ApprovalDetail;

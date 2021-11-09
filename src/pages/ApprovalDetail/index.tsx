import React, { useState, useCallback } from 'react';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList, ActivityIndicator, Alert, View } from 'react-native';

import api from '../../services/api';

import Header from '../../components/Header';
import Button from '../../components/Button';
import ServerDown from '../../components/ServerDown';
import { ExpenseReport } from '../../components/ExpenseReport';
import { CategoryProps } from '../../components/Category';
import { TravelProps } from '../../components/Travel';

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
  const [networkError, setNetworkError] = useState(false);
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
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setNetworkError(true);
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
        { networkError && <ServerDown /> }
        { !loading && !networkError &&
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
        }
      </Content>
      <View style={{ flexDirection: 'row', paddingLeft: 16, paddingRight: 16 }}>
        <Button
          style={{ flex: 1, marginRight: 8 }}
          onPress={handleClose}
          loading={sendLoading}
        >
          Finalizar
        </Button>
        <Button
          style={{ flex: 1, marginLeft: 8, backgroundColor: '#dad' }}
          onPress={handleReport}
          loading={reportLoading}
        >
          Reportar
        </Button>
      </View>
    </Container>
  );
}

export default ApprovalDetail;

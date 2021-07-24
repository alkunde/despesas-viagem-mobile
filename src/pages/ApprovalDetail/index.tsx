import React, { useState, useCallback } from 'react';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList, ActivityIndicator, Alert, View } from 'react-native';
import Header from '../../components/Header';

import { Container, Content } from './styles';

import api from '../../services/api';
import { ExpenseReport } from '../../components/ExpenseReport';
import Button from '../../components/Button';

const ApprovalDetail: React.FC = () => {
  const route = useRoute();

  const [loading, setLoading] = useState(true);
  const [expenseList, setExpenseList] = useState([]);

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

  function handleClose() {
    //TODO: percorrer listagem de despesas
    //      e verificar se alguma foi marcada
    //      se sim, enviar o report
    //      se não, avisar que não tem despesa marcada
    Alert.alert(
      'Aviso',
      'Selecione as despesas a serem reportadas'
    );
  }

  function handleReport() {
    //TODO: percorrer listagem de despesas
    //      e verificar se alguma foi marcada
    //      se sim, enviar o report
    //      se não, avisar que não tem despesa marcada
    Alert.alert(
      'Aviso',
      'Selecione as despesas a serem reportadas'
    );
  }

  return (
    <Container>
      <Header>Detalhes</Header>
      <Content>
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
            <ExpenseReport
              data={item}
              onPress={() => { }}
            />
          )}
        />
        <View style={{ flexDirection: 'row' }}>
          <Button style={{ flex: 1 }} onPress={handleClose} loading={false}>Finalizar</Button>
          <Button style={{ flex: 1, backgroundColor: '#dad' }} onPress={handleReport} loading={false}>Reportar</Button>
        </View>
      </Content>
    </Container>
  );
}

export default ApprovalDetail;

import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList, ActivityIndicator, Alert } from 'react-native';

import { Approval, ApprovalProps } from '../../components/Approval';
import { Travel, TravelProps } from '../../components/Travel';
import Header from '../../components/Header';
import api from '../../services/api';

import { Container, Content } from './styles';

const Approvals: React.FC = () => {
  const [approvalList, setApprovalList] = useState<TravelProps[]>([]);
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      loadApprovals()
    }, [])
  );

  const loadApprovals = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get("/approvals");

      setApprovalList(response.data);
    } catch (err) {
      Alert.alert(
        'Aviso',
        'Falha de conexão'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  function handleApprovalDetail(approvalSelected: ApprovalProps) {
    navigate('ApprovalDetail');
  }

  return (
    <Container>
      <Header>Aprovações</Header>
      <Content>
        <FlatList
          style={{ marginTop: 8 }}
          data={approvalList}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Approval
              data={item}
              onPress={() => handleApprovalDetail(item)}
            />
          )}
        />
      </Content>
    </Container>
  );
}

export default Approvals;

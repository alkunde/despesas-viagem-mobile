import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList, ActivityIndicator, Alert } from 'react-native';

import api from '../../services/api';

import Header from '../../components/Header';
import NotFound from '../../components/NotFound';
import ServerDown from '../../components/ServerDown';
import { Approval, ApprovalProps } from '../../components/Approval';

import { Container, Content } from './styles';

const Approvals: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [networkError, setNetwortkError] = useState(false);
  const [approvalList, setApprovalList] = useState<ApprovalProps[]>([]);

  const { navigate } = useNavigation();

  const loadApprovals = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get('/approvals');

      setApprovalList(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setNetwortkError(true);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadApprovals();
    }, [loadApprovals]),
  );

  function handleApprovalDetail(approvalSelected: ApprovalProps) {
    if (approvalSelected.status !== 'em aprovação') {
      Alert.alert('Aviso', 'Não é possível aprovar esta viagem');
      return;
    }

    const { id } = approvalSelected;
    navigate('ApprovalDetail', { id });
  }

  return (
    <Container>
      <Header>Aprovações</Header>
      <Content>
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
          (!approvalList || approvalList.length === 0) && <NotFound />}
        {!loading && !networkError && (
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
        )}
      </Content>
    </Container>
  );
};

export default Approvals;

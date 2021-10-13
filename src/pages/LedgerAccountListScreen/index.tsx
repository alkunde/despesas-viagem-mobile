import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, FlatList, Alert } from 'react-native';

import Header from '../../components/Header';
import Button from '../../components/Button';
import { LedgerAccount, LedgerAccountProps } from '../../components/LedgerAccount';
import api from '../../services/api';

import { Container, Content } from './styles';

const LedgerAccountListScreen: React.FC = () => {
  const [ledgerAccountList, setLedgerAccountList] = useState<LedgerAccountProps[]>([]);
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      loadLedgerAccounts();
    }, [])
  );

  const loadLedgerAccounts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/ledger_accounts');

      setLedgerAccountList(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert(
        'Aviso',
        'Falha na conexão'
      );
    }
  }, []);

  function handleLedgetAccountDetail(ledgerAccountSelected: LedgerAccountProps) {
    navigate('LedgerAccountDetail', { ledgerAccountSelected });
  }

  return (
    <Container>
      <Header>Contas Contábeis</Header>
      <Content>
        <Button
          loading={false}
          onPress={() => handleLedgetAccountDetail({}  as LedgerAccountProps)}
        >
          Nova Conta Contábil
        </Button>
        { loading && <ActivityIndicator style={{ marginTop: 16 }} size="large" color="#666" /> }
        <FlatList
          style={{ marginTop: 8 }}
          data={ledgerAccountList}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <LedgerAccount
              data={item}
              onPress={() => handleLedgetAccountDetail(item)}
            />
          )}
        />
      </Content>
    </Container>
  )
}

export default LedgerAccountListScreen;

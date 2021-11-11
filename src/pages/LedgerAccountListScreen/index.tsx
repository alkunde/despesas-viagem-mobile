import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, FlatList, Alert } from 'react-native';

import api from '../../services/api';

import Header from '../../components/Header';
import Button from '../../components/Button';
import NotFound from '../../components/NotFound';
import ServerDown from '../../components/ServerDown';
import {
  LedgerAccount,
  LedgerAccountProps,
} from '../../components/LedgerAccount';

import { Container, Content } from './styles';

const LedgerAccountListScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [ledgerAccountList, setLedgerAccountList] = useState<
    LedgerAccountProps[]
  >([]);

  const { navigate } = useNavigation();

  const loadLedgerAccounts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/ledger_accounts');

      setLedgerAccountList(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setNetworkError(true);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadLedgerAccounts();
    }, []),
  );

  function handleLedgetAccountDetail(
    ledgerAccountSelected: LedgerAccountProps,
  ) {
    if (networkError) return;

    navigate('LedgerAccountDetail', { ledgerAccountSelected });
  }

  return (
    <Container>
      <Header>Contas Contábeis</Header>
      <Content>
        <Button
          loading={false}
          onPress={() => handleLedgetAccountDetail({} as LedgerAccountProps)}
        >
          Nova Conta Contábil
        </Button>
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
          (!ledgerAccountList || ledgerAccountList.length === 0) && (
            <NotFound />
          )}
        {!loading && !networkError && (
          <FlatList
            style={{ marginTop: 8 }}
            data={ledgerAccountList}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <LedgerAccount
                data={item}
                onPress={() => handleLedgetAccountDetail(item)}
              />
            )}
          />
        )}
      </Content>
    </Container>
  );
};

export default LedgerAccountListScreen;

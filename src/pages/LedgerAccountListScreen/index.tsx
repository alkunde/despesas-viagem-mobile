import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import Header from '../../components/Header';
import Button from '../../components/Button';

import { Container, Content } from './styles';

const LedgerAccountListScreen: React.FC = () => {
  const { navigate } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      loadLedgerAccounts();
    }, [])
  );

  const loadLedgerAccounts = useCallback(async () => {}, []);

  return (
    <Container>
      <Header>Contas Contábeis</Header>
      <Content>
        <Button loading={false} onPress={() => navigate('LedgerAccountDetail')}>
          Nova Conta Contábil
        </Button>
      </Content>
    </Container>
  )
}

export default LedgerAccountListScreen;

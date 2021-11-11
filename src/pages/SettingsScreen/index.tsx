import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';

import { Container, Button, ButtonText } from './styles';

const SettingsScreen: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <Container>
      <Header>Ajustes</Header>
      <Button onPress={() => navigate('CategoriesScreen')}>
        <ButtonText>Categorias</ButtonText>
      </Button>
      <Button onPress={() => navigate('CostCenterListScreen')}>
        <ButtonText>Centros de Custo</ButtonText>
      </Button>
      <Button onPress={() => navigate('LedgerAccountListScreen')}>
        <ButtonText>Contas Contábeis</ButtonText>
      </Button>
      <Button onPress={() => navigate('UserListScreen')}>
        <ButtonText>Usuários</ButtonText>
      </Button>
    </Container>
  );
};

export default SettingsScreen;

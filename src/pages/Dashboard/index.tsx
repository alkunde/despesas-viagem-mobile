import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Alert } from 'react-native';
import { useAuth } from '../../hooks/auth';

import { Button, ButtonText, Container } from './styles';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();

  const { signOut } = useAuth();

  function handleExpenseNavigation() {
    console.log('Despesas');
    navigation.navigate('Expenses');
  }

  function handleTravelNavigation() {
    console.log('Viagens');
    navigation.navigate('Travels');
  }

  function handleConfigureNavigation() {
    console.log('Configurações');
    Alert.alert(
      'Configurações',
      'Em desenvolvimento'
    )
  }

  function handleSignOut() {
    signOut();
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Container>
        <Button onPress={handleExpenseNavigation}>
          <ButtonText>Despesas</ButtonText>
        </Button>
        <Button onPress={handleTravelNavigation}>
          <ButtonText>Viagens</ButtonText>
        </Button>
      </Container>
      <Container>
        <Button onPress={handleConfigureNavigation}>
          <ButtonText>Configurações</ButtonText>
        </Button>
        <Button onPress={handleSignOut}>
          <ButtonText>Sair</ButtonText>
        </Button>
      </Container>
    </View>
  )
};

export default Dashboard;

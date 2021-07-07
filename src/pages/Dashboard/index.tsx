import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';

import { Button, ButtonImage, ButtonText, Container } from './styles';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();

  const { signOut } = useAuth();

  function handleExpenseNavigation() {
    navigation.navigate('Expenses');
  }

  function handleTravelNavigation() {
    navigation.navigate('Travels');
  }

  function handleConfigureNavigation() {
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
          <ButtonImage>
            <Icon name="clipboard" size={25} color="rgba(255, 255, 255, 0.6)" />
          </ButtonImage>
          <ButtonText>Despesas</ButtonText>
        </Button>
        <Button onPress={handleTravelNavigation}>
          <ButtonImage>
            <Icon name="map" size={25} color="rgba(255, 255, 255, 0.6)" />
          </ButtonImage>
          <ButtonText>Viagens</ButtonText>
        </Button>
      </Container>
      <Container>
        <Button onPress={handleConfigureNavigation}>
          <ButtonImage>
            <Icon name="sliders" size={25} color="rgba(255, 255, 255, 0.6)" />
          </ButtonImage>
          <ButtonText>Ajustes</ButtonText>
        </Button>
        <Button onPress={handleSignOut}>
          <ButtonImage>
            <Icon name="log-out" size={25} color="rgba(255, 255, 255, 0.6)" />
          </ButtonImage>
          <ButtonText>Sair</ButtonText>
        </Button>
      </Container>
    </View>
  )
};

export default Dashboard;

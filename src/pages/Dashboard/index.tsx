import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';

import { Button, ButtonImage, ButtonText, Container } from './styles';

const Dashboard: React.FC = () => {
  const { navigate } = useNavigation();

  const { user, signOut } = useAuth();
  console.log(user);

  function handleExpenseNavigation() {
    navigate('Expenses');
  }

  function handleTravelNavigation() {
    navigate('Travels');
  }

  function handleConfigureNavigation() {
    Alert.alert(
      'Configurações',
      'Em desenvolvimento'
    )
  }

  function handleApprovalsNavigation() {
    navigate('Approvals')
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
        {user.role === 'admin'
          ? (
            <Button onPress={handleApprovalsNavigation}>
              <ButtonImage>
                <Icon name="check-square" size={25} color="rgba(255, 255, 255, 0.6)" />
              </ButtonImage>
              <ButtonText>Aprovações</ButtonText>
            </Button>
          )
          : <></>
        }
      </Container>
      <Container>
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

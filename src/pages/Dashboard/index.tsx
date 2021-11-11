import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';

import { Button, ButtonImage, ButtonText, Container } from './styles';

const Dashboard: React.FC = () => {
  const { navigate } = useNavigation();

  const { user, signOut } = useAuth();

  const handleExpenseNavigation = useCallback(() => {
    navigate('Expenses');
  }, [navigate]);

  const handleTravelNavigation = useCallback(() => {
    navigate('Travels');
  }, [navigate]);

  const handleConfigureNavigation = useCallback(() => {
    if (!user.admin) {
      Alert.alert('Aviso', 'Função habilitada apenas para administradores');
      return;
    }

    navigate('SettingsScreen');
  }, [user.admin, navigate]);

  const handleApprovalsNavigation = useCallback(() => {
    if (!user.admin) {
      Alert.alert('Aviso', 'Função habilitada apenas para administradores');
      return;
    }

    navigate('Approvals');
  }, [user.admin, navigate]);

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

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
        <Button onPress={handleApprovalsNavigation}>
          <ButtonImage>
            <Icon
              name="check-square"
              size={25}
              color="rgba(255, 255, 255, 0.6)"
            />
          </ButtonImage>
          <ButtonText>Aprovações</ButtonText>
        </Button>
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
  );
};

export default Dashboard;

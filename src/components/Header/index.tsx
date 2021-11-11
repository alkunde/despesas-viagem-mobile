import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { BackButton, Container, Title } from './styles';

interface HeaderProps {
  children: string;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const navigation = useNavigation();

  return (
    <Container>
      <BackButton onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={30} color="#fff" />
      </BackButton>
      <Title>{children}</Title>
    </Container>
  );
};

export default Header;

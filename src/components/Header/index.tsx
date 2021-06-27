import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { BackButton, Container } from './styles';

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
      <Text
        style={{
          textAlign: 'center',
          color: "#fff",
          fontSize: 22,
          fontWeight: "bold"
        }}
      >
        {children}
      </Text>
    </Container>
  );
}

export default Header;

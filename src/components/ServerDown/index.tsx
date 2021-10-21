import React from 'react';
import { Image } from 'react-native';

import serverDown from '../../assets/server_down.png';
import { Container, Title } from './styles';

const ServerDown: React.FC = () => {
  return (
    <Container>
      <Image source={serverDown} />
      <Title>Falha de conexão</Title>
    </Container>
  );
}

export default ServerDown;

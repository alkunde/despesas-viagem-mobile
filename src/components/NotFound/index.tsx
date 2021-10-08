import React from 'react';
import { Image, Text } from 'react-native';

import notFound from '../../assets/not_found.png';
import { Container, Title } from './styles';

const NotFound: React.FC = () => {
  return (
    <Container>
      <Image source={notFound} />
      <Title>Nenhum registro encontrado</Title>
    </Container>
  );
}

export default NotFound;

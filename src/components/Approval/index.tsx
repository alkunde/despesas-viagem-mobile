import React from 'react';
import { View, Text } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import { UserProps } from '../User';

import { Container } from './styles';

export type ApprovalProps = {
  id: number;
  origin: string;
  destination: string;
  departureDate: Date;
  arrivalDate: Date;
  user: UserProps;
  amount?: number;
  reason: string;
  status: string;
};

type Props = RectButtonProps & {
  data: ApprovalProps;
};

export const Approval: React.FC<Props> = ({ data, ...rest }) => {
  const {
    origin,
    destination,
    departureDate,
    arrivalDate,
    user,
    amount,
    reason,
    status,
  } = data;

  const amountFormatted = amount?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Container {...rest}>
      <Text>Nome: {user.name}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>Origem: {origin}</Text>
        <Text>Destino: {destination}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>Data partida: {departureDate}</Text>
        <Text>Data retorno: {arrivalDate}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>Motivo: {reason}</Text>
        {data.amount && <Text>Adiantamento: {amountFormatted}</Text>}
      </View>
      <View
        style={{
          backgroundColor: '#e2e300',
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 6,
          marginTop: 8,
        }}
      >
        <Text>{status}</Text>
      </View>
    </Container>
  );
};

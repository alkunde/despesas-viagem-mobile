import React from 'react';
import { Text, View } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Content, StatusFlag } from './styles';

export type TravelProps = {
  id: number;
  amount?: number;
  arrivalDate: Date;
  departureDate: Date;
  destination: string;
  origin: string;
  reason: string;
  status: string;
  user: object;
};

type Props = RectButtonProps & {
  data: TravelProps;
};

export const Travel: React.FC<Props> = ({ data, ...rest }) => {
  const {
    origin,
    departureDate,
    destination,
    arrivalDate,
    reason,
    amount,
    status,
  } = data;

  const amountFormatted = amount?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Container {...rest}>
      <Content>
        <Text>Origem: {origin}</Text>
        <Text>Data Saída: {departureDate}</Text>
        <Text>Destino: {destination}</Text>
        <Text>Data Retorno: {arrivalDate}</Text>
        <Text>Motivo: {reason}</Text>
        {amount && amount > 0 && <Text>Adiantamento: {amountFormatted}</Text>}
      </Content>
      <View>
        <StatusFlag>
          <Text>{status}</Text>
        </StatusFlag>
      </View>
    </Container>
  );
};

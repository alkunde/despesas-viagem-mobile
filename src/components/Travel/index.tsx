import React from 'react';
import { Text } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container } from './styles';

export type TravelProps = {
  id: number;
  advancedAmount?: number;
  arrivalDate: Date;
  departureDate: Date;
  destination: string;
  origin: string;
  reason: string;
  status: string;
  user: object;
}

type Props = RectButtonProps & {
  data: TravelProps;
}

export const Travel: React.FC<Props> = ({ data, ...rest }) => {
  const {
    origin,
    departureDate,
    destination,
    arrivalDate,
    reason,
    advancedAmount,
    status
  } = data;

  return (
    <Container {...rest}>
      <Text>Origem: {origin}</Text>
      <Text>Data Saída: {departureDate}</Text>
      <Text>Destino: {destination}</Text>
      <Text>Data Retorno: {arrivalDate}</Text>
      <Text>Motivo: {reason}</Text>
      {advancedAmount && advancedAmount > 0
        ? <Text>Adiantamento: {advancedAmount}</Text>
        : <></>
      }
    </Container>
  )
}

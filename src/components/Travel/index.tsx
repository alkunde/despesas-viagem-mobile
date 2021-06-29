import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Text } from 'react-native';

export type TravelProps = {
  id: number;
  advancedAmount: number;
  arrivalDate: Date;
  departureDate: Date;
  destination: string;
  origin: string;
  reason: string;
}

type Props = RectButtonProps & {
  data: TravelProps;
}

export function Travel({ data, ...rest }: Props) {
  return (
    <RectButton {...rest} style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', marginBottom: 16, padding: 6, borderRadius: 6 }}>
      <Text>Destino: {data.destination}</Text>
      <Text>Origem: {data.origin}</Text>
      <Text>Adiantamento: {data.advancedAmount}</Text>
      <Text>Partida: {data.arrivalDate}</Text>
      <Text>Chegada: {data.departureDate}</Text>
      <Text>Motivo: {data.reason}</Text>
    </RectButton>
  )
}

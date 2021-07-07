import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { View } from 'react-native';

// import { Container } from './styles';

export type TravelProps = {
  id: number;
  advancedAmount: number;
  arrivalDate: Date;
  departureDate: Date;
  destination: string;
  origin: string;
  reason: string;
  user: object;
}

type Props = RectButtonProps & {
  data: TravelProps;
}

export function Travel({ data, ...rest }: Props) {
  return <View />;
}

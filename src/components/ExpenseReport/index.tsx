import React from 'react';
import { View, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import { TravelProps } from '../Travel';

import {
  Container,
  DescriptionText,
  AmountText,
  DateText,
  CategoryText,
} from './styles';

export type CategoryProps = {
  id: number;
  description: string;
};

export type ExpenseProps = {
  id: number;
  expenseDate: Date;
  amount: number;
  description: string;
  category: CategoryProps;
  user: object;
  travel: TravelProps;
  checked: boolean;
};

type Props = RectButtonProps & {
  data: ExpenseProps;
};

export const ExpenseReport: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <Container>
      <View style={{ flex: 1 }}>
        <DescriptionText>Descrição: {data.description}</DescriptionText>
        <AmountText>Valor: {data.amount}</AmountText>
        <DateText>Data: {data.expenseDate}</DateText>
        <CategoryText>Categoria: {data.category.description}</CategoryText>
      </View>
      <View style={{ justifyContent: 'center', margin: 16 }}>
        <RectButton {...rest}>
          <Icon name="x" size={25} color="#2212aa" />
          <Text>Marcar</Text>
        </RectButton>
      </View>
    </Container>
  );
};

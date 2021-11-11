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
  const { description, amount, expenseDate, category } = data;

  const amountFormatted = amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <DescriptionText>Descrição: {description}</DescriptionText>
        <AmountText>Valor: {amountFormatted}</AmountText>
        <DateText>Data: {expenseDate}</DateText>
        <CategoryText>Categoria: {category.description}</CategoryText>
      </View>
      <View
        style={{
          justifyContent: 'center',
          margin: 16,
        }}
      >
        <RectButton {...rest} style={{ alignItems: 'center' }}>
          <Icon name="x" size={25} color="#2212aa" />
          <Text>Marcar</Text>
        </RectButton>
      </View>
    </Container>
  );
};

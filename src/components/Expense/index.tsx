import React from 'react';
import { Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { TravelProps } from '../Travel';

import {
  Container,
  DescriptionText,
  AmountText,
  DateText,
  CategoryText,
  ContainerWithoutClick
} from './styles';

export type CategoryProps = {
  id: number;
  description: string;
}

export type ExpenseProps = {
  id: number;
  expenseDate: Date;
  amount: number;
  description: string;
  category: CategoryProps;
  user: object;
  travel: TravelProps;
}

type Props = RectButtonProps & {
  data: ExpenseProps;
}

export const Expense: React.FC<Props> = ({ data, ...rest }) => {
  const {
    description,
    expenseDate,
    category,
    travel,
  } = data;

  const amountFormatted = data.amount.toLocaleString(
    'pt-BR',
    { style: 'currency', currency: 'BRL' },
  );

  return (
    <Container {...rest}>
      <DescriptionText>Descrição: {description}</DescriptionText>
      <AmountText>Valor: {amountFormatted}</AmountText>
      <DateText>Data: {expenseDate}</DateText>
      <CategoryText>Categoria: {category.description}</CategoryText>
      { travel && <Text>Viagem: {travel.id}</Text> }
    </Container>
  );
}

export const TravelExpense: React.FC<Props> = ({ data, ...rest }) => {
  const {
    description,
    expenseDate,
    category,
  } = data;

  const amountFormatted = data.amount.toLocaleString(
    'pt-BR',
    { style: 'currency', currency: 'BRL' },
  );

  return (
    <ContainerWithoutClick>
      <View style={{ flex: 1 }}>
        <DescriptionText>Descrição: {description}</DescriptionText>
        <AmountText>Valor: {amountFormatted}</AmountText>
        <DateText>Data: {expenseDate}</DateText>
        <CategoryText>Categoria: {category.description}</CategoryText>
      </View>
      <RectButton {...rest} style={{ justifyContent: 'center', padding: 16 }}>
        <Text>Excluir</Text>
      </RectButton>
    </ContainerWithoutClick>
  )
}

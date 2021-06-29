import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Text } from 'react-native';

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
}

type Props = RectButtonProps & {
  data: ExpenseProps;
}

export function Expense({ data, ...rest }: Props) {
  return (
    <RectButton {...rest} style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', marginBottom: 16, padding: 6, borderRadius: 6 }}>
      <Text>Descrição: {data.description}</Text>
      <Text>Valor: {data.amount}</Text>
      <Text>Data: {data.expenseDate}</Text>
      <Text>Categoria: {data.category.description}</Text>
    </RectButton>
  )
}

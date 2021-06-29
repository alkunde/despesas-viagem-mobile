import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Text } from 'react-native';

export type ExpenseProps = {
  id: number;
  expenseDate: Date;
  amount: number;
  description: string;
}

type Props = RectButtonProps & {
  data: ExpenseProps;
}

export function Expense({ data, ...rest }: Props) {
  return (
    <RectButton {...rest}>
      <Text>{data.description}</Text>
    </RectButton>
  )
}

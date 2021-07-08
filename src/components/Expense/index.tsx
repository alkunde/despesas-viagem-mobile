import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  DescriptionText,
  AmountText,
  DateText,
  CategoryText
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
}

type Props = RectButtonProps & {
  data: ExpenseProps;
}

export const Expense: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <Container {...rest}>
      <DescriptionText>Descrição: {data.description}</DescriptionText>
      <AmountText>Valor: {data.amount}</AmountText>
      <DateText>Data: {data.expenseDate}</DateText>
      <CategoryText>Categoria: {data.category.description}</CategoryText>
    </Container>
  );
}

import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { LedgerAccountProps } from '../LedgerAccount';

import { Container, DescriptionText, Divider } from './styles';

export type CategoryProps = {
  id: number;
  description: string;
  ledgerAccount: LedgerAccountProps;
};

type Props = RectButtonProps & {
  data: CategoryProps;
};

const Category: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <>
      <Container {...rest}>
        <DescriptionText>{data.description}</DescriptionText>
      </Container>
      <Divider />
    </>
  );
};

export default Category;

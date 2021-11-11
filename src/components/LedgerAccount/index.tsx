import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, CodeText, DescriptionText } from './styles';

export type LedgerAccountProps = {
  id: number;
  code: string;
  description: string;
};

type Props = RectButtonProps & {
  data: LedgerAccountProps;
};

export const LedgerAccount: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <Container {...rest}>
      <CodeText>{data.code}</CodeText>
      <DescriptionText>{data.description}</DescriptionText>
    </Container>
  );
};

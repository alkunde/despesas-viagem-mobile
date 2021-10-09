import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  CodeText,
  DescriptionText,
  Divider
} from './styles';

export type LedgerAccountProps = {
  id: number;
  code: string;
  description: string;
}

type Props = RectButtonProps & {
  data: LedgerAccountProps;
}

const LedgerAccount: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <Container {...rest}>
      <CodeText>{data.code}</CodeText>
    </Container>
  );
}

export default LedgerAccount;

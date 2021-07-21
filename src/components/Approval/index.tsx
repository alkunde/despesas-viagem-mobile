import React from 'react';
import { Text } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container } from './styles';

export type ApprovalProps = {
  id: number;
  user: object;
  advancedAmount?: number;
  reason: string;
  status: string;
}

type Props = RectButtonProps & {
  data: ApprovalProps;
}

export const Approval: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <Container {...rest}>
      <Text>{data.user.name}</Text>
      <Text>{data.reason}</Text>
      <Text>{data.status}</Text>
    </Container>
  )
}

import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, CodeText, DescriptionText, Divider } from './styles';

export type CostCenterProps = {
  id: number;
  code: string;
  description: string;
};

type Props = RectButtonProps & {
  data: CostCenterProps;
};

const CostCenter: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <Container {...rest}>
      <CodeText>{data.code}</CodeText>
      <Divider />
      <DescriptionText>{data.description}</DescriptionText>
    </Container>
  );
};

export default CostCenter;

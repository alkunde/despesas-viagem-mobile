import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, DescriptionText, Divider } from './styles';

export type CategoryProps = {
  id: number;
  description: string;
}

type Props = RectButtonProps & {
  data: CategoryProps;
}

export const Category: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <>
      <Container {...rest}>
        <DescriptionText>{data.description}</DescriptionText>
      </Container>
      <Divider />
    </>
  );
}

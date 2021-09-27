import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  min-height: 40px;
  justify-content: center;
  padding: 6px;
`;

export const DescriptionText = styled.Text``;

export const Divider = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.4);
`;

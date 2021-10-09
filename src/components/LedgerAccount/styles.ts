import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  min-height: 40px;
  background: rgba(255, 255, 255, 0.4);
  margin-bottom: 8px;
  padding: 6px;
  border-radius: 6px;
`;

export const CodeText = styled.Text`
  font-weight: bold;
`;

export const DescriptionText = styled.Text`
`;

export const Divider = styled.View`
  height: 1px;
  background: rgba(0, 0, 0, 0.4);
`;

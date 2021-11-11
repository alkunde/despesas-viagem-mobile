import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  justify-content: center;
  min-height: 48px;
  background: rgba(255, 255, 255, 0.4);
  margin-bottom: 8px;
  padding: 6px;
  border-radius: 6px;
`;

export const CodeText = styled.Text`
  font-weight: bold;
`;

export const DescriptionText = styled.Text``;

import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  flex-direction: row;
  min-height: 40px;
  background: rgba(255, 255, 255, 0.4);
  margin-bottom: 8px;
  padding: 6px;
  align-items: center;
  border-radius: 6px;
`;

export const CodeText = styled.Text`
  min-width: 70px;
  font-weight: bold;
`;

export const DescriptionText = styled.Text`
  padding-left: 16px;
`;

export const Divider = styled.View`
  width: 1px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

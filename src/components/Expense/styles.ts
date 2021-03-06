import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background: rgba(255, 255, 255, 0.4);
  margin-bottom: 8px;
  padding: 6px;
  border-radius: 6px;
`;

export const DescriptionText = styled.Text``;

export const AmountText = styled.Text``;

export const DateText = styled.Text``;

export const CategoryText = styled.Text``;

export const ContainerWithoutClick = styled.View`
  flex: 1;
  flex-direction: row;
  background: rgba(255, 255, 255, 0.4);
  margin-bottom: 8px;
  padding: 6px;
  border-radius: 6px;
`;

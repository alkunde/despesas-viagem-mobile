import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  width: 100%;
  padding: 32px;
  flex-direction: row;
  justify-content: space-around;
`;

export const Button = styled(RectButton)`
  width: 125px;
  height: 125px;
  background: #adad;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
`;

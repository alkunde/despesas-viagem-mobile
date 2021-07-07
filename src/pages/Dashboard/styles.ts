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
  background: #595959;
  border-radius: 10px;
`;

export const ButtonImage = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

export const ButtonText = styled.Text`
  width: 100%;
  color: #fff;
  text-align: center;
  padding: 16px;
`;

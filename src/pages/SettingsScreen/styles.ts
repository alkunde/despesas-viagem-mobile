import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
`;

export const Button = styled(RectButton)`
  height: 50px;
  background: #595959;
  border-radius: 10px;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 16px;
  margin-right: 16px;
`;

export const ButtonText = styled.Text`
  width: 100%;
  color: #fff;
  text-align: center;
  padding: 16px;
`;

import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex-direction: row;
  height: 46px;
  align-items: center;
`;

export const BackButton = styled(RectButton)`
  width: 46px;
  height: 46px;
  margin-left: 16px;
  margin-right: 16px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 22px;
  font-weight: bold;
`;

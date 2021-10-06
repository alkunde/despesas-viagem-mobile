import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background: rgba(255, 255, 255, 0.4);
  margin-bottom: 16px;
  padding: 6px;
  border-radius: 6px;
  flex-direction: row;
`;

export const Content = styled.View`
  flex: 1;
`;

export const StatusFlag = styled.View`
  background-color: #e2e300;
  padding-right: 16px;
  padding-left: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 50px;
`;

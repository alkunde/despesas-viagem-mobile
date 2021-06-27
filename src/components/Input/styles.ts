import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  border-radius: 10px;

  flex-direction: row;
  align-items: center;

  ${props => props.isErrored &&
    css`
      border-color: #c53
    `
  }

  ${props => props.isFocused &&
    css`
      border-color: #ff9000
    `
  }
`;

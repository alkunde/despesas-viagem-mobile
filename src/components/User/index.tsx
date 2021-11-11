import React from 'react';
import { View, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import { Container } from './styles';

export type UserProps = {
  id: number;
  name: string;
  email: string;
  role: string;
  active: string;
};

type Props = RectButtonProps & {
  data: UserProps;
};

const User: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <Container>
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#fff' }}>{data.name}</Text>
        <Text style={{ color: '#fff' }}>{data.email}</Text>
        {data.role === 'admin' && <Text>Admin</Text>}
      </View>
      <View style={{ justifyContent: 'center' }}>
        <RectButton {...rest}>
          {data.active !== 'active' ? (
            <Icon size={25} color="#aaa" name="toggle-left" />
          ) : (
            <Icon size={25} color="#1af867" name="toggle-right" />
          )}
        </RectButton>
      </View>
    </Container>
  );
};

export default User;

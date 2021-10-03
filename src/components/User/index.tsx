import React from 'react';
import { View, Text } from 'react-native';

// import { Container } from './styles';

export type UserProps = {
  id: number;
  name: String;
  email: String;
  isAdmin: boolean;
  isActive: boolean;
}

// type Props = RectButtonProps & {
//   data: UserProps;
// }

const User: React.FC<UserProps> = ({ id, name, email, isAdmin, isActive }) => {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{email}</Text>
      {
        isAdmin
          ? <Text>Admin</Text>
          : <></>
      }
    </View>
  );
}

export default User;

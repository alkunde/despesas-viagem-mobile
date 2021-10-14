import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, Alert, FlatList } from 'react-native';

import Header from '../../components/Header';
import User, { UserProps } from '../../components/User';
import api from '../../services/api';

import { Container, Content } from './styles';

const UserListScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadUsers()
    }, [])
  );

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');

      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);

      Alert.alert(
        'Aviso',
        'Falha na conexão'
      );
    }
  }, []);

  return (
    <Container>
      <Header>Usuários</Header>
      <Content>
        {
          loading
          ? <ActivityIndicator style={{ marginTop: 16 }} size="large" color="#666" />
          : <></>
        }
        <FlatList
          style={{ marginTop: 8 }}
          data={users}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <User
              id={item.id}
              name={item.name}
              email={item.email}
              isAdmin={item.isAdmin}
              isActive={item.isActive}
            />
          )}
        />
      </Content>
    </Container>
  );
}

export default UserListScreen;

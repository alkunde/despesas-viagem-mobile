import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, FlatList } from 'react-native';

import api from '../../services/api';

import Header from '../../components/Header';
import ServerDown from '../../components/ServerDown';
import User, { UserProps } from '../../components/User';

import { Container, Content } from './styles';

const UserListScreen: React.FC = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);

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
      setNetworkError(true);
    }
  }, []);

  async function handleActive(item: UserProps) {
    if (item.active === 'active') {
      const response = await api.patch(`/users/${item.id}/inactive`);
      setUsers(response.data);
    } else {
      const response = await api.patch(`/users/${item.id}/active`);
      setUsers(response.data);
    }
  }

  return (
    <Container>
      <Header>Usuários</Header>
      <Content>
        { loading && <ActivityIndicator style={{ marginTop: 16 }} size="large" color="#666" /> }
        { networkError && <ServerDown /> }
        { !loading && !networkError &&
          <FlatList
            style={{ marginTop: 8 }}
            data={users}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <User
                data={item}
                onPress={() => handleActive(item)}
              />
            )}
          />
        }
      </Content>
    </Container>
  );
}

export default UserListScreen;

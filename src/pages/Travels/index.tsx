import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList, ActivityIndicator } from 'react-native';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';
import Button from '../../components/Button';
import ServerDown from '../../components/ServerDown';
import NotFound from '../../components/NotFound';
import { Travel, TravelProps } from '../../components/Travel';

import { Container, Content } from './styles';

const Travels: React.FC = () => {
  const [travelList, setTravelList] = useState<TravelProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  const { user } = useAuth();
  const { navigate } = useNavigation();

  const loadTravels = useCallback(async () => {
    try {
      setLoading(true);
      const { id } = user;
      const response = await api.get(`/travels/users/${id}`);

      setTravelList(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setNetworkError(true);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTravels();
    }, []),
  );

  function handleTravelExpenses(travelSelected: TravelProps) {
    navigate('TravelExpenses', { travelSelected });
  }

  function handleTravelDetail() {
    navigate('TravelDetail');
  }

  return (
    <Container>
      <Header>Viagens</Header>
      <Content>
        <Button loading={false} onPress={() => handleTravelDetail()}>
          Nova Viagem
        </Button>
        {loading && (
          <ActivityIndicator
            style={{ marginTop: 16 }}
            size="large"
            color="#666"
          />
        )}
        {networkError && <ServerDown />}
        {!networkError && (!travelList || travelList.length === 0) && (
          <NotFound />
        )}
        {!loading && !networkError && (
          <FlatList
            style={{ marginTop: 8 }}
            data={travelList}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Travel data={item} onPress={() => handleTravelExpenses(item)} />
            )}
          />
        )}
      </Content>
    </Container>
  );
};

export default Travels;

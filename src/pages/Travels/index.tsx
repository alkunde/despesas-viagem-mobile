import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, ActivityIndicator } from 'react-native';

import Header from '../../components/Header';
import Button from '../../components/Button';
import { Travel, TravelProps } from '../../components/Travel';
import api from '../../services/api';

import { Container, Content } from './styles';

const Travels: React.FC = () => {
  const [travelList, setTravelList] = useState<TravelProps[]>([]);
  const [loading, setLoading] = useState(true);

  const { navigate } = useNavigation();

  useEffect(() => {
    async function getTravels(): Promise<void> {
      const response = await api.get("/travels");

      setTravelList(response.data);
      setLoading(false);
    }

    getTravels();
  }, []);

  function handleTravelDetail(travelSelected: TravelProps) {
    navigate("TravelDetail", { travelSelected });
  }

  return (
    <Container>
      <Header>Viagens</Header>
      <Content>
        <Button loading={false} onPress={() => handleTravelDetail({} as TravelProps)}>Nova viagem</Button>
        {loading ? <ActivityIndicator size="large" color="#666" /> : <></>}
        <FlatList
          style={{ marginTop: 8 }}
          data={travelList}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Travel
              data={item}
              onPress={() => handleTravelDetail(item)}
            />
          )}
        />
      </Content>
    </Container>
  );
}

export default Travels;

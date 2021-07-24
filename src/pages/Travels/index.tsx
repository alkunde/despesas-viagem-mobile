import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, FlatList, ActivityIndicator } from 'react-native';

import Header from '../../components/Header';
import Button from '../../components/Button';
import { Travel, TravelProps } from '../../components/Travel';
import api from '../../services/api';

import { Container, Content } from './styles';

import serverDown from '../../assets/server_down.png';

const Travels: React.FC = () => {
  const [travelList, setTravelList] = useState<TravelProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { navigate } = useNavigation();

  useEffect(() => {
    async function getTravels(): Promise<void> {
      try {
        const response = await api.get("/travels");

        setTravelList(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    }

    getTravels();
  }, []);

  function handleTravelExpenses(travelSelected: TravelProps) {
    navigate("TravelExpenses", { travelSelected });
  }

  function handleTravelDetail() {
    navigate("TravelDetail");
  }

  return (
    <Container>
      <Header>Viagens</Header>
      <Content>
        <Button loading={false} onPress={() => handleTravelDetail()}>Nova viagem</Button>
        {loading ? <ActivityIndicator style={{ marginTop: 16 }} size="large" color="#666" /> : <></>}
        {error ? (
          <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
            <Image source={serverDown} />
            <Text style={{ color: '#fff', fontSize: 18 }}>Problema de comunicação</Text>
          </View>
        )
          : <></>
        }
        {!loading && !error ? (
          <FlatList
            style={{ marginTop: 8 }}
            data={travelList}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Travel
                data={item}
                onPress={() => handleTravelExpenses(item)}
              />
            )}
          />
        ) : <></>}
      </Content>
    </Container>
  );
}

export default Travels;

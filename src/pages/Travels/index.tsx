import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList } from 'react-native';

import Header from '../../components/Header';
import { Travel, TravelProps } from '../../components/Travel';
import api from '../../services/api';

// import { Container } from './styles';

const Travels: React.FC = () => {
  const [travelList, setTravelList] = useState<TravelProps[]>([]);

  useEffect(() => {
    async function getTravels(): Promise<void> {
      const response = await api.get("/travels");
      console.log(response.data);

      setTravelList(response.data);
    }

    getTravels();
  }, []);

  function handleTravelDetail(travelDetail: TravelProps) {
    console.log(travelDetail);
  }

  return (
    <>
      <SafeAreaView>
        <Header>Viagens</Header>
        <FlatList
          style={{ padding: 16 }}
          data={travelList}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Travel
              data={item}
              onPress={() => handleTravelDetail(item)}
            />
          )}
        />
      </SafeAreaView>
    </>
  );
}

export default Travels;

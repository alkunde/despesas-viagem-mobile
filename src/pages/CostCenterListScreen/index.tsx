import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, FlatList } from 'react-native';

import api from '../../services/api';

import Header from '../../components/Header';
import Button from '../../components/Button';
import NotFound from '../../components/NotFound';
import ServerDown from '../../components/ServerDown';
import CostCenter, { CostCenterProps } from '../../components/CostCenter';

import { Container, Content } from './styles';

const CostCenterListScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [costCenters, setCostCenters] = useState<CostCenterProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadCostCenters()
    }, [])
  );

  const loadCostCenters = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/cost_centers');

      setCostCenters(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setNetworkError(true);
    }
  }, []);

  function handleCostCenterDetail(costCenterSelected: CostCenterProps) {
    if (networkError) return;

    navigate('CostCenterDetail', {costCenterSelected});
  }

  return (
    <Container>
      <Header>Centros de Custo</Header>
      <Content>
        <Button
          loading={false}
          onPress={() => handleCostCenterDetail({} as CostCenterProps)}
        >
          Novo Centro de Custo
        </Button>
        { loading && <ActivityIndicator style={{ marginTop: 16 }} size="large" color="#666" /> }
        { networkError && <ServerDown /> }
        { !networkError && (!costCenters || costCenters.length === 0) && <NotFound /> }
        { !loading && !networkError &&
          <FlatList
            style={{ marginTop: 8 }}
            data={costCenters}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <CostCenter
                data={item}
                onPress={() => handleCostCenterDetail(item)}
              />
            )}
          />
        }
      </Content>
    </Container>
  );
}

export default CostCenterListScreen;

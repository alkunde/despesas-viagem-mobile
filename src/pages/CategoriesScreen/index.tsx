import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, FlatList } from 'react-native';

import api from '../../services/api';

import Header from '../../components/Header';
import Button from '../../components/Button';
import NotFound from '../../components/NotFound';
import ServerDown from '../../components/ServerDown';
import Category, { CategoryProps } from '../../components/Category';

import { Container, Content } from './styles';

const CategoriesScreen: React.FC = () => {
  const [categoryList, setCategoryList] = useState<CategoryProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  const { navigate } = useNavigation();

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories');

      setCategoryList(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setNetworkError(true);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCategories();
    }, []),
  );

  function handleCategoryDetail(categorySelected: CategoryProps) {
    if (networkError) return;

    navigate('CategoryDetail', { categorySelected });
  }

  return (
    <Container>
      <Header>Categorias</Header>
      <Content>
        <Button
          loading={false}
          onPress={() => handleCategoryDetail({} as CategoryProps)}
        >
          Nova Categoria
        </Button>
        {loading && (
          <ActivityIndicator
            style={{ marginTop: 16 }}
            size="large"
            color="#666"
          />
        )}
        {!loading && networkError && <ServerDown />}
        {!loading &&
          !networkError &&
          (!categoryList || categoryList.length === 0) && <NotFound />}
        {!loading && !networkError && (
          <FlatList
            style={{ marginTop: 8 }}
            data={categoryList}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Category
                data={item}
                onPress={() => handleCategoryDetail(item)}
              />
            )}
          />
        )}
      </Content>
    </Container>
  );
};

export default CategoriesScreen;

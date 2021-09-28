import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, FlatList, Alert } from 'react-native';

import Header from '../../components/Header';
import Button from '../../components/Button';
import { Category, CategoryProps } from '../../components/Category';
import api from '../../services/api';

import { Container, Content } from './styles';

const CategoriesScreen: React.FC = () => {
  const [categoryList, setCategoryList] = useState<CategoryProps[]>([]);
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      loadCategories()
    }, [])
  );

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/categories");

      setCategoryList(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert(
        'Aviso',
        'Falha na conexão'
      );
    }
  }, []);

  function handleCategoryDetail(categorySelected: CategoryProps) {
    navigate("CategoryDetail", { categorySelected });
  }

  return (
    <Container>
      <Header>Categorias</Header>
      <Content>
        <Button loading={false} onPress={() => handleCategoryDetail({} as CategoryProps)}>
          Nova Categoria
        </Button>
        {
          loading
            ? <ActivityIndicator style={{ marginTop: 16 }} size="large" color="#666" />
            : <></>
        }
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
      </Content>
    </Container>
  );
}

export default CategoriesScreen;

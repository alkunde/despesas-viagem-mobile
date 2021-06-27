import React from 'react';
import { SafeAreaView } from 'react-native';

import Header from '../../components/Header';

// import { Container } from './styles';

const Expenses: React.FC = () => {
  return (
    <>
      <SafeAreaView>
        <Header>Despesas</Header>
      </SafeAreaView>
    </>
  );
}

export default Expenses;

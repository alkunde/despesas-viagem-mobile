import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: 16px;
  padding-bottom: 16px;
`;

export const Content = styled.View`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
`;

export const HeaderModal = styled.View`
  flex-direction: row;
  height: 46px;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 46px;
  margin-left: 16px;
  margin-right: 16px;
`;

export const HeaderTitle = styled.Text`
  text-align: center;
  font-size: 22px;
`;

export const ItemList = styled.Text`
  padding: 16px;
  font-size: 16px;
`;

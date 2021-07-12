import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  margin-left: 16px;
  margin-right: 16px;
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

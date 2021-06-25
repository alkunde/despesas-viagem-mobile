import React from 'react';
import { View, Text, StatusBar, StyleSheet, useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const App: React.FC = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        },
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <Text style={{ color: isDarkMode ? Colors.light : Colors.dark }}>Hello World</Text>
        </View>
    )
};

export default App;

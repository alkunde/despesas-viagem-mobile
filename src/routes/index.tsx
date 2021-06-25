import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
    const loading = false;
    const user = null;

    if (loading) {
        console.log("loading");

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#666000" />
            </View>
        )
    }

    return user ? <AppRoutes /> : <AuthRoutes />
}

export default Routes;

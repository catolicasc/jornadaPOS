// RootLayout.jsx - Versão corrigida
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';
import {decode as atob, encode as btoa} from 'base-64';
import {NhostProvider, NhostReactProvider} from "@nhost/react";
import {nhost} from "@/lib/nhost";
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "@/lib/apollo";
import {Provider} from "react-redux";
import {store} from "@/store";

// Configurações necessárias para o Nhost funcionar no React Native
global.atob = atob;
global.btoa = btoa;

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Provider store={store}>
                <NhostProvider nhost={nhost}>
                    <ApolloProvider client={apolloClient}>
                        <Stack screenOptions={{
                            headerShown: false,
                        }}>

                            <Stack.Screen name="(products)" options={{headerShown: false}}/>
                            <Stack.Screen name="+not-found"/>
                        </Stack>
                        <StatusBar style="auto"/>
                    </ApolloProvider>
                </NhostProvider>
            </Provider>
        </ThemeProvider>
    );
}
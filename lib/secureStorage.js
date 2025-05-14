// Se você encontrar o erro relacionado ao tamanho do valor armazenado no SecureStore,
// use esta implementação alternativa com particionamento de valores grandes:

// lib/secureStorage.js - Adaptador avançado para valores grandes com SecureStore
import * as SecureStore from 'expo-secure-store';

// Tamanho máximo que o SecureStore suporta por item (2048 bytes em algumas plataformas)
const MAX_SIZE = 2000;

// Adaptador de armazenamento seguro com suporte a valores grandes
export const secureStorageAdapter = {
    getItem: async (key) => {
        try {
            // Primeiro verificamos se é um valor particionado
            const info = await SecureStore.getItemAsync(`${key}_info`);

            if (!info) {
                // Não é particionado, retornar o valor diretamente
                return await SecureStore.getItemAsync(key);
            }

            // É particionado, reconstruir o valor
            const { chunks } = JSON.parse(info);
            let result = '';

            // Recuperar e juntar todas as partes
            for (let i = 0; i < chunks; i++) {
                const chunk = await SecureStore.getItemAsync(`${key}_${i}`);
                if (chunk) {
                    result += chunk;
                }
            }

            return result;
        } catch (error) {
            console.error('Erro ao obter item do SecureStore:', error);
            return null;
        }
    },

    setItem: async (key, value) => {
        try {
            // Se o valor for pequeno o suficiente, armazenar diretamente
            if (value.length < MAX_SIZE) {
                await SecureStore.deleteItemAsync(`${key}_info`); // Limpar metadados caso existam
                return await SecureStore.setItemAsync(key, value);
            }

            // Dividir o valor em partes
            const chunks = Math.ceil(value.length / MAX_SIZE);

            // Armazenar informações sobre os chunks
            await SecureStore.setItemAsync(`${key}_info`, JSON.stringify({ chunks }));

            // Armazenar cada parte
            for (let i = 0; i < chunks; i++) {
                const start = i * MAX_SIZE;
                const end = start + MAX_SIZE;
                const chunk = value.substring(start, end);
                await SecureStore.setItemAsync(`${key}_${i}`, chunk);
            }

            return true;
        } catch (error) {
            console.error('Erro ao salvar item no SecureStore:', error);
            return false;
        }
    },

    removeItem: async (key) => {
        try {
            // Verificar se é um valor particionado
            const info = await SecureStore.getItemAsync(`${key}_info`);

            if (info) {
                // É particionado, remover todas as partes
                const { chunks } = JSON.parse(info);

                for (let i = 0; i < chunks; i++) {
                    await SecureStore.deleteItemAsync(`${key}_${i}`);
                }

                await SecureStore.deleteItemAsync(`${key}_info`);
            }

            // Sempre tentar remover a chave principal
            return await SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.error('Erro ao remover item do SecureStore:', error);
            return false;
        }
    }
};

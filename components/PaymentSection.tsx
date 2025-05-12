import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Colors} from "@/constants/Colors";

const methods = [
    { label: 'PIX', icon: 'qr-code-outline' },
    { label: 'Crédito', icon: 'card-outline' },
    { label: 'Débito', icon: 'card-outline' },
    { label: 'Dinheiro', icon: 'cash-outline' },
];

export const PaymentSection = ({ selected, onSelect }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>FORMA DE PAGAMENTO</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                {methods.map(({ label, icon }) => (
                    <TouchableOpacity
                        key={label}
                        style={[styles.button, selected === label && styles.selected]}
                        onPress={() => onSelect(label)}
                    >
                        <Ionicons name={icon} size={20} color={selected === label ? '#fff' : Colors.primary} />
                        <Text style={[styles.text, selected === label && styles.selectedText]}>{label.toUpperCase()}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { paddingVertical: 12, paddingHorizontal: 16 },
    title: { color: Colors.gray, fontSize: 14, fontWeight: 'bold', marginBottom: 12 },
    scroll: { paddingBottom: 12 },
    button: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, padding: 10, marginRight: 10, backgroundColor: '#1A1A1A', borderWidth: 1, borderColor: Colors.darkGray },
    selected: { backgroundColor: Colors.primary, borderColor: Colors.primary },
    text: { marginLeft: 6, fontSize: 12, fontWeight: 'bold', color: Colors.gray },
    selectedText: { color: '#fff' },
});
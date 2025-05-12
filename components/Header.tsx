import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Colors} from "@/constants/Colors";

export const Header = ({ onBack, onClear, onCart, cartItemCount, onConfig }) => {
    return (
        <View style={styles.header}>
            <View style={styles.left}>
                <TouchableOpacity onPress={onBack} style={styles.button}>
                    <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.title}>PRODUTOS</Text>
            </View>
            <View style={styles.right}>
                <TouchableOpacity onPress={onClear} style={styles.button}>
                    <Ionicons name="trash-outline" size={22} color={Colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onCart} style={styles.button}>
                    <Ionicons name="cart-outline" size={22} color={Colors.primary} />
                    {cartItemCount > 0 && (
                        <View style={styles.badge}><Text style={styles.badgeText}>{cartItemCount}</Text></View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={onConfig} style={styles.button}>
                    <Ionicons name="menu" size={22} color={Colors.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: Colors.darkGray },
    left: { flexDirection: 'row', alignItems: 'center' },
    right: { flexDirection: 'row', alignItems: 'center' },
    title: { color: Colors.primary, fontWeight: 'bold', fontSize: 20, marginLeft: 12 },
    button: { marginLeft: 8, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255, 73, 36, 0.1)', justifyContent: 'center', alignItems: 'center' },
    badge: { position: 'absolute', top: -5, right: -5, backgroundColor: Colors.primary, borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
});

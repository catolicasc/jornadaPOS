import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { COLORS, type Product } from "@/types"

interface CheckoutItemProps {
    product: Product
    quantity: number
    onIncrease: (product: Product) => void
    onDecrease: (product: Product) => void
}

export default function CheckoutItem({ product, quantity, onIncrease, onDecrease }: CheckoutItemProps) {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: product.image_url || "https://via.placeholder.com/100" }}
                style={styles.image}
            />

            <View style={styles.details}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>

                <View style={styles.controls}>
                    <TouchableOpacity onPress={() => onDecrease(product)} style={styles.controlButton}>
                        <Ionicons name="remove" size={16} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <TouchableOpacity onPress={() => onIncrease(product)} style={styles.controlButton}>
                        <Ionicons name="add" size={16} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#111111",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    details: {
        flex: 1,
    },
    name: {
        color: COLORS.gray,
        fontSize: 14,
        fontWeight: "bold",
    },
    price: {
        color: COLORS.primary,
        fontSize: 13,
        marginVertical: 4,
    },
    controls: {
        flexDirection: "row",
        alignItems: "center",
    },
    controlButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    quantity: {
        color: "#fff",
        marginHorizontal: 12,
        fontSize: 14,
    },
})
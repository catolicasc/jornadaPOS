import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from "../types"

interface QuantityControlsProps {
    quantity: number
    maxQuantity: number
    onIncrease: () => void
    onDecrease: () => void
}

export default function QuantityControls({ quantity, maxQuantity, onIncrease, onDecrease }: QuantityControlsProps) {
    return (
        <View style={styles.quantityControls}>
            <TouchableOpacity style={styles.quantityButton} onPress={onDecrease} disabled={quantity <= 0}>
                <Ionicons name="remove" size={16} color={quantity <= 0 ? COLORS.darkGray : COLORS.primary} />
            </TouchableOpacity>

            <View style={styles.quantityDisplay}>
                <Text style={styles.quantityText}>{quantity}</Text>
            </View>

            <TouchableOpacity style={styles.quantityButton} onPress={onIncrease} disabled={quantity >= maxQuantity}>
                <Ionicons name="add" size={16} color={quantity >= maxQuantity ? COLORS.darkGray : COLORS.primary} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    quantityControls: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    quantityButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(255, 73, 36, 0.1)",
        justifyContent: "center",
        alignItems: "center",
    },
    quantityDisplay: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        backgroundColor: "#1A1A1A",
        borderRadius: 4,
        minWidth: 24,
        alignItems: "center",
    },
    quantityText: {
        color: COLORS.gray,
        fontSize: 12,
        fontWeight: "bold",
    },
})

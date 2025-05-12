import { View, Text, Image, StyleSheet } from "react-native"
import { COLORS, type Product } from "../types"
import QuantityControls from "./QuantityControls"

interface ProductCardProps {
    product: Product
    quantity: number
    onIncreaseQuantity: (product: Product) => void
    onDecreaseQuantity: (product: Product) => void
}

export default function ProductCard({ product, quantity, onIncreaseQuantity, onDecreaseQuantity }: ProductCardProps) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: product.image_url || "https://via.placeholder.com/100" }} style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                    {product.name}
                </Text>
                <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>

                <QuantityControls
                    quantity={quantity}
                    maxQuantity={product.stock}
                    onIncrease={() => onIncreaseQuantity(product)}
                    onDecrease={() => onDecreaseQuantity(product)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#111111",
        borderRadius: 8,
        margin: 4,
        flex: 1,
        maxWidth: "31.5%", // Aproximadamente 3 por linha com margens
        overflow: "hidden",
        elevation: 2,
    },
    image: {
        width: "100%",
        height: 90,
        resizeMode: "cover",
    },
    cardContent: {
        padding: 8,
    },
    name: {
        fontSize: 12,
        fontWeight: "600",
        color: COLORS.gray,
        marginBottom: 2,
    },
    price: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: "bold",
        marginBottom: 6,
    },
})

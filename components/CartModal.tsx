import { View, Text, Modal, TouchableOpacity, ScrollView, Image, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { COLORS, type CartItem } from "@/types"

interface CartModalProps {
    visible: boolean
    onClose: () => void
    cartItems: CartItem[]
    cartTotal: number
    onCheckout: () => void
}

export default function CartModal({ visible, onClose, cartItems, cartTotal, onCheckout }: CartModalProps) {
    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Meu Carrinho</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color={COLORS.gray} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.cartItems}>
                        {cartItems.length === 0 ? (
                            <Text style={styles.emptyCartText}>Seu carrinho está vazio</Text>
                        ) : (
                            cartItems.map((item) => (
                                <View key={item.id} style={styles.cartItem}>
                                    <Image
                                        source={{ uri: item.image_url || "https://via.placeholder.com/100" }}
                                        style={styles.cartItemImage}
                                    />
                                    <View style={styles.cartItemDetails}>
                                        <Text style={styles.cartItemName}>{item.name}</Text>
                                        <Text style={styles.cartItemPrice}>R$ {item.price.toFixed(2)}</Text>
                                    </View>
                                    <View style={styles.cartItemQuantity}>
                                        <Text style={styles.quantityText}>{item.quantity}</Text>
                                    </View>
                                </View>
                            ))
                        )}
                    </ScrollView>

                    <View style={styles.cartFooter}>
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalLabel}>TOTAL</Text>
                            <Text style={styles.totalValue}>R$ {cartTotal.toFixed(2)}</Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.checkoutButton, cartItems.length === 0 && styles.disabledCheckoutButton]}
                            disabled={cartItems.length === 0}
                            onPress={onCheckout}
                        >
                            <Text style={styles.checkoutButtonText}>FINALIZAR COMPRA</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: COLORS.overlay,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "90%",
        maxHeight: "80%",
        backgroundColor: "#111111",
        borderRadius: 12,
        overflow: "hidden",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.darkGray,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.primary,
    },
    cartItems: {
        maxHeight: 300,
    },
    emptyCartText: {
        color: COLORS.gray,
        textAlign: "center",
        padding: 20,
    },
    cartItem: {
        flexDirection: "row",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.darkGray,
        alignItems: "center",
    },
    cartItemImage: {
        width: 50,
        height: 50,
        borderRadius: 6,
    },
    cartItemDetails: {
        flex: 1,
        marginLeft: 12,
    },
    cartItemName: {
        color: COLORS.gray,
        fontSize: 16,
    },
    cartItemPrice: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: "bold",
    },
    cartItemQuantity: {
        backgroundColor: COLORS.darkGray,
        borderRadius: 4,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8,
    },
    quantityText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
    },
    cartFooter: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: COLORS.darkGray,
    },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    totalLabel: {
        color: COLORS.gray,
        fontSize: 14,
        fontWeight: "bold",
    },
    totalValue: {
        color: COLORS.primary,
        fontSize: 20,
        fontWeight: "bold",
    },
    checkoutButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
    },
    disabledCheckoutButton: {
        backgroundColor: COLORS.darkGray,
        opacity: 0.7,
    },
    checkoutButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
})

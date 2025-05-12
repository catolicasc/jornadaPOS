import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from "../types"

interface PaymentSectionProps {
    selectedPayment: string | null
    onSelectPayment: (method: string) => void
    cartTotal: number
    cartItemCount: number
    onCheckout: () => void
}

export default function PaymentSection({
                                           selectedPayment,
                                           onSelectPayment,
                                           cartTotal,
                                           cartItemCount,
                                           onCheckout,
                                       }: PaymentSectionProps) {
    return (
        <View style={styles.paymentMethodsContainer}>
            <Text style={styles.paymentTitle}>FORMA DE PAGAMENTO</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.paymentButtonsContainer}
            >
                <TouchableOpacity
                    style={[styles.paymentButton, selectedPayment === "PIX" && styles.selectedPaymentButton]}
                    onPress={() => onSelectPayment("PIX")}
                >
                    <Text style={[styles.pixIcon, selectedPayment === "PIX" && { color: "#FFF" }]}>PIX</Text>
                    <Text style={[styles.paymentButtonText, selectedPayment === "PIX" && styles.selectedPaymentText]}>PIX</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.paymentButton, selectedPayment === "Crédito" && styles.selectedPaymentButton]}
                    onPress={() => onSelectPayment("Crédito")}
                >
                    <Ionicons name="card-outline" size={22} color={selectedPayment === "Crédito" ? "#FFF" : COLORS.primary} />
                    <Text style={[styles.paymentButtonText, selectedPayment === "Crédito" && styles.selectedPaymentText]}>
                        CRÉDITO
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.paymentButton, selectedPayment === "Débito" && styles.selectedPaymentButton]}
                    onPress={() => onSelectPayment("Débito")}
                >
                    <Ionicons name="card-outline" size={22} color={selectedPayment === "Débito" ? "#FFF" : COLORS.primary} />
                    <Text style={[styles.paymentButtonText, selectedPayment === "Débito" && styles.selectedPaymentText]}>
                        DÉBITO
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.paymentButton, selectedPayment === "Dinheiro" && styles.selectedPaymentButton]}
                    onPress={() => onSelectPayment("Dinheiro")}
                >
                    <Ionicons name="cash-outline" size={22} color={selectedPayment === "Dinheiro" ? "#FFF" : COLORS.primary} />
                    <Text style={[styles.paymentButtonText, selectedPayment === "Dinheiro" && styles.selectedPaymentText]}>
                        DINHEIRO
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Botão de finalizar compra */}
            <TouchableOpacity
                style={[styles.checkoutButton, cartItemCount === 0 && styles.disabledCheckoutButton]}
                disabled={cartItemCount === 0}
                onPress={onCheckout}
            >
                <Text style={styles.checkoutButtonText}>
                    FINALIZAR COMPRA {cartItemCount > 0 ? `(R$ ${cartTotal.toFixed(2)})` : ""}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    paymentMethodsContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#111111",
        borderTopWidth: 1,
        borderTopColor: COLORS.darkGray,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    paymentTitle: {
        color: COLORS.gray,
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 12,
    },
    paymentButtonsContainer: {
        paddingBottom: 16,
    },
    paymentButton: {
        backgroundColor: "#1A1A1A",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginRight: 12,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: COLORS.darkGray,
        minWidth: 90,
    },
    selectedPaymentButton: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    paymentButtonText: {
        color: COLORS.gray,
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 8,
    },
    selectedPaymentText: {
        color: "#FFFFFF",
    },
    pixIcon: {
        color: COLORS.primary,
        fontSize: 16,
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

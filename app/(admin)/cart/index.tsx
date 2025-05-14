import { View, Text, ScrollView, StyleSheet, StatusBar, Alert, TextInput } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "expo-router"
import { COLORS } from "@/types"
import { RootState } from "@/store"
import { Header } from "@/components/Header"
import { PaymentSection } from "@/components/PaymentSection"
import { setQuantity } from "@/store/cartSlice"
import CheckoutItem from "@/components/CheckoutItem"
import {useState} from "react";

export default function CartScreen() {
    const dispatch = useDispatch()
    const router = useRouter()

    const cart = useSelector((state: RootState) => state.cart.items)
    const productQuantities = useSelector((state: RootState) => state.cart.quantities)
    const selectedPayment = useSelector((state: RootState) => state.payment.selectedMethod)

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

    const [discount, setDiscount] = useState(0)
    const [extraFee, setExtraFee] = useState(0)

    const handleIncreaseQuantity = (product) => {
        const current = productQuantities[product.id] || 0
        if (current < product.stock) {
            dispatch(setQuantity({ product, quantity: current + 1 }))
        }
    }

    const handleDecreaseQuantity = (product) => {
        const current = productQuantities[product.id] || 0
        if (current > 0) {
            dispatch(setQuantity({ product, quantity: current - 1 }))
        }
    }

    const handleCheckout = () => {
        const finalAmount = subtotal - discount + extraFee
        Alert.alert("Compra realizada", `Total: R$ ${finalAmount.toFixed(2)} via ${selectedPayment}`)
    }

    const finalTotal = subtotal - discount + extraFee

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />

            <Header onBack={() => router.back()} title="Carrinho" />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>Itens no Carrinho</Text>
                {cart.map((item) => (
                    <CheckoutItem
                        key={item.id}
                        product={item}
                        quantity={item.quantity}
                        onIncrease={handleIncreaseQuantity}
                        onDecrease={handleDecreaseQuantity}
                    />
                ))}

                <View style={styles.totalRowTop}>
                    <Text style={styles.totalLabel}>Forma de Pagamento:</Text>
                    <Text style={styles.totalValue}>{selectedPayment} | R$ {finalTotal.toFixed(2)}</Text>
                </View>

                <View style={styles.adjustments}>
                    <View style={styles.adjustBox}>
                        <Text style={styles.adjustLabel}>Desconto:</Text>
                        <TextInput
                            style={styles.adjustInput}
                            keyboardType="numeric"
                            value={discount.toString()}
                            onChangeText={(text) => setDiscount(Number(text))}
                            placeholder="0"
                            placeholderTextColor={COLORS.darkGray}
                        />
                    </View>

                    <View style={styles.adjustBox}>
                        <Text style={styles.adjustLabel}>Acréscimo:</Text>
                        <TextInput
                            style={styles.adjustInput}
                            keyboardType="numeric"
                            value={extraFee.toString()}
                            onChangeText={(text) => setExtraFee(Number(text))}
                            placeholder="0"
                            placeholderTextColor={COLORS.darkGray}
                        />
                    </View>
                </View>

                <View style={styles.spacer} />
            </ScrollView>

            <PaymentSection onCheckout={handleCheckout} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 160,
    },
    sectionTitle: {
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    totalRowTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
    },
    totalLabel: {
        color: COLORS.gray,
        fontSize: 14,
    },
    totalValue: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: "bold",
    },
    adjustments: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
    },
    adjustBox: {
        flex: 1,
        marginRight: 8,
    },
    adjustLabel: {
        color: COLORS.gray,
        fontSize: 12,
        marginBottom: 4,
    },
    adjustInput: {
        backgroundColor: "#111111",
        color: COLORS.gray,
        borderRadius: 6,
        padding: 10,
        fontSize: 14,
    },
    spacer: {
        height: 20,
    },
})

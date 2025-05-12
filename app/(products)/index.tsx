import { useState, useEffect } from "react"
import { View, FlatList, StatusBar, StyleSheet, Alert } from "react-native"
import { type Product, type CartItem, type Category, type ConfigOption, COLORS } from "@/types"
import SearchBar from "@/components/SearchBar"
import CategoryList from "@/components/CategoryList"
import ProductCard from "@/components/ProductCard"
import CartModal from "@/components/CartModal"
import ConfigModal from "@/components/ConfigModal"
import {Header} from "@/components/Header";
import {PaymentSection} from "@/components/PaymentSection";

export default function ProductListScreen() {
    const [categories] = useState<Category[]>([
        { id: "all", name: "Todos" },
        { id: "refrigerantes", name: "Refrigerantes" },
        { id: "aguas", name: "Águas" },
        { id: "sucos", name: "Sucos" },
        { id: "cervejas", name: "Cervejas" },
        { id: "snacks", name: "Snacks" },
    ])

    const [allProducts] = useState<Product[]>([
        {
            id: "1",
            name: "Coca-Cola",
            price: 6.5,
            stock: 20,
            image_url: "https://zaffari.vtexassets.com/arquivos/ids/276576/1007841-00.jpg?v=638802406334870000",
            category: "refrigerantes",
        },
        {
            id: "2",
            name: "Pepsi",
            price: 5.9,
            stock: 15,
            image_url: "https://via.placeholder.com/100",
            category: "refrigerantes",
        },
        {
            id: "3",
            name: "Guaraná",
            price: 4.5,
            stock: 30,
            image_url: "https://via.placeholder.com/100",
            category: "refrigerantes",
        },
        {
            id: "4",
            name: "Água Mineral",
            price: 3.0,
            stock: 40,
            image_url: "https://via.placeholder.com/100",
            category: "aguas",
        },
        {
            id: "5",
            name: "Água com Gás",
            price: 3.5,
            stock: 25,
            image_url: "https://via.placeholder.com/100",
            category: "aguas",
        },
        {
            id: "6",
            name: "Suco de Laranja",
            price: 7.0,
            stock: 18,
            image_url: "https://via.placeholder.com/100",
            category: "sucos",
        },
        {
            id: "7",
            name: "Suco de Uva",
            price: 7.0,
            stock: 15,
            image_url: "https://via.placeholder.com/100",
            category: "sucos",
        },
        {
            id: "8",
            name: "Cerveja Pilsen",
            price: 8.5,
            stock: 24,
            image_url: "https://via.placeholder.com/100",
            category: "cervejas",
        },
        {
            id: "9",
            name: "Batata Chips",
            price: 5.0,
            stock: 35,
            image_url: "https://via.placeholder.com/100",
            category: "snacks",
        },
    ])

    const [cart, setCart] = useState<CartItem[]>([])
    const [productQuantities, setProductQuantities] = useState<Record<string, number>>({})
    const [cartModalVisible, setCartModalVisible] = useState(false)
    const [configModalVisible, setConfigModalVisible] = useState(false)
    const [selectedPayment, setSelectedPayment] = useState<string | null>("PIX") // PIX como padrão
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts)

    const configOptions: ConfigOption[] = [
        {
            id: "sales",
            name: "Lista de Vendas",
            icon: "list",
            action: () => {
                console.log("Abrindo lista de vendas")
                setConfigModalVisible(false)
            },
        },
        {
            id: "courtesy",
            name: "Cortesia",
            icon: "gift",
            action: () => {
                console.log("Abrindo cortesia")
                setConfigModalVisible(false)
            },
        },
        {
            id: "cashOps",
            name: "Operações de Caixa",
            icon: "cash",
            action: () => {
                console.log("Abrindo operações de caixa")
                setConfigModalVisible(false)
            },
        },
        {
            id: "reprintReceipt",
            name: "Reimprimir Comprovante",
            icon: "receipt",
            action: () => {
                console.log("Reimprimindo comprovante")
                setConfigModalVisible(false)
            },
        },
        {
            id: "reprintSale",
            name: "Reimprimir Venda",
            icon: "print",
            action: () => {
                console.log("Reimprimindo venda")
                setConfigModalVisible(false)
            },
        },
    ]

    useEffect(() => {
        const initialQuantities: Record<string, number> = {}
        allProducts.forEach((product) => {
            initialQuantities[product.id] = 0
        })
        setProductQuantities(initialQuantities)
    }, [allProducts])

    useEffect(() => {
        let filtered = allProducts

        // Filtrar por categoria
        if (selectedCategory !== "all") {
            filtered = filtered.filter((product) => product.category === selectedCategory)
        }

        // Filtrar por busca
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter((product) => product.name.toLowerCase().includes(query))
        }

        setFilteredProducts(filtered)
    }, [selectedCategory, searchQuery, allProducts])

    // Handlers
    const handleIncreaseQuantity = (product: Product) => {
        if (productQuantities[product.id] < product.stock) {
            const newQuantities = {
                ...productQuantities,
                [product.id]: (productQuantities[product.id] || 0) + 1,
            }
            setProductQuantities(newQuantities)
            updateCart(product, newQuantities[product.id])
        }
    }

    const handleDecreaseQuantity = (product: Product) => {
        if (productQuantities[product.id] > 0) {
            const newQuantities = {
                ...productQuantities,
                [product.id]: (productQuantities[product.id] || 0) - 1,
            }
            setProductQuantities(newQuantities)
            updateCart(product, newQuantities[product.id])
        }
    }

    const updateCart = (product: Product, quantity: number) => {
        if (quantity <= 0) {
            // Remover do carrinho se quantidade for 0
            setCart(cart.filter((item) => item.id !== product.id))
            return
        }

        const existingItemIndex = cart.findIndex((item) => item.id === product.id)

        if (existingItemIndex >= 0) {
            // Atualizar quantidade se já estiver no carrinho
            const updatedCart = [...cart]
            updatedCart[existingItemIndex] = { ...updatedCart[existingItemIndex], quantity }
            setCart(updatedCart)
        } else {
            // Adicionar ao carrinho se não estiver
            setCart([...cart, { ...product, quantity }])
        }
    }

    const toggleCartModal = () => {
        setCartModalVisible(!cartModalVisible)
    }

    const toggleConfigModal = () => {
        setConfigModalVisible(!configModalVisible)
    }

    const handlePayment = (method: string) => {
        setSelectedPayment(method)
    }

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId)
    }

    const handleClearCart = () => {
        setCart([])
        const resetQuantities: Record<string, number> = {}
        allProducts.forEach((product) => {
            resetQuantities[product.id] = 0
        })
        setProductQuantities(resetQuantities)
    }

    const handleCheckout = () => {
        Alert.alert("Finalizar Compra", `Processando pagamento de R$ ${cartTotal.toFixed(2)} via ${selectedPayment}`)
    }

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />

            <Header
                cartItemCount={cartItemCount}
                toggleCartModal={toggleCartModal}
                toggleConfigModal={toggleConfigModal}
                clearCart={handleClearCart}
            />

            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <CategoryList
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
            />

            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                numColumns={3}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        quantity={productQuantities[item.id] || 0}
                        onIncreaseQuantity={handleIncreaseQuantity}
                        onDecreaseQuantity={handleDecreaseQuantity}
                    />
                )}
            />

            <PaymentSection
                selectedPayment={selectedPayment}
                onSelectPayment={handlePayment}
                cartTotal={cartTotal}
                cartItemCount={cartItemCount}
                onCheckout={handleCheckout}
            />

            <CartModal
                visible={cartModalVisible}
                onClose={toggleCartModal}
                cartItems={cart}
                cartTotal={cartTotal}
                onCheckout={handleCheckout}
            />

            <ConfigModal visible={configModalVisible} onClose={toggleConfigModal} options={configOptions} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    listContainer: {
        padding: 8,
        paddingBottom: 160
    },
})

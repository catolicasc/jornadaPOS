import { useState, useEffect } from "react"
import { View, FlatList, StatusBar, StyleSheet, Text } from "react-native"
import { type Product, type Category, COLORS } from "@/types"
import SearchBar from "@/components/SearchBar"
import CategoryList from "@/components/CategoryList"
import ProductCard from "@/components/ProductCard"
import { Header } from "@/components/Header"
import { PaymentSection } from "@/components/PaymentSection"
import { useQuery } from "@apollo/client"
import { GET_PRODUCTS_AND_CATEGORIES } from "@/graphiQl/products"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { setQuantity} from "@/store/cartSlice"
import {useRouter} from "expo-router";

export default function ProductListScreen() {
    const dispatch = useDispatch()
    const router = useRouter()
    const productQuantities = useSelector((state: RootState) => state.cart.quantities)

    const { data, loading, error } = useQuery(GET_PRODUCTS_AND_CATEGORIES)

    const [configModalVisible, setConfigModalVisible] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([{ id: "all", name: "Todos" }])

    useEffect(() => {
        if (data?.products && data?.categories) {
            const mappedProducts = data.products.map((p: any) => ({
                ...p,
                category: p.category_id,
            }))
            setAllProducts(mappedProducts)
            setCategories([{ id: "all", name: "Todos" }, ...data.categories])
        }
    }, [data])

    useEffect(() => {
        let filtered = allProducts
        if (selectedCategory !== "all") {
            filtered = filtered.filter((product) => product.category_id === selectedCategory)
            debugger
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter((product) => product.name.toLowerCase().includes(query))
        }
        setFilteredProducts(filtered)
    }, [selectedCategory, searchQuery, allProducts])

    const handleIncreaseQuantity = (product: Product) => {
        const current = productQuantities[product.id] || 0
        if (current < product.stock) {
            dispatch(setQuantity({ product, quantity: current + 1 }))
        }
    }

    const handleDecreaseQuantity = (product: Product) => {
        const current = productQuantities[product.id] || 0
        if (current > 0) {
            dispatch(setQuantity({ product, quantity: current - 1 }))
        }
    }

    const toggleConfigModal = () => setConfigModalVisible(!configModalVisible)
    const handleCategorySelect = (categoryId: string) => setSelectedCategory(categoryId)

    if (loading) return <Text>Carregando...</Text>
    if (error) return <Text>Erro: {error.message}</Text>

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />

            <Header
                onBack={() => router.back()}
                onConfig={toggleConfigModal}
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
            <PaymentSection />
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
        paddingBottom: 160,
    },
})

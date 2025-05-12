import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import { COLORS, type Category } from "../types"

interface CategoryListProps {
    categories: Category[]
    selectedCategory: string
    onSelectCategory: (categoryId: string) => void
}

export default function CategoryList({ categories, selectedCategory, onSelectCategory }: CategoryListProps) {
    return (
        <View style={styles.categoriesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesList}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[styles.categoryButton, selectedCategory === category.id && styles.selectedCategoryButton]}
                        onPress={() => onSelectCategory(category.id)}
                    >
                        <Text style={[styles.categoryButtonText, selectedCategory === category.id && styles.selectedCategoryText]}>
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    categoriesContainer: {
        marginBottom: 12,
    },
    categoriesList: {
        paddingHorizontal: 12,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "#111111",
        borderRadius: 20,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: COLORS.darkGray,
    },
    selectedCategoryButton: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    categoryButtonText: {
        color: COLORS.gray,
        fontSize: 12,
        fontWeight: "bold",
    },
    selectedCategoryText: {
        color: "#FFFFFF",
    },
})

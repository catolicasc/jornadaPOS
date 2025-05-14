import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product, CartItem } from '@/types'

interface CartState {
    items: CartItem[]
    quantities: Record<string, number>
}

const initialState: CartState = {
    items: [],
    quantities: {},
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setQuantity: (state, action: PayloadAction<{ product: Product, quantity: number }>) => {
            const { product, quantity } = action.payload
            state.quantities[product.id] = quantity

            if (quantity <= 0) {
                state.items = state.items.filter(item => item.id !== product.id)
            } else {
                const index = state.items.findIndex(item => item.id === product.id)
                if (index >= 0) {
                    state.items[index].quantity = quantity
                } else {
                    state.items.push({ ...product, quantity })
                }
            }
        },
        clearCart: (state) => {
            state.items = []
            state.quantities = {}
        },
    },
})

export const { setQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer

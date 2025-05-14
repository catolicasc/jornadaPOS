import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import paymentReducer from './paymentSlice'
import cartModalReducer from './cartModalSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        payment: paymentReducer,
        cartModal: cartModalReducer,

    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

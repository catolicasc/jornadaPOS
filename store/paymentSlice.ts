import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PaymentState {
    selectedMethod: string
}

const initialState: PaymentState = {
    selectedMethod: 'PIX', // valor padrão
}

export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setPaymentMethod: (state, action: PayloadAction<string>) => {
            state.selectedMethod = action.payload
        },
    },
})

export const { setPaymentMethod } = paymentSlice.actions
export default paymentSlice.reducer

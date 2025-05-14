import { createSlice } from '@reduxjs/toolkit'

interface CartModalState {
    visible: boolean
}

const initialState: CartModalState = {
    visible: false,
}

export const cartModalSlice = createSlice({
    name: 'cartModal',
    initialState,
    reducers: {
        openCartModal: (state) => {
            state.visible = true
        },
        closeCartModal: (state) => {
            state.visible = false
        },
        toggleCartModal: (state) => {
            state.visible = !state.visible
        },
    },
})

export const { openCartModal, closeCartModal, toggleCartModal } = cartModalSlice.actions
export default cartModalSlice.reducer

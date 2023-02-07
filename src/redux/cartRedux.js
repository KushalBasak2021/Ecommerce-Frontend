import { createSlice } from "@reduxjs/toolkit";

const cartItemQuantitySlice = createSlice({
  name: "cartItemQuantity",
  initialState: {
    quantity: 0,
    total: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    removeItemToCart: (state, action) => {
      state.quantity -= 1;
      state.total -= action.payload.price * action.payload.quantity;
    },
    setItemToCart: (state, action) => {
      state.quantity = action.payload.quantity;
      state.total = action.payload.total;
    },
  },
});

export const { addItemToCart, removeItemToCart, setItemToCart } =
  cartItemQuantitySlice.actions;
export default cartItemQuantitySlice.reducer;

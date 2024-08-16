import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], 
    totalQuantity: 0, 
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
    },
    
    removeItem: (state, action) => {
      const item = state.items.find(item => item.name === action.payload.name);
      if (item) {
        state.totalQuantity -= item.quantity;
        state.items = state.items.filter(item => item.name !== action.payload.name);
      }
    },
    
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.name === action.payload.name);
      if (item) {
        const quantityDifference = action.payload.quantity - item.quantity;
        item.quantity = action.payload.quantity;
        state.totalQuantity += quantityDifference;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

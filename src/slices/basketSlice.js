import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index > -1) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Can't remove product (id: ${action.payload.id})`);
      }
      state.items = newBasket;
    },

    removeGroupedFromBasket: (state, action) => {
      let newBasket = state.items.filter(
        (item) => item.id !== action.payload.id
      );

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket, removeGroupedFromBasket } =
  basketSlice.actions;

export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;

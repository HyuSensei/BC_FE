import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  cartItem: localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: "customer/cart",
  initialState,
  reducers: {
    addTocart(state, action) {
      const itemIdex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIdex >= 0) {
        state.cartItem[itemIdex].cartQuantity += 1;
        message.info("Tăng số lượng giỏ hàng thành công ");
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItem.push(tempProduct);
        message.success("Thêm giỏ hàng thành công ");
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },

    addTocartDetail(state, action) {
      console.log(action.payload);
      const itemIdex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIdex >= 0) {
        let quantity = parseInt(action.payload.cartQuantity);
        state.cartItem[itemIdex].cartQuantity += quantity;
        console.log(state.cartItem[itemIdex].cartQuantity);
        message.info("Tăng số lượng giỏ hàng thành công ");
      } else {
        let quantity = parseInt(action.payload.cartQuantity);
        const tempProduct = { ...action.payload, cartQuantity: quantity };
        state.cartItem.push(tempProduct);
        message.success("Thêm giỏ hàng thành công ");
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },

    decreaseCart(state, action) {
      const itemIdex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItem[itemIdex].cartQuantity > 1) {
        state.cartItem[itemIdex].cartQuantity -= 1;
        message.info("Giảm số lượng giỏ hàng thành công ");
      } else if (state.cartItem[itemIdex].cartQuantity === 1) {
        const nextCartItem = state.cartItem.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItem = nextCartItem;
        message.success("Xóa giỏ hàng thành công ");
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },

    removeCart(state, action) {
      const nextCartItem = state.cartItem.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItem = nextCartItem;
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
      message.success("Xóa giỏ hàng thành công ");
    },

    getTotal(state, action) {
      const cart = state.cartItem;
      state.cartTotalQuantity = cart.length;
      let total = 0;
      for (let i = 0; i < cart.length; i++) {
        total += cart[i].cartQuantity * cart[i].price;
      }
      state.cartTotalAmount = total;
    },

    clearCart(state, action) {
      state.cartItem = [];
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
  },
  extraReducers: (builder) => {},
});

export const {
  addTocart,
  removeCart,
  decreaseCart,
  getTotal,
  clearCart,
  addTocartDetail,
} = cartSlice.actions;

export default cartSlice.reducer;

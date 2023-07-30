import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { BuyProduct } from "../components/buy/BuyList";

interface BuyCheckProps {
  products: BuyProduct[];
  productTotal: number;
  productAmount: number;
}

const initialState: BuyCheckProps = {
  products: [],
  productTotal: 0,
  productAmount: 0,
};

const BuyListSlice = createSlice({
  name: "buylist",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<BuyProduct>) => {
      const checkProduct = state.products.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (checkProduct === -1) {
        state.products.push({ ...action.payload });
      } else {
        state.products[checkProduct].quantity += action.payload.quantity;
      }
    },

    deleteProduct: (state, action) => {
      const index = state.products.findIndex(
        (item) => item.id === action.payload,
      );
      state.products.splice(index, 1);
    },

    deleteSelectProduct: (state, action) => {
      const selectedProductIds = state.products
        .filter((item) => item.selected)
        .map((item) => item.id);

      state.products = state.products.filter(
        (item) => !selectedProductIds.includes(item.id),
      );
    },

    deleteUnSelectProduct: (state, action) => {
      const selectedProductIds = state.products
        .filter((item) => item.selected === false)
        .map((item) => item.id);

      state.products = state.products.filter(
        (item) => !selectedProductIds.includes(item.id),
      );
    },

    plusProduct: (state, action) => {
      const index = state.products.findIndex(
        (item) => item.id === action.payload,
      );
      state.products[index].quantity++;
    },
    minusProduct: (state, action) => {
      const index = state.products.findIndex(
        (item) => item.id === action.payload,
      );
      if (state.products[index].quantity > 1) {
        state.products[index].quantity--;
      }
    },

    totalProductPrice: (state, action) => {
      const selectedProducts = state.products.filter((item) => item.selected);

      const totalPrice = selectedProducts.reduce((acc, product) => {
        return acc + product.product_price * product.quantity;
      }, 0);

      state.productTotal = totalPrice;
    },

    totalProductAmount: (state, action) => {
      const selectedProducts = state.products.filter((item) => item.selected);

      const totalAmount = selectedProducts.reduce((acc, product) => {
        return acc + product.quantity;
      }, 0);

      state.productAmount = totalAmount;
    },

    checkedProduct: (state, action) => {
      const index = state.products.findIndex(
        (item) => item.id === action.payload,
      );
      if (index !== -1) {
        state.products[index].selected = true;
      }
      return state;
    },

    unCheckedProduct: (state, action) => {
      const index = state.products.findIndex(
        (item) => item.id === action.payload,
      );
      if (index !== -1) {
        state.products[index].selected = false;
      }
      return state;
    },

    checkWholeProduct: (state, action) => {
      state.products.forEach((product) => {
        product.selected = true;
      });
    },

    unCheckWholeProduct: (state, action) => {
      state.products.forEach((product) => {
        product.selected = false;
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const {
  addProduct,
  deleteProduct,
  deleteSelectProduct,
  deleteUnSelectProduct,
  plusProduct,
  minusProduct,
  checkedProduct,
  unCheckedProduct,
  checkWholeProduct,
  unCheckWholeProduct,
  totalProductPrice,
  totalProductAmount,
} = BuyListSlice.actions;
export default BuyListSlice.reducer;

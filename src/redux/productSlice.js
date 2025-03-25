// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Async thunk for fetching products
// export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {

//   const response = await fetch("https://fakestoreapi.com/products");
//   console.log(response);
//     if (!response.ok) {
//         throw new Error("Failed to fetch products");
//     }
//   return response.json();
  
// });

// const productSlice = createSlice({
//   name: "product",
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
     
//   },
 

// });

// export default productSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch products asynchronously
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  return response.json();
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    cart: [], // 🛒 Cart State
    loading: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToCart, removeFromCart } = productSlice.actions;
export default productSlice.reducer;

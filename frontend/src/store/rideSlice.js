import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    loading: false,
    error: null
  },
  reducers: {
    setOrderItems: (state, action) => {
        const orderData = action.payload.data;
        if (!Array.isArray(orderData) || orderData.length === 0) {
          state.orders = []; // Clear previous orders if no new data
          return;
        }
      
        // Mapping multiple orders
        state.orders = orderData.map(order => ({
          orderId: order._id,
          totalAmount: order.totalAmount,
          paymentStatus: order.paymentStatus,
          orderStatus: order.orderStatus,
          orderDate: order.createdAt,
          deliveryByDate: order.deliveryByDate,
          orderCode: order.orderCode,
          addressId: order.addressId,
          userId: order.userId,
          createdAt: order.createdAt,
          deliveryDate:order.deliveryDate,
          items: order.items.map(item => ({
            productId: item.productId._id,
            name: item.productId.productName,
            price: item.productId.salePrice,
            size: item.size,
            image: item.productId.images[0],
            quantity: item.quantity,
            amount: item.amount
          }))
        }));
      
      },
      
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setOrderItems, setLoading, setError } = orderSlice.actions;
export default orderSlice.reducer;

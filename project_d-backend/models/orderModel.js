import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },

  // orderItems: [
  //   {
  //     product: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Product",
  //     },
  //     quantity: Number,
  //   },
  // ],

 user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
 cartItems: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
    },
  },
],
  shippingAddress: {
    name: String,
    address: String,
    city: String,
    postal: String,
  },
  totalPrice: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    default: "pending",
  },
  paymentId: {
  type: String,
  unique: true,
  sparse: true,
},
},
{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
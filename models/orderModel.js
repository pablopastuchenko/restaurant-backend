import mongoose from "mongoose";

//schema
const ordersSchema = new mongoose.Schema(
    {
      foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foods" }],
      payment: {},
      buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        enum: ["preparing", "prepare", "on the way", "deliverd"],
        default: "preparing",
      },
    },
    { timestamps: true }
  );
  
  //export
export const orderModel = mongoose.model("Orders", ordersSchema);


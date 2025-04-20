import mongoose, { model, Schema } from "mongoose";

const cartSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            default:1
        }
    }
);

const Cart = model('Cart', cartSchema) || mongoose.models.Cart

export default Cart;
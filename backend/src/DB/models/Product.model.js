import mongoose ,{model , Schema} from "mongoose";

const productSchema=new Schema(
    {
        name: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          detaileddescription: {
            type: String,
            default: "",
          },
          image: {
            type: String,
            default: "",
          },
          images: [
            {
              type: String,
            },
          ],
          brand: {
            type: String,
            ref: "Brand",
            required: true,
          },
          price: {
            type: Number,
            default: 0,
            min: 0,
          },
          category: {
            type: String,
            ref: "Category",
            required: true,
          },
          countInStock: {
            type: Number,
            required: true,
            min: 0,
          },
          rating: {
            type: Number,
            default: 0,
            min: 0,
          },
          numReviews: {
            type: Number,
            default: 0,
            min: 0,
          },
          isFeatured: {
            type: Boolean,
            default: false,
          },
          isLoved: {
            type: Boolean,
            default: false,
          },
          dateCreated: {
            type: Date,
            default: Date.now,
          },
          discount: {
            type: Number,
            default: 0,
          },
          finalprice: {
            type: Number,
            default: 0,
          },
    },
    {timestamps:true}
);

const Product = model('Product' , productSchema) || mongoose.models.Product;

export default Product;
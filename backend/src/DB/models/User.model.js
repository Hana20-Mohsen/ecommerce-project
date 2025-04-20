import mongoose ,{Schema , model} from "mongoose";
// import { userRoles } from "../../middleware/auth.middleware.js";
const userSchema= new Schema(
    {
        name: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
          },
          password: {
            type: String,
            required: true,
          },
          phone: {
            type: String,
            required: true,
          },
          isAdmin: {
            type: Boolean,
            default: false,
          },
          role:{
            type: String,
            // enum:Object.values(userRoles),
            // default:userRoles.user
            default:'user'
          },
          street: {
            type: String,
            default: "",
          },
          apartment: {
            type: String,
            default: "",
          },
        
          city: {
            type: String,
            default: "",
          },
          country: {
            type: String,
            default: "",
          },
          wishlist: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
            },
          ],
    },
    { timestamps: true } 
);
const User= model('User' , userSchema)|| mongoose.models.User  ;
export default User;
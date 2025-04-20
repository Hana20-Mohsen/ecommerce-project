import mongoose ,{model , Schema} from "mongoose";

const brandSchema= new Schema(
    {
        image:{
            type:String,
            default:''
        },
        name:{
            type:String,
            required:true,
            unique:true
        },
        slug:{
            type:String,
            default:''
        }
    }
)

brandSchema.virtual("id").get(function () {
  // console.log("test");
  console.log(this._id);
  // console.log("test");
  return this._id;
});

brandSchema.set("toJSON", {
  virtuals: true,
});

const Brand = model("Brand", brandSchema) || mongoose.models.Brand;;
export default Brand

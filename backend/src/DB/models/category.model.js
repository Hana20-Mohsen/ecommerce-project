import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  image: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    default: "",
  },
});
categorySchema.virtual("id").get(function () {
  // console.log("test");
  console.log(this._id);
  // console.log("test");
  return this._id;
});

categorySchema.set("toJSON", {
  virtuals: true,
});

const Category = mongoose.model("Category", categorySchema) || mongoose.models.Category;;
export default Category

const mongoose = require("mongoose");

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

exports.Category = mongoose.model("Category", categorySchema);

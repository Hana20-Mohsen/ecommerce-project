const { Product } = require("../models/product");
const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});
const uploadOptions = multer({ storage: storage });
router.get("/bycategory", async (req, res) => {
  try {
    let filter = {};
    if (req.query.categories) {
      filter = { categoryName: req.query.categories };
    }

    console.log(filter);

    const productList = await Product.find({
      category: req.query.categories,
    });

    if (!productList || productList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found." });
    }

    res.status(200).json({ success: true, productList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const productList = await Product.find();

    if (!productList || productList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found." });
    }

    res.status(200).json({ success: true, productList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
router.post(`/`, uploadOptions.single("image"), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send("No image in the request");

  const fileName = file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: `${basePath}${fileName}`, // "http://localhost:3000/public/upload/image-2323232"
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
    discount: req.body.discount,
  });
  const category = await Category.findOne({ name: product.category });
  if (!category) return res.status(400).send("Invalid Category");
  if (product.discount) {
    let discountprice = (price * discount) / 100;
  } else {
    discountprice = product.price;
  }
  product.finalPrice = discountprice;

  product = await product.save();

  if (!product) return res.status(500).send("The product cannot be created");

  res.send(product);
});
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Product Id");
    }

    let product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price, // Apply the discount
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        discount: req.body.discount,
      },
      { new: true }
    );
    product.finalprice = product.price * (1 - product.discount / 100);
    const category = await Category.findOne({ name: product.category });
    if (!category) return res.status(400).send("Invalid Category");
    if (!product) return res.status(500).send("The product cannot be updated!");

    res.send(product);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error });
  }
});
router.delete("/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (product) {
        // Product was deleted successfully, now fetch all products
        return Product.find({});
      } else {
        // Product not found
        return res
          .status(404)
          .json({ success: false, message: "Product not found!" });
      }
    })
    .then((products) => {
      // Products fetched successfully
      return res.status(200).json({
        success: true,
        message: "The product is deleted!",
        products: products,
      });
    })
    .catch((err) => {
      // Error occurred
      return res.status(500).json({ success: false, error: err });
    });
});

router.get(`/get/count`, async (req, res) => {
  const productCount = await Product.countDocuments((count) => count);

  if (!productCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    productCount: productCount,
  });
});

router.get(`/get/featured/:count`, async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const products = await Product.find({ isFeatured: true }).limit(+count);

  if (!products) {
    res.status(500).json({ success: false });
  }
  res.send(products);
});

router.put(
  "/gallery-images/:id",
  uploadOptions.array("images", 10),
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Product Id");
    }
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    if (files) {
      files.map((file) => {
        imagesPaths.push(`${basePath}${file.filename}`);
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesPaths,
      },
      { new: true }
    );

    if (!product) return res.status(500).send("the gallery cannot be updated!");

    res.send(product);
  }
);
module.exports = router;
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
router.get(`/`, async (req, res) => {
  const userList = await User.find().select("-password");

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res
      .status(500)
      .json({ message: "The user with the given ID was not found." });
  }
  res.status(200).send(user);
});
router.post("/", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcryptjs.hashSync(req.body.password, 7),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  user = await user.save();

  if (!user) return res.status(400).send("the user cannot be created!");

  res.send(user);
});
router.post("/login", async (req, res) => {
  const passtoken = process.env.passtoken;
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("user not found!");
  }
  if (user && bcryptjs.compareSync(req.body.password, user.password)) {
    const token = jsonwebtoken.sign(
      { userid: user.id, isAdmin: user.isAdmin },
      passtoken
    );
    res.status(200).send({ user: user.email, token, userid: user._id });
  } else {
    res.status(400).send("wrong info");
  }
});

router.post("/register", async (req, res) => {
  let email = req.body.email;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send("Email already exists");
  }
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcryptjs.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  user = await user.save();

  if (!user) return res.status(400).send("the user cannot be created!");

  res.send(user);
});

router.post("/forgotpassword", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Reset link sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get(`/get/count`, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    return res.status(200).json({ count: userCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/wishlist/:userId", async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.params.userId;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { wishlist: productId },
        // Update the wishlist array directly
      },
      { new: true }
    );
    console.log(productId); // Set { new: true } to return the modified document

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product added to wishlist", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});
router.delete("/wishlist/:userId/:productId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Find the index of the product in the wishlist array
    const index = user.wishlist.indexOf(productId);

    // If the product is found in the wishlist, remove it
    if (index !== -1) {
      user.wishlist.splice(index, 1);
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Product removed from wishlist" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in wishlist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
router.get("/wishlist/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate("wishlist");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const wishlist = user.wishlist;

    res.status(200).json({ success: true, wishlist: wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;

const { Order } = require("../models/order");
const express = require("express");
const { OrderItem } = require("../models/order-item");
const router = express.Router();
const Coupon = require("../models/coupon");
const { Product } = require("../models/product");
const jwt = require("jsonwebtoken");
const jwksRsa = require("jwks-rsa"); // Import express-jwt library
router.get(`/`, async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "email")
    .sort({ dateordered: -1 });

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});
router.post("/", async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })
  );
  const orderItemsIdsResolved = await orderItemsIds;

  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product",
        "price"
      );
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    })
  );

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

  let order = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  });
  const enteredCouponCode = req.body.couponCode;
  const coupon = await Coupon.findOne({ code: enteredCouponCode });
  if (!coupon || !coupon.isActive) {
    // Coupon not found or inactive
    return res.status(400).send("Invalid coupon code");
  }
  // Calculate the discounted price
  const originalTotalPrice = order.totalPrice; // Get the original total price
  let discountedTotalPrice;

  if (coupon.isPercent) {
    // Percentage discount
    discountedTotalPrice = originalTotalPrice * (1 - coupon.amount / 100);
  } else {
    // Fixed amount discount
    discountedTotalPrice = originalTotalPrice - coupon.amount;
  }
  order.totalPrice = discountedTotalPrice;

  order = await order.save();

  if (!order) return res.status(400).send("the order cannot be created!");

  res.send(order);
});
router.post("/createorder/:userid", async (req, res) => {
  try {
    const userId = req.params.userid;

    // Retrieve order items for the user
    const orderItems = await OrderItem.find({ user: userId });

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).send("No order items found for the user.");
    }

    // Calculate the total price
    const totalPrices = await Promise.all(
      orderItems.map(async (orderItem) => {
        const product = await Product.findById(orderItem.product);
        console.log(orderItem.product);
        console.log("Product found:", product); // Log the product for debugging
        return product.price * orderItem.quantity;
      })
    );

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    // Create a new order
    const newOrder = new Order({
      orderItems: orderItems.map((orderItem) => orderItem._id),
      totalPrice,
      user: userId,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      // Add other relevant fields (shipping address, status, etc.)
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Internal server error");
  }
});

router.get("/:id", async (req, res) => {
  let order = await Order.findById(req.params.id)
    .populate("user", "email")
    .populate({ path: "orderItems", populate: "product" });

  if (!order) {
    res
      .status(500)
      .json({ message: "The order with the given ID was not found." });
  }
  res.status(200).send(order);
});

router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );

  if (!order) return res.status(400).send("the order cannot be updated!");

  res.send(order);
});

router.delete("/:id", (req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then((order) => {
      if (order) {
        Order.orderItems.map(async (orderItem) => {
          await OrderItem.findByIdAndDelete(orderItem);
        });
        return res
          .status(200)
          .json({ success: true, message: "the order is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "order not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});
router.post("/coupon", async (req, res) => {
  try {
    const { code, isPercent, amount } = req.body;

    // Validate input (you can add more validation as needed)
    if (!code || !amount) {
      return res.status(400).send("Invalid coupon data");
    }

    // Check if the coupon code already exists
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(409).send("Coupon code already exists");
    }

    // Create a new coupon
    const newCoupon = new Coupon({
      code,
      isPercent,
      amount,

      isActive: true, // Set it as active by default
    });

    // Save the coupon to the database
    await newCoupon.save();

    res.status(201).send("Coupon created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating coupon");
  }
});
/*router.post("/orderitem/:userid", async (req, res) => {
  try {
    let userid = req.params.userid;
    const { product } = req.body; // Assuming you pass these values in the request body

    // Create a new order item
    const orderItem = new OrderItem({
      quantity,
      product,
      user: userid, // Associate the order item with the user
    });

    // Save the order item
    await orderItem.save();

    res.status(201).json(orderItem); // Return the saved order item
  } catch (error) {
    console.error("Error creating order item:", error);
    res.status(500).send("Internal server error");
  }
});*/
/*
router.post("/orderitem/:userid", async (req, res) => {
  try {
    const userId = req.params.userid;
    const { productId } = req.body; // Assuming you pass the product ID in the request body

    // Check if the product ID exists in products
    const product = await Product.findById(productId);
    if (!product) {
      // Product not found, throw an error
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the product ID already exists in order items for this user
    let existingOrderItem = await OrderItem.findOne({
      user: userId,
      product: productId,
    });

    if (existingOrderItem) {
      // Product already exists, increment the quantity
      existingOrderItem.quantity += 1;
      await existingOrderItem.save();
      return res.status(200).json(existingOrderItem);
    } else {
      // Product doesn't exist, create a new order item with quantity = 1
      const newOrderItem = new OrderItem({
        quantity: 1,
        product: productId,
        user: userId,
      });
      await newOrderItem.save();
      return res.status(201).json(newOrderItem);
    }
  } catch (error) {
    console.error("Error creating/updating order item:", error);
    res.status(500).send("Internal server error");
  }
});*/
router.post("/orderitem", async (req, res) => {
  try {
    // Extract the user ID from the token
    const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, "web-team-project"); // Verify the token
    const userId = decodedToken.userId; // Assuming the user ID is stored in the 'userId' claim of the JWT token

    const { productId } = req.body; // Assuming you pass the product ID in the request body

    // Check if the product ID exists in products
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the product ID already exists in order items for this user
    let existingOrderItem = await OrderItem.findOne({
      user: userId,
      product: productId,
    });

    if (existingOrderItem) {
      // Product already exists, increment the quantity
      existingOrderItem.quantity += 1;
      await existingOrderItem.save();
      return res.status(200).json(existingOrderItem);
    } else {
      // Product doesn't exist, create a new order item with quantity = 1
      const newOrderItem = new OrderItem({
        quantity: 1,
        product: productId,
        user: userId,
      });
      await newOrderItem.save();
      return res.status(201).json(newOrderItem);
    }
  } catch (error) {
    console.error("Error creating/updating order item:", error);
    res.status(500).send("Internal server error");
  }
});

// Update order item by ID
router.put("/api/order-items/:id", async (req, res) => {
  try {
    const orderItemId = req.params.id; // Get the order item ID from the request parameters
    const { quantity, productId } = req.body; // Get updated quantity and product ID from the request body

    // Find the order item by ID and update the fields
    const updatedOrderItem = await OrderItem.findByIdAndUpdate(
      orderItemId,
      { quantity, product: productId },
      { new: true } // Return the updated order item
    );

    res.status(200).json(updatedOrderItem); // Return the updated order item as JSON
  } catch (error) {
    console.error("Error updating order item:", error);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
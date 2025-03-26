const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Category = require("../models/category");
const Product = require("../models/Product"); // Adjust the path as necessary
const Cart=require("../models/Cart");
const CartItem = require("../models/CartItem");
const Wishlist = require('../models/Wishlist'); 
const WishlistItem = require('../models/WishlistItem'); 
const isAuthenticated=require("../middlewares/isAuthenticated");
 // Adjust the path based on your project structure



// Home Route (No session check needed here, as it's a public page)
router.get("/", (req, res) => {
  res.render("index", { user: req.session.user || null });
});
router.post("/place-order", (req, res) => {
  const { name, address, phone, paymentMethod } = req.body;


  // Generate Order ID
  const orderId = "ORD" + Math.floor(100000 + Math.random() * 900000);

  // Simulated delivery estimate (3-5 days from today)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);
  const formattedDeliveryDate = deliveryDate.toDateString();

  // Redirect to order confirmation page with order details
  res.redirect(`/order-confirmation?orderId=${orderId}&name=${encodeURIComponent(name)}&address=${encodeURIComponent(address)}&phone=${phone}&paymentMethod=${paymentMethod}&deliveryDate=${formattedDeliveryDate}`);
});

// Route to render Order Confirmation Page
router.get("/order-confirmation", (req, res) => {
  res.render("order-confirmation", req.query);
});
router.get("/checkout", isAuthenticated, async (req, res) => {
  try {
      console.log("Session User:", req.session.user); // Debugging line

      if (!req.session.user) {
          console.log("User not logged in!");
          return res.redirect("/login"); // Redirect to login if not authenticated
      }

      const userId = req.session.user.id;  // Use .id instead of ._id
      console.log("User ID:", userId);

      // Find the cart for the logged-in user
      const cart = await Cart.findOne({ userId });

      if (!cart) {
          console.log("Cart not found for user:", userId);
          return res.render("checkout", { cartItems: [], total: 0 });
      }

      // Fetch only cart items related to this user's cart
      const cartItems = await CartItem.find({ cartId: cart._id });

      console.log("Cart Items:", cartItems); // Debugging line

      // Calculate total price
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      res.render("checkout", { cartItems, total });
  } catch (error) {
      console.error("Error fetching cart items:", error);
      res.status(500).send("Internal Server Error");
  }
});

// Uniform Route (Ensure user is logged in)
router.get("/uniforms", async (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.redirect("/login"); // Redirect to login if not logged in
  }

  try {
    // Find the "Uniforms" category
    const category = await Category.findOne({ name: "uniforms" });

    if (!category) {
      console.error("Category 'Uniforms' not found.");
      return res.status(404).send("Category 'Uniforms' not found.");
    }

    const products = await Product.find({ category: category._id });

    if (!products || products.length === 0) {
      console.log("No products found for the 'Uniforms' category.");
    } else {
      console.log(`Fetched ${products.length} products for 'Uniforms' category.`);
    }

    res.render("uniforms", { products });
  } catch (err) {
    console.error("Error fetching uniforms:", err);
    res.status(500).send("An error occurred while fetching uniforms.");
  }
});
router.get("/saree", async (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.redirect("/login"); // Redirect to login if not logged in
  }

  try {
    // Find the "Sarees" category
    const category = await Category.findOne({ name: "saree" });

    if (!category) {
      console.error("Category 'Sarees' not found.");
      return res.status(404).send("Category 'Sarees' not found.");
    }

    // Find all products under the Sarees category
    const products = await Product.find({ category: category._id });

    if (!products || products.length === 0) {
      console.log("No products found for the 'Sarees' category.");
    } else {
      console.log(`Fetched ${products.length} products for 'Sarees' category.`);
    }

    res.render("sarees", { products });
  } catch (err) {
    console.error("Error fetching sarees:", err);
    res.status(500).send("An error occurred while fetching sarees.");
  }
});
router.get("/bags", async (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.redirect("/login"); // Redirect to login if not logged in
  }

  try {
    // Find the "Bags" category
    const category = await Category.findOne({ name: "bags" });

    if (!category) {
      console.error("Category 'Bags' not found.");
      return res.status(404).send("Category 'Bags' not found.");
    }

    // Find all products under the Bags category
    const products = await Product.find({ category: category._id });

    if (!products || products.length === 0) {
      console.log("No products found for the 'Bags' category.");
    } else {
      console.log(`Fetched ${products.length} products for 'Bags' category.`);
    }

    res.render("bags", { products });
  } catch (err) {
    console.error("Error fetching bags:", err);
    res.status(500).send("An error occurred while fetching bags.");
  }
});
router.get("/kurti", async (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.redirect("/login"); // Redirect to login if not logged in
  }

  try {
    // Find the "Kurti" category
    const category = await Category.findOne({ name: "kurti" });

    if (!category) {
      console.error("Category 'Kurti' not found.");
      return res.status(404).send("Category 'Kurti' not found.");
    }

    // Find all products under the Kurti category
    const products = await Product.find({ category: category._id });

    if (!products || products.length === 0) {
      console.log("No products found for the 'Kurti' category.");
    } else {
      console.log(`Fetched ${products.length} products for 'Kurti' category.`);
    }

    res.render("kurti", { products });
  } catch (err) {
    console.error("Error fetching kurtis:", err);
    res.status(500).send("An error occurred while fetching kurtis.");
  }
});
router.get("/bedsheets", async (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.redirect("/login"); // Redirect to login if not logged in
  }

  try {
    // Find the "Bedsheets" category
    const category = await Category.findOne({ name: "bedsheets" });

    if (!category) {
      console.error("Category 'Bedsheets' not found.");
      return res.status(404).send("Category 'Bedsheets' not found.");
    }

    // Find all products under the Bedsheets category
    const products = await Product.find({ category: category._id });

    if (!products || products.length === 0) {
      console.log("No products found for the 'Bedsheets' category.");
    } else {
      console.log(`Fetched ${products.length} products for 'Bedsheets' category.`);
    }

    res.render("bedsheets", { products });
  } catch (err) {
    console.error("Error fetching bedsheets:", err);
    res.status(500).send("An error occurred while fetching bedsheets.");
  }
});




// Cart Route (Ensure user is logged in)
router.get("/cart", isAuthenticated, async (req, res) => {
  try {
    console.log("Session Data:", req.session); // Debug session

    if (!req.session.user) {
      console.log("User  not logged in.");
      return res.render("cart", { cart: [] });
    }

    const userId = req.session.user.id; // Access the user ID from the session
    console.log("User  ID:", userId);

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    console.log("Cart Found:", cart);

    if (!cart) {
      console.log("Cart is empty.");
      return res.render("cart", { cart: [] });
    }

    // Get all cart items and populate product data
    const cartItems = await CartItem.find({ cartId: cart._id })
      .populate('productID') // Populate the productID field
      .lean(); // Convert to plain JavaScript objects
    console.log("Cart Items:", cartItems);

    res.render("cart", { cart: cartItems });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).send("Server Error");
  }
});
// Server route to handle removing an item from the cart
router.delete('/cart/remove/:itemId', (req, res) => {
  const itemId = req.params.itemId; // Get the item ID from the URL

  // Assuming the cart is stored in the session
  if (req.session.cart) {
      req.session.cart = req.session.cart.filter(item => item._id !== itemId); // Remove the item from the cart
  }

  res.sendStatus(200); // Send a success response
});


// Wishlist Route (Ensure user is logged in)
router.get("/wishlist", isAuthenticated, async (req, res) => {
  try {
    console.log("Session Data:", req.session); // Debug session

    if (!req.session.user) {
      console.log("User not logged in.");
      return res.render("wishlist", { wishlist: [] });
    }

    const userId = req.session.user.id; // Access the user ID from the session
    console.log("User ID:", userId);

    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ userId });
    console.log("Wishlist Found:", wishlist);

    if (!wishlist) {
      console.log("Wishlist is empty.");
      return res.render("wishlist", { wishlist: [] });
    }

    // Get all wishlist items and populate product data
    const wishlistItems = await WishlistItem.find({ wishlistId: wishlist._id })
      .populate('productId') // Populate the productID field
      .lean(); // Convert to plain JavaScript objects
    console.log("Wishlist Items:", wishlistItems);

    res.render("wishlist", { wishlist: wishlistItems });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).send("Server Error");
  }
});
router.get('/product-details', async (req, res) => {
  try {
      const productId = req.query.id; // Get the product ID from the query parameter
      const product = await Product.findById(productId); // Fetch the product from the database

      if (!product) {
          return res.status(404).send('Product not found');
      }

      // Render the product-details.ejs template and pass the product data
      res.render('product-details', { product });
  } catch (error) {
      console.error('Error fetching product details:', error);
      res.status(500).send('Internal Server Error');
  }
});


// Get User Route (Check if user is logged in)
router.get("/getUser", (req, res) => {
  console.log("Checking session:", req.session); // Debugging session state

  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.status(401).json({ loggedIn: false, message: "User not logged in" });
  }
});
router.get("/search", async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.json([]);
  }

  try {
    const results = await Product.find({
      name: { $regex: query, $options: "i" }, // Case-insensitive search
    }).limit(10);

    res.json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;

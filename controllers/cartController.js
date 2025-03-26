const CartItem = require("../models/CartItem");
const Product = require("../models/Product"); // Import Product model

const add_to_cart = async (req, res) => {
    try {
        const { productId, cartId } = req.body; // Retrieve cartId from request body

        // Debugging: Log the received cartId
        console.log("Received cartId:", cartId);

        // Validate input
        if (!productId || !cartId) {
            return res.status(400).json({ success: false, msg: "Missing productId or cartId." });
        }

        // Fetch product details from Product model
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, msg: "Product not found." });
        }

        // Check if the item already exists in the cart
        const existingCartItem = await CartItem.findOne({ productID: product._id, cartId: cartId });
        if (existingCartItem) {
            // If the item already exists, increase the quantity by 1
            existingCartItem.quantity += 1; // Increment quantity
            await existingCartItem.save(); // Save the updated cart item

            return res.status(200).json({ success: true, msg: "Product quantity updated successfully!", data: existingCartItem });
        }

        // Create a new cart item with product details
        const cartItem = new CartItem({
            productID: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            cartId: cartId, // Use the provided cartId
            quantity: 1 // Set initial quantity to 1
        });

        // Save cart item to database
        const cartData = await cartItem.save();

        res.status(200).json({ success: true, msg: "Product added to cart successfully!", data: cartData });

    } catch (error) {
        console.error("Error adding to cart:", error.message);
        res.status(500).json({ success: false, msg: "Internal server error", error: error.message });
    }
};
module.exports = {
    add_to_cart
};

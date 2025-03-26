document.addEventListener('DOMContentLoaded', () => {
    const removeButtons = document.querySelectorAll('.remove-btn');

    removeButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const itemId = event.target.getAttribute('data-id'); // Get the item ID from the data-id attribute

            try {
                // Send a DELETE request to the server
                const response = await fetch(`/cart/remove/${itemId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // If the item is successfully removed from the database, update the UI
                    const cartItem = event.target.closest('.cart-item');
                    cartItem.remove(); // Remove the item from the DOM

                    // Update the total price
                    updateTotalPrice();
                } else {
                    console.error('Failed to remove item from cart');
                }
            } catch (error) {
                console.error('Error removing item from cart:', error);
            }
        });
    });

    // Function to update the total price
    function updateTotalPrice() {
        const cartItems = document.querySelectorAll('.cart-item');
        let totalPrice = 0;

        cartItems.forEach(item => {
            const price = parseFloat(item.querySelector('p:nth-child(2)').textContent.replace('Price: ₹', ''));
            const quantity = parseInt(item.querySelector('p:nth-child(3)').textContent.replace('Quantity: ', ''));
            totalPrice += price * quantity;
        });

        // Update the total price in the DOM
        document.getElementById('total-price').textContent = `Total Price: ₹${totalPrice.toFixed(2)}`;
    }
});
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [numKnives, setNumKnives] = useState(3);
  const [frequency, setFrequency] = useState("One-Time Purchase");
  const [price, setPrice] = useState(210); // Initial price for 3 knives
  const [cart, setCart] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleKnivesChange = (value) => {
    setNumKnives(value);
    setPrice(value * 70);
  };

  const handleAddToCart = async () => {
    setIsSubmitting(true);
    
    const orderData = {
      num_knives: numKnives,
      frequency: frequency,
      total_price: price,
      status: "pending"
    };

    try {
      const response = await fetch('http://localhost:5000/orders/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const data = await response.json();
      console.log('Order submitted successfully:', data);

      // Update local cart state
      const newItem = {
        id: data.order_id,
        numKnives,
        frequency,
        price,
      };
      setCart([...cart, newItem]);

      // Show success message and navigate to checkout
      alert(`Added ${numKnives} knives to your cart!`);
      navigate("/checkout", { 
        state: { 
          orderDetails: newItem 
        } 
      });

    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to add items to cart. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">How many knives?</h3>
          <input
            type="range"
            min="3"
            max="14"
            value={numKnives}
            onChange={(e) => handleKnivesChange(parseInt(e.target.value))}
            className="w-full"
          />
          <p className="mt-2">{numKnives} Knives</p>
        </div>

        <div>
          <h4 className="text-lg font-medium">
            Total: Kes {price.toFixed(2)} 
            <span className="text-gray-600 text-sm ml-2">
              (Kes {(price / numKnives).toFixed(2)} per knife)
            </span>
          </h4>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isSubmitting}
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors disabled:bg-red-300"
        >
          {isSubmitting ? 'Adding to Cart...' : 'Add to Cart'}
        </button>

        {cart.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Your Cart</h3>
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="py-3">
                  {item.numKnives} Knives - Kes {item.price.toFixed(2)} ({item.frequency})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
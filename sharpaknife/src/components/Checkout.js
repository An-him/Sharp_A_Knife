import React, { useState } from "react";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    zip: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Combine order details with form data
    const orderData = {
      ...formData,
      orderDetails: {
        item: "Knife Set",
        quantity: 3,
        total: 38.13
      }
    };

    try {
      const response = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Order submission failed');
      }

      const data = await response.json();
      setSuccess(true);
      console.log('Order submitted successfully:', data);
      
      // You might want to redirect to a success page or clear the form
      // window.location.href = '/order-success';
      
    } catch (err) {
      setError('Failed to submit order. Please try again.');
      console.error('Error submitting order:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-4">SharpAKnife Checkout</h1>
      </header>

      <main>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Order submitted successfully!
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>
          <div className="space-y-2">
            <p>Item: Knife Set</p>
            <p>Quantity: 3</p>
            <p>Total: $38.13</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
          
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border p-2 rounded"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border p-2 rounded"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="border p-2 rounded"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="border p-2 rounded"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="border p-2 rounded"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="border p-2 rounded"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">ZIP Code</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
                className="border p-2 rounded"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors mt-6 disabled:bg-blue-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Complete Purchase'}
          </button>
        </form>
      </main>

      <footer className="mt-8 text-center text-gray-600">
        <p>&copy; 2024 SharpAKnife</p>
      </footer>
    </div>
  );
};

export default Checkout;
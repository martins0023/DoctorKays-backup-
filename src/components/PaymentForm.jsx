// src/components/PaymentForm.jsx
import React from "react";

const PaymentForm = ({ consultationData, onPaymentSuccess, onClose }) => {
  const payWithPaystack = () => {
    const handler = window.PaystackPop.setup({
      key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY, // Ensure your public key is set in .env
      email: consultationData.email,
      amount: parseFloat(consultationData.price) * 100, // Convert price to kobo (if currency is NGN)
      currency: "NGN",
      ref: '' + Math.floor(Math.random() * 1000000000 + 1),
      callback: function (response) {
        console.log("Payment successful:", response);
        onPaymentSuccess(response);
      },
      onClose: function () {
        console.log("Payment window closed");
      },
    });
    handler.openIframe();
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Proceed to Payment</h2>
      <p className="mb-4">
        You are about to pay <strong>{consultationData.price}</strong> for a{" "}
        <strong>{consultationData.consultationType}</strong> consultation.
      </p>
      <button
        onClick={payWithPaystack}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:opacity-90 transition"
      >
        Pay Now
      </button>
      <button
        onClick={onClose}
        className="mt-4 w-full border py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
      >
        Cancel
      </button>
    </div>
  );
};

export default PaymentForm;

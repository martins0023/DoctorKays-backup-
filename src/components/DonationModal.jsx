// src/components/DonationModal.jsx
import React, { useState, useEffect } from "react";
import PaystackPop from "@paystack/inline-js";
import { paystack } from "../assets";

// Example: Optionally, fetch a real-time conversion rate from a currency API.
// For simplicity, we'll use a fallback conversion rate here.
const fetchConversionRate = async () => {
  try {
    const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
    );
    if (!response.ok) {
      throw new Error(`Conversion rate fetch error: ${response.status}`);
    }
    const data = await response.json();
    return data.conversion_rates.NGN;
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
    return 450; // fallback rate
  }
};

const DonationModal = ({ donationData, onPaymentSuccess, onClose }) => {
  const [conversionRate, setConversionRate] = useState(450);

  useEffect(() => {
    const getRate = async () => {
      const rate = await fetchConversionRate();
      setConversionRate(rate);
    };
    getRate();
  }, []);

  const payWithPaystack = () => {
    const rawPrice = donationData.price.toString();
    // Assume donationData.price is in USD; convert to NGN
    const numericPrice = parseFloat(rawPrice);
    if (isNaN(numericPrice)) {
      console.error("Invalid price value:", donationData.price);
      return;
    }
    // Convert USD to NGN using the dynamic conversion rate
    const priceInNGN = numericPrice * conversionRate;
    const amountInKobo = Math.round(priceInNGN * 100);

    if (!donationData.email) {
      console.error("Email is required for payment");
      return;
    }

    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY, // Ensure this is set in .env
      email: donationData.email,
      amount: amountInKobo,
      currency: "NGN",
      ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      callback: function (response) {
        console.log("Payment successful:", response);
        onPaymentSuccess(response);
      },
      onClose: function () {
        console.log("Payment window closed");
      },
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Proceed to Payment</h2>
      <p className="mb-4">
        You are about to pay <strong>{donationData.price} USD</strong> (approx.{" "}
        <strong>
          {(parseFloat(donationData.price) * conversionRate).toFixed(2)} NGN
        </strong>
        ) for your donation.
      </p>
      <div className="justify-center items-center flex mb-2">
        <img
          src={paystack}
          alt="paystack"
          className="w-fit h-fit mb-3 cursor-pointer "
        />
      </div>
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

export default DonationModal;

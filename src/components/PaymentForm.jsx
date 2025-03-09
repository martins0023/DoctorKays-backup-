import React, { useState, useEffect } from "react";
import PaystackPop from "@paystack/inline-js";
import { paystack } from "../assets";

const PaymentForm = ({ consultationData, onPaymentSuccess, onClose }) => {
  const [conversionRate, setConversionRate] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Fetch the USD -> NGN conversion rate on mount
  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        // Example using ExchangeRate-API (v6)
        const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
        );
        if (!response.ok) {
          throw new Error(`Error fetching conversion rate: ${response.status}`);
        }
        const data = await response.json();
        console.log("Conversion data:", data);
        setConversionRate(data.conversion_rates.NGN);
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
      }
    };

    fetchConversionRate();
  }, []);

  const payWithPaystack = () => {
    let numericPrice;
    let currency = "NGN"; // Always use NGN for Paystack
    const rawPrice = consultationData.price.toString();

    if (rawPrice.includes("$")) {
      // Convert USD price to NGN using the fetched conversion rate
      numericPrice = parseFloat(rawPrice.replace("$", "").trim());
      if (isNaN(numericPrice)) {
        console.error("Invalid price value:", consultationData.price);
        return;
      }
      if (!conversionRate) {
        console.error("Conversion rate not available");
        return;
      }
      numericPrice = numericPrice * conversionRate;
    } else {
      // Otherwise, assume it's already in NGN (remove any non-numeric characters)
      numericPrice = parseFloat(rawPrice.replace(/[^0-9.]/g, ""));
      if (isNaN(numericPrice)) {
        console.error("Invalid price value:", consultationData.price);
        return;
      }
    }

    // Convert price to kobo (NGN is handled in kobo)
    const amountInKobo = Math.round(numericPrice * 100);

    if (!consultationData.email) {
      console.error("Email is required for payment");
      return;
    }

    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: consultationData.email,
      amount: amountInKobo,
      currency: currency,
      ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      callback: function (response) {
        console.log("Payment successful:", response);
        setPaymentCompleted(true);
        // Show thank you message and delay further action
        setTimeout(() => {
          onPaymentSuccess(response);
        }, 5000); // 5 seconds delay
      },
      onClose: function () {
        console.log("Payment window closed");
      },
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
      {paymentCompleted ? (
        <div className="text-center">
          <h2 className="text-2xl text-black font-bold mb-4">Thank You!</h2>
          <p className="text-black">
            Your payment was successful. Thank you for using our service.
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-black mb-4">Proceed to Payment</h2>
          <p className="mb-4 text-black">
            You are about to pay <strong>{consultationData.price}</strong> for a{" "}
            <strong>{consultationData.consultationType}</strong> consultation.
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
        </>
      )}
    </div>
  );
};

export default PaymentForm;

import React, { useState } from "react";
import DonationModal from "./DonationModal";

const Donation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    price: "",
    consultationType: "Donation", // you can customize this if needed
  });

  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [donationData, setDonationData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const apiUrl = "http://localhost:5000"; // or your production URL
      const response = await fetch(`${apiUrl}/api/sponsor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Saved donation details:", result);
      
      // Save donation data and open the payment modal
      setDonationData(formData);
      setPaymentModalOpen(true);
    } catch (error) {
      console.error("Error saving sponsorship details:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Form is valid if name, email, phone, and price are provided and checkbox is checked.
  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.price.trim() !== "" &&
    agreed;

  const closePaymentModal = () => {
    setPaymentModalOpen(false);
    setDonationData(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            placeholder="John Doe"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email Address</label>
          <input
            placeholder="youremail@email.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            placeholder="+234 12345678"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="block text-sm font-medium">Amount to Donate (USD)</label>
          <input
            placeholder="$20"
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg p-2"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            required
          />
          <span className="text-sm">
            I agree to the{" "}
            <a
              href="/policy"
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms and Policy
            </a>
          </span>
        </div>
        <button
          type="submit"
          disabled={!isFormValid || submitting}
          className={`w-full py-2 rounded-lg transition ${
            !isFormValid || submitting
              ? "text-gray-500 bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-red-500 text-white hover:opacity-90"
          }`}
        >
          {submitting ? "Submitting..." : "Continue"}
        </button>
      </form>

      {/* Payment Modal */}
      {paymentModalOpen && donationData && (
        <DonationModal
          donationData={donationData}
          onPaymentSuccess={(response) => {
            console.log("Payment successful:", response);
            closePaymentModal();
            // Optionally, navigate to a thank-you page here
          }}
          onClose={closePaymentModal}
        />
      )}
    </div>
  );
};

export default Donation;

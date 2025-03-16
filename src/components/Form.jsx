import React, { useState, useEffect } from 'react';
import Button from './Button';

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  services: [],
};
const Form = ({ handleFormDataSubmit }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const { firstName, lastName, email, phone, message, services } = formData;
    setIsFormValid(firstName && lastName && email && phone && message && services.length > 0);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      services: checked
        ? [...prev.services, name]
        : prev.services.filter((service) => service !== name),
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (isFormValid) {
      // Call the parent callback with the form data
      handleFormDataSubmit(formData);
      // Clear the form by resetting it to the initial state
      setFormData(initialFormState);
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-7 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="mb-4">
        <label className="font-semibold text-[16px] ">First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-3 mt-2 h-[60px] text-black border-gray-300 border focus:outline-none focus:border-primary"
          required
        />
      </div>
      <div className="mb-4">
        <label className="font-semibold text-[16px] ">Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-3 mt-2 h-[60px] text-black border-gray-300 border focus:outline-none focus:border-primary"
          required
        />
      </div>
      <div className="mb-4">
        <label className="font-semibold text-[16px] ">Email</label>
        <input
          type="email"
          name="email"
          placeholder="you@company.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mt-2 h-[60px] text-black border-gray-300 border focus:outline-none focus:border-primary"
          required
        />
      </div>
      <div className="mb-4">
        <label className="font-semibold text-[16px] ">Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="NGN +(234) 00-000-0000"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 mt-2 h-[60px] text-black border-gray-300 border focus:outline-none focus:border-primary"
          required
        />
      </div>
      <div className="mb-4 md:col-span-2">
        <label className="font-semibold text-[16px] ">Message</label>
        <textarea
          name="message"
          placeholder="Leave us a message..."
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 mt-2 text-black h-[160px] border-gray-300 border focus:outline-none focus:border-primary"
          required
        />
      </div>
      <div className="mb-4 md:col-span-2">
        <label className="font-semibold text-[16px] ">Services</label>
        <div className="flex flex-wrap mt-2">
          {['Appointment booking', 'Recommendations', 'Comments', 'Request', 'Consultation', 'Other'].map((service) => (
            <label key={service} className="flex items-center mr-6 mb-4">
              <input
                type="checkbox"
                name={service}
                checked={formData.services.includes(service)}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              {service}
            </label>
          ))}
        </div>
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
      <div className="md:col-span-2 flex">
        <Button
          text={submitting ? "Sending..." : "Send message"}
          className={`bg-gradient-to-l from-purple-600 to-purple-950 font-semibold w-full text-[16px] text-white rounded-md h-[51px] p-3 ${!isFormValid && 'opacity-50 cursor-not-allowed'}`}
          disabled={!isFormValid || submitting}
        />
      </div>
    </form>
  );
};

export default Form;

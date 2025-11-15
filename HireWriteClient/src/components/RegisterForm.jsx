import React, { useState } from "react";
import "./RegisterForm.css";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    orgName: "",
    ticketVolume: "",
    agentCount: "",
    software: "",
    requirements: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-black flex justify-center px-4 items-start pt-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-4 text-white"
      >
        <h1 className="text-3xl font-bold mb-6">
          Let’s unlock the future, together
        </h1>

        <input
          type="text"
          name="fullName"
          onChange={handleChange}
          placeholder="Full name*"
          className="w-full p-4 bg-gray-900 rounded-xl outline-none placeholder-gray-400"
        />

        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Business email*"
          className="w-full p-4 bg-gray-900 rounded-xl outline-none placeholder-gray-400"
        />

        <input
          type="text"
          name="orgName"
          onChange={handleChange}
          placeholder="Organisation name*"
          className="w-full p-4 bg-gray-900 rounded-xl outline-none placeholder-gray-400"
        />

        <input
          type="number"
          name="ticketVolume"
          onChange={handleChange}
          placeholder="Monthly support ticket volume"
          className="w-full p-4 bg-gray-900 rounded-xl outline-none placeholder-gray-400"
        />

        <input
          type="number"
          name="agentCount"
          onChange={handleChange}
          placeholder="Support agent count"
          className="w-full p-4 bg-gray-900 rounded-xl outline-none placeholder-gray-400"
        />

        <input
          type="text"
          name="software"
          onChange={handleChange}
          placeholder="Currently used support software (e.g., Freshdesk, Salesforce etc.)"
          className="w-full p-4 bg-gray-900 rounded-xl outline-none placeholder-gray-400"
        />

        <textarea
          name="requirements"
          onChange={handleChange}
          placeholder="Share any specific requirements you may have…"
          className="w-full p-4 bg-gray-900 rounded-xl outline-none placeholder-gray-400 min-h-[120px]"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 transition py-4 rounded-full text-lg font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

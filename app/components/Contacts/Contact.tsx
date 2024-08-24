"use client";
import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";

const contacts = [
  {
    platform: "Instagram",
    icon: "fab fa-instagram",
    contact: "@Bridge-In",
    description: "Follow us on Instagram for the latest updates!",
  },
  {
    platform: "Mobile",
    icon: "fas fa-phone",
    contact: "+91 123 456 7890",
    description: "Give us a call for any inquiries.",
  },
  {
    platform: "Email",
    icon: "fas fa-envelope",
    contact: "bridge-in@gmail.com",
    description: "Send us an email with your questions.",
  },
  {
    platform: "Twitter",
    icon: "fab fa-twitter",
    contact: "@bridgeintwitter",
    description: "Tweet us for quick responses!",
  },
];

const Contact = () => {
  return (
    <div className=" py-16 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800">Get in Touch</h1>
        <p className="mt-4 text-lg text-gray-600">
          We're here to help! Reach out to us through any of the platforms
          below.
        </p>
      </div>

      {/* Contact Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {contacts.map((contact, index) => (
          <Tooltip.Provider key={index}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <motion.div
                  className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer transition-transform transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-4xl text-blue-500 mb-4">
                    <i className={contact.icon}></i>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-900">
                    {contact.platform}
                  </h4>
                  <p className="text-sm text-gray-700">{contact.contact}</p>
                </motion.div>
              </Tooltip.Trigger>
              <Tooltip.Content
                className="p-4 bg-white text-black rounded-lg shadow-lg max-w-xs z-50"
                sideOffset={5}
              >
                <div>
                  <h4 className="text-lg font-semibold">
                    {contact.platform}
                  </h4>
                  <p className="mt-2 text-sm">{contact.description}</p>
                </div>
                <Tooltip.Arrow className="fill-white" />
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        ))}
      </div>

      {/* Footer Section */}
      <div className="max-w-3xl mx-auto text-center mt-16">
        <h2 className="text-2xl font-bold text-gray-800">
          We'd love to hear from you
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Whether you have a question about features, trials, pricing, need a
          demo, or anything else, our team is ready to answer all your
          questions.
        </p>
        <div className="mt-8">
          <button className="px-8 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition-transform transform hover:scale-105">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

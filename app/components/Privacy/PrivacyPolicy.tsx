const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-12 px-6 transition duration-300 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto p-10">
        {/* Privacy Policy Heading */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          At <span className="font-semibold text-gray-900 dark:text-white">DrPhysio</span>, we value your privacy and are committed to protecting the personal information you provide when using our AI-driven physiotherapy chatbot. This Privacy Policy explains how we collect, use, and share your data.
        </p>

        {/* Section 1: Information Collection */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          1. Information We Collect
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          We collect personal information that you voluntarily provide when using the DrPhysio chatbot. This may include your name, email address, health-related details, and preferences for physiotherapy guidance. Additionally, we may collect data about your interactions with the chatbot, such as queries and conversation history.
        </p>

        {/* Section 2: How We Use Your Information */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          2. How We Use Your Information
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          The information we collect is used to personalize your experience on DrPhysio, providing you with tailored physiotherapy recommendations and resources. We also use your data to improve the performance of our chatbot and ensure it can make accurate suggestions based on your health needs.
        </p>

        {/* Section 3: Data Sharing */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          3. Data Sharing and Disclosure
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted healthcare partners only when necessary to connect you with the most suitable physiotherapy resources. All such partners are obligated to protect your data in compliance with this Privacy Policy.
        </p>

        {/* Section 4: Data Security */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          4. Data Security
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          We implement a variety of security measures to safeguard your personal data. Despite our efforts, no method of transmission over the internet is 100% secure. Therefore, while we strive to protect your information, we cannot guarantee its absolute security.
        </p>

        {/* Section 5: Your Rights */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          5. Your Rights
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          You have the right to access, update, or delete your personal information at any time. If you wish to exercise any of these rights, please contact us at <a href="mailto:drphysiogpt@gmail.com" className="text-indigo-600 dark:text-indigo-400">drphysiogpt@gmail.com</a>. We will respond to your request promptly.
        </p>

        {/* Section 6: Changes to This Policy */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          6. Changes to This Privacy Policy
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted on this page, and we encourage you to review it periodically.
        </p>

        {/* Section 7: Contact Us */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          7. Contact Us
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:drphysiogpt@gmail.com" className="text-indigo-600 dark:text-indigo-400">drphysiogpt@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

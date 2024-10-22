const TermsAndConditions = () => {
  return (
    <div className="min-h-screen py-12 px-6 transition duration-300 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto p-10">
        {/* Terms and Conditions Heading */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Terms and Conditions
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Welcome to <span className="font-semibold text-gray-900 dark:text-white">DrPhysio</span>. By using our platform, you agree to comply with and be bound by the following terms and conditions. Please review them carefully before using our services.
        </p>

        {/* Section 1: Use of the Platform */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          1. Use of the Platform
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          DrPhysio is designed to assist users in improving their physical health through personalized physiotherapy guidance. By using the platform, you agree to use it only for lawful purposes. You must not use DrPhysio in any way that may cause harm to the platform or its users.
        </p>

        {/* Section 2: Account Registration */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          2. Account Registration
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          To access certain features of DrPhysio, you may need to register for an account. You agree to provide accurate and complete information during registration and to keep your account information updated. You are responsible for maintaining the confidentiality of your account login details.
        </p>

        {/* Section 3: Intellectual Property */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          3. Intellectual Property
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          All content on DrPhysio, including but not limited to text, graphics, logos, and software, is the property of DrPhysio or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works of any content without our prior written consent.
        </p>

        {/* Section 4: Limitation of Liability */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          4. Limitation of Liability
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          DrPhysio provides the platform "as is" without any warranties of any kind. We do not guarantee the accuracy, reliability, or availability of the physiotherapy guidance provided by the platform. DrPhysio will not be liable for any damages arising from the use or inability to use the platform.
        </p>

        {/* Section 5: Termination */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          5. Termination
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          We reserve the right to terminate or suspend your access to DrPhysio at any time, without notice, for conduct that we believe violates these Terms and Conditions or is harmful to our users or the platform.
        </p>

        {/* Section 6: Changes to Terms */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          6. Changes to These Terms
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          We may update these Terms and Conditions from time to time. Any changes will be posted on this page. By continuing to use DrPhysio after changes are made, you agree to the revised terms.
        </p>

        {/* Section 7: Governing Law */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          7. Governing Law
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of India.
        </p>

        {/* Section 8: Contact Us */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          8. Contact Us
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:drphysiogpt@gmail.com" className="text-indigo-600 dark:text-indigo-400">drphysiogpt@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;

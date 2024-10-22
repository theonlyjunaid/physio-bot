const AboutUs = () => {
    return (
        <div className="min-h-screen py-12 px-6 transition duration-300 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-4xl mx-auto rounded-lg p-10">
                {/* Content Section */}
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About DrPhysio</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Welcome to <span className="font-semibold text-gray-900 dark:text-white">DrPhysio</span> — your AI-driven chatbot designed to assist users in improving their physical health through personalized physiotherapy guidance.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Whether you're recovering from an injury or looking to enhance your mobility, <span className="font-semibold text-gray-900 dark:text-white">DrPhysio</span> provides tailored recommendations and exercises to help you achieve your health goals.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Our mission is to empower individuals by making physiotherapy advice accessible to everyone. We simplify the path to better movement and overall well-being by offering insights and resources at your fingertips.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                    Join DrPhysio today and take the next step towards a healthier you. Let us guide you on your journey to improved physical health!
                </p>
            </div>
        </div>
    );
};

export default AboutUs;

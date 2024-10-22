import { Building, Mail, PhoneCall } from 'lucide-react';
import React from 'react';

const ContactUs = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl w-full rounded-lg p-8 lg:p-12">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center">Contact DrPhysio</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          We are here to help you improve your physical health! Reach out through the details below, and our team will get back to you as soon as possible.
        </p>

        <div className="grid grid-cols-1  gap-8 mt-5">
          {/* Address */}
          {/* <div className="flex flex-col items-center">
                        <Building size={32} />
                        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">Our Office</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-center">DTU-IIF, AB-4, 8th floor, Bawana Rd, Delhi Technological University, Shahbad Daulatpur Village, Rohini, New Delhi, Delhi, 110042</p>
                    </div>

          <div className="flex flex-col items-center">
            <PhoneCall size={32} />
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">Phone</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">+91 85284 28983</p>
          </div> */}

          {/* Email */}
          <div className="flex flex-col items-center">
            <Mail size={32} />
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">Email</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">drphysiogpt@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

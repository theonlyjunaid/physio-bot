"use client";
import { Container } from '@/components/ui/container';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const sections = [
  { id: 'introduction', title: 'Introduction', content: 'This Privacy Policy outlines how BridgeIn collects, uses, and protects your personal data. Your privacy is important to us, and we are committed to safeguarding your information.' },
  { id: 'data-collection', title: 'Data Collection', content: 'We collect various types of information, including data you provide directly, data collected automatically, and data from third-party sources. This may include your name, email address, usage data, and more.' },
  { id: 'data-use', title: 'How We Use Your Data', content: 'Your data is used to improve our services, provide personalized experiences, communicate with you, and ensure security. We may also use your data for analytics and marketing purposes.' },
  { id: 'data-sharing', title: 'Data Sharing', content: 'BridgeIn does not share your personal data with third parties, except as required by law or as necessary to provide our services. We ensure that any data shared is protected and used responsibly.' },
  { id: 'your-rights', title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal data. You can also object to data processing or request data portability. Contact us if you wish to exercise these rights.' },
  { id: 'cookies', title: 'Cookies Policy', content: 'BridgeIn uses cookies to enhance your experience on our platform. You can manage your cookie preferences through your browser settings. Some cookies are essential for the functioning of the site.' },
  { id: 'changes', title: 'Changes to This Policy', content: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page, and significant updates will be communicated to you directly if applicable.' },
];

export default function PrivacyPolicy() {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true, 
    });
  }, []);

  return (
    <Container>
      <div className="py-20"> 
        {/* Page Title */}
        <h1 className="text-5xl font-bold mb-10 text-center text-gray-900" data-aos="fade-down">
          Privacy Policy
        </h1>

        {/* Privacy Policy Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="relative pl-4">
              <div
                className="absolute left-0 top-0 h-full w-1 bg-gray-600"
                data-aos="fade-in"
                data-aos-duration="1200"
              ></div>
              <h2 className="text-3xl font-semibold mb-4 text-gray-800" data-aos="fade-up">
                {section.title}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700" data-aos="fade-up" data-aos-delay="100">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}

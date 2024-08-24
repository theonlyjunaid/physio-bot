import { Container } from '@/components/ui/container';

export default function TermsAndConditions() {
  return (
    <Container>
      <div className="py-20">
        {/* Page Title */}
        <h1 className="text-5xl font-bold mb-10 text-center text-gray-900">
          Terms and Conditions
        </h1>

        {/* Terms and Conditions Content */}
        <div className="space-y-10">
          <section id="introduction" className="border-l-4 border-gray-500 pl-4">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Introduction</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              Your use of our platform is governed by the following terms and conditions ("Terms of Use"), as well as the Bridge In Privacy Policy and other operating rules, minimum qualifications, and cautions posted throughout the platform or presented to you individually during the course of your use of the platform (collectively, the "Terms"). The Terms govern your use of the platform and Bridge In reserves the right to update or replace the Terms at any time without notice. You are advised to review the Terms for any changes when you visit the platform even if you have not received a notification of changes as you are bound by them even if you have not reviewed them. Your viewing and use of the platform after such change constitutes your acceptance of the Terms and any changes to such terms. If at any time you do not want to be bound by the Terms, you should logout, exit, and cease using the platform immediately.
            </p>
          </section>

          <section id="intended-use" className="border-l-4 border-gray-500 pl-4">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Intended Use of Platform</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              Bridge In is a platform designed to connect startups with potential investors, mentors, and other resources. Bridge In does not offer, broker, advise, purchase, sell, or otherwise transact in securities regulated by the SEC or federal or state law. Bridge In does not accept, hold, or transfer cash or securities.
            </p>
            <p className="text-lg leading-relaxed text-gray-600">
              Bridge In does not guarantee that a startup seeking support will achieve any level of success or that any proposed offering or funding request will qualify under applicable federal and state securities laws.
            </p>
            <p className="text-lg leading-relaxed text-gray-600">
              Bridge In is not a personal financial advisor. Bridge In, whether through the platform or otherwise, does not provide personal financial advice, loans, credit, banking, consumer credit ratings, credit decisions, financial products, brokerage accounts, insurance, tax advice, legal advice, or financial or legal services of any kind.
            </p>
            <p className="text-lg leading-relaxed text-gray-600">
              Bridge In does not guarantee any results to anyone. All users of the platform are responsible for making their own decisions to use the platform and for any activity taken on the platform, including without limitation registering, seeking funding, grants, or other support.
            </p>
          </section>

          <section id="user-registration" className="border-l-4 border-gray-500 pl-4">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">User Registration</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              If you are accepting the Terms on behalf of an organization or entity, rather than in an individual capacity, you represent and warrant that you are authorized to accept the Terms on that organization or entity's behalf and bind them to these Terms.
            </p>
            <p className="text-lg leading-relaxed text-gray-600">
              Only real persons at or above the age of 18 may register for an account and use the platform. Registering for an account on the platform creates no commitment or obligation on the registered user to seek or provide funding, grants, or other support.
            </p>
            <p className="text-lg leading-relaxed text-gray-600">
              Bridge In may reject any application to register an individual or an organization or entity for failure to achieve validation through available methods or otherwise meet Bridge In's registration requirements.
            </p>
            <p className="text-lg leading-relaxed text-gray-600">
              Your registration and the use of any third-party site is subject to the terms and conditions and policies of such sites, and Bridge In is not responsible or liable for any harm resulting from the use or misuse of those sites, including when such harm could or does affect your account on this platform or your use of the platform.
            </p>
          </section>

          <section id="registered-account-obligations" className="border-l-4 border-gray-500 pl-4">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Registered Account Obligations</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              The named registered user of an account is the only person that may use the account, and it may not be transferred to anyone else.
            </p>
            <p className="text-lg leading-relaxed text-gray-600">
              You are responsible for maintaining the confidentiality of your registered account and to periodically change your password to maintain security. If you have concerns that your username and/or password have been compromised or that unauthorized access to your account or the platform is likely or has already occurred, you must notify Bridge In immediately. Bridge In is not responsible for any unauthorized access or misuse of your registered account resulting from your failure to maintain the confidentiality of your login credentials.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}

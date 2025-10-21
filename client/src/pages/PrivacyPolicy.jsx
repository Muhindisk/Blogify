import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Last updated: October 21, 2025</p>
          
          {/* Introduction */}
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Welcome to BlogApp ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you visit our website and tell you 
                about your privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Information We Collect</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We may collect, use, store and transfer different kinds of personal data about you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Identity Data:</strong> Username, first name, last name</li>
                <li><strong>Contact Data:</strong> Email address</li>
                <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, browser plug-in types and versions</li>
                <li><strong>Profile Data:</strong> Your username, profile picture, posts, likes, and preferences</li>
                <li><strong>Usage Data:</strong> Information about how you use our website and services</li>
                <li><strong>Content Data:</strong> Blog posts, comments, and images you upload</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">How We Use Your Information</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>To register you as a new user</li>
                <li>To manage your account and provide our services to you</li>
                <li>To notify you about changes to our terms or privacy policy</li>
                <li>To allow you to participate in interactive features when you choose to do so</li>
                <li>To improve our website and services</li>
                <li>To measure or understand the effectiveness of our content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, 
                or accessed in an unauthorized way. We use encryption for data transmission and storage. However, no method of 
                transmission over the internet or electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Data Retention</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including 
                for the purposes of satisfying any legal, accounting, or reporting requirements. When you delete your account, we will 
                delete or anonymize your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Your Legal Rights</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Request access to your personal data</li>
                <li>Request correction of your personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
                <li>Right to withdraw consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Third-Party Links</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling 
                those connections may allow third parties to collect or share data about you. We do not control these third-party websites 
                and are not responsible for their privacy statements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our website uses cookies to distinguish you from other users. This helps us to provide you with a good experience when 
                you browse our website and also allows us to improve our site. For detailed information on the cookies we use and the 
                purposes for which we use them, see our{' '}
                <Link to="/cookie-policy" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Cookie Policy
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy 
                on this page and updating the "Last updated" date at the top of this privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have any questions about this privacy policy or our privacy practices, please contact us at:{' '}
                <Link to="/contact" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Contact Page
                </Link>
                {' '}or email us at privacy@blogplatform.com
              </p>
            </section>
          </div>

          {/* Back Button */}
          <div className="pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
            <Link 
              to="/" 
              className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

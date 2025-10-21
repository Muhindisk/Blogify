import React from 'react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Cookie Policy</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Last updated: October 21, 2025</p>
          
          {/* Introduction */}
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">What Are Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                They are widely used to make websites work more efficiently, as well as to provide information to the site owners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">How We Use Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                BlogApp uses cookies to distinguish you from other users of our website. This helps us to provide you with a good 
                experience when you browse our website and also allows us to improve our site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Types of Cookies We Use</h2>
              
              <div className="space-y-4 mt-4">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-primary-700 dark:text-primary-300 mb-2">1. Strictly Necessary Cookies</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    These cookies are essential for the website to function properly. They enable core functionality such as security, 
                    network management, and accessibility.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Authentication cookies - to identify you when you log in</li>
                    <li>Security cookies - to protect against fraudulent logins</li>
                    <li>Session cookies - to keep you logged in during your visit</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">2. Performance Cookies</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    These cookies collect information about how visitors use our website, such as which pages are visited most often. 
                    This data helps us optimize our website and improve user experience.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Analytics cookies - to understand how you interact with our site</li>
                    <li>Load balancing cookies - to distribute site traffic efficiently</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">3. Functionality Cookies</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    These cookies allow the website to remember choices you make and provide enhanced, more personalized features.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Theme preference cookies - to remember your dark/light mode choice</li>
                    <li>Language cookies - to remember your language preferences</li>
                    <li>User preference cookies - to remember your settings</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">4. Targeting/Advertising Cookies</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    These cookies are used to deliver content more relevant to you and your interests. They may be used to deliver 
                    targeted advertising or to limit the number of times you see an advertisement.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Social media cookies - from platforms like Twitter, Facebook, LinkedIn</li>
                    <li>Advertising cookies - to show relevant ads based on your interests</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Third-Party Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics, 
                deliver advertisements, and enhance functionality. These include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Google Analytics:</strong> To analyze website traffic and user behavior</li>
                <li><strong>Social Media Platforms:</strong> For social sharing and login functionality</li>
                <li><strong>Content Delivery Networks (CDNs):</strong> To improve site performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Managing Cookies</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability 
                of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                You can manage cookies by:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Adjusting your browser settings to refuse all or some cookies</li>
                <li>Deleting cookies that have already been set</li>
                <li>Using browser extensions that block cookies</li>
                <li>Visiting <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">aboutcookies.org</a> for detailed information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Browser-Specific Cookie Management</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <div>
                  <strong>Google Chrome:</strong>
                  <p className="ml-4">Settings → Privacy and security → Cookies and other site data</p>
                </div>
                <div>
                  <strong>Mozilla Firefox:</strong>
                  <p className="ml-4">Options → Privacy & Security → Cookies and Site Data</p>
                </div>
                <div>
                  <strong>Safari:</strong>
                  <p className="ml-4">Preferences → Privacy → Manage Website Data</p>
                </div>
                <div>
                  <strong>Microsoft Edge:</strong>
                  <p className="ml-4">Settings → Cookies and site permissions → Cookies and site data</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Cookie Consent</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By using BlogApp, you consent to the use of cookies in accordance with this Cookie Policy. When you first visit our website, 
                you will be asked to consent to our use of cookies. You can withdraw your consent at any time by deleting cookies through 
                your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Updates to This Policy</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business operations. 
                We encourage you to review this policy periodically to stay informed about how we use cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">More Information</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                For more information about how we handle your personal data, please see our{' '}
                <Link to="/privacy-policy" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Privacy Policy
                </Link>. If you have any questions about our use of cookies, please{' '}
                <Link to="/contact" className="text-primary-600 dark:text-primary-400 hover:underline">
                  contact us
                </Link>.
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

export default CookiePolicy;

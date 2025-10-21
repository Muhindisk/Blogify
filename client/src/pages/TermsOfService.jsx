import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Last updated: October 21, 2025</p>
          
          {/* Introduction */}
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">1. Agreement to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By accessing or using BlogApp, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
                If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">2. Use License</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Permission is granted to temporarily access the materials on BlogApp for personal, non-commercial viewing only. 
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on BlogApp</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">3. User Accounts</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                When you create an account with us, you must provide accurate, complete, and current information. 
                Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Maintaining the confidentiality of your account and password</li>
                <li>Restricting access to your computer and account</li>
                <li>All activities that occur under your account or password</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">4. Content Guidelines</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Users are solely responsible for the content they post on BlogApp. You agree not to post content that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Is illegal, harmful, threatening, abusive, harassing, defamatory, or invasive of privacy</li>
                <li>Infringes on any patent, trademark, trade secret, copyright, or other proprietary rights</li>
                <li>Contains software viruses or any other computer code designed to interrupt, destroy, or limit functionality</li>
                <li>Impersonates any person or entity or falsely states or misrepresents your affiliation with a person or entity</li>
                <li>Promotes discrimination, bigotry, racism, hatred, harassment, or harm against any individual or group</li>
                <li>Contains spam, advertising, or solicitations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">5. Intellectual Property Rights</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                You retain all rights to the content you post on BlogApp. By posting content, you grant us a worldwide, 
                non-exclusive, royalty-free license to use, reproduce, adapt, publish, and display your content on the platform.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                All other content, features, and functionality on BlogApp are and will remain the exclusive property of BlogApp 
                and its licensors.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">6. Prohibited Activities</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                You may not access or use BlogApp for any purpose other than that for which we make it available. Prohibited activities include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Engaging in any automated use of the system, such as scraping or data mining</li>
                <li>Attempting to bypass any measures designed to prevent or restrict access to the site</li>
                <li>Harassing, annoying, intimidating, or threatening any of our employees or agents</li>
                <li>Deleting the copyright or other proprietary rights notice from any content</li>
                <li>Attempting to impersonate another user or person</li>
                <li>Uploading or transmitting viruses or any other type of malicious code</li>
                <li>Using the service in any manner that could disable, overburden, or impair the site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">7. Termination</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, 
                under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms. 
                Upon termination, your right to use the service will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">8. Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                In no event shall BlogApp, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for 
                any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, 
                data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">9. Disclaimer</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your use of BlogApp is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis. 
                The service is provided without warranties of any kind, whether express or implied, including, but not limited to, 
                implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">10. Governing Law</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which BlogApp operates, 
                without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">11. Changes to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, 
                we will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our 
                service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">12. Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have any questions about these Terms, please contact us at:{' '}
                <Link to="/contact" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Contact Page
                </Link>
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

export default TermsOfService;

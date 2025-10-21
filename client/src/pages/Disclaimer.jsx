import React from 'react';
import { Link } from 'react-router-dom';

const Disclaimer = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Disclaimer</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Last updated: October 21, 2025</p>
          
          {/* Introduction */}
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Website Disclaimer</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The information provided by BlogApp ("we," "us," or "our") on this website is for general informational purposes only. 
                All information on the site is provided in good faith; however, we make no representation or warranty of any kind, 
                express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any 
                information on the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">External Links Disclaimer</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The site may contain (or you may be sent through the site) links to other websites or content belonging to or 
                originating from third parties or links to websites and features in banners or other advertising. Such external links 
                are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY INFORMATION 
                OFFERED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR FEATURE LINKED IN ANY BANNER OR OTHER 
                ADVERTISING. WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND 
                THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Professional Disclaimer</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The site cannot and does not contain professional advice. The information is provided for general informational and 
                educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based 
                upon such information, we encourage you to consult with the appropriate professionals.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                THE USE OR RELIANCE OF ANY INFORMATION CONTAINED ON THIS SITE IS SOLELY AT YOUR OWN RISK.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">User-Generated Content Disclaimer</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                BlogApp allows users to create, upload, and share content, including blog posts, comments, and images. All user-generated 
                content represents the views and opinions of the content creator and not those of BlogApp, its officers, employees, or agents.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                We do not control, monitor, or endorse user-generated content and expressly disclaim any responsibility or liability for such content. 
                While we strive to maintain a respectful and safe community, we are not responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mt-4">
                <li>The accuracy, completeness, or usefulness of user-generated content</li>
                <li>Any errors or omissions in user-generated content</li>
                <li>Any offensive, defamatory, or illegal content posted by users</li>
                <li>Any harm resulting from your use of or reliance on user-generated content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Testimonials Disclaimer</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The site may contain testimonials by users of our services. These testimonials reflect the real-life experiences and 
                opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be 
                representative of all users of our services.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                We do not claim, and you should not assume, that all users will have the same experiences. YOUR INDIVIDUAL RESULTS MAY VARY.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Errors and Omissions Disclaimer</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, 
                BlogApp is not responsible for any errors or omissions or for the results obtained from the use of this information. All 
                information in this site is provided "as is," with no guarantee of completeness, accuracy, timeliness, or of the results 
                obtained from the use of this information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Fair Use Disclaimer</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This site may contain copyrighted material, the use of which has not always been specifically authorized by the copyright owner. 
                We believe this constitutes a "fair use" of any such copyrighted material as provided for in section 107 of the US Copyright Law.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                If you wish to use copyrighted material from this site for purposes of your own that go beyond fair use, you must obtain 
                permission from the copyright owner.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Views Expressed Disclaimer</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The site may contain views and opinions which are those of the authors and do not necessarily reflect the official policy or 
                position of any other author, agency, organization, employer, or company, including BlogApp.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Comments published by users are their sole responsibility and the users will take full responsibility, liability, and blame 
                for any libel or litigation that results from something written in or as a direct result of something written in a comment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No Responsibility Disclaimer</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The information on the service is provided with the understanding that BlogApp is not herein engaged in rendering legal, 
                accounting, tax, medical, or other professional advice and services. As such, it should not be used as a substitute for 
                consultation with professional accounting, tax, legal, or other competent advisers.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                In no event shall BlogApp or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever 
                arising out of or in connection with your access or use or inability to access or use the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">"Use at Your Own Risk" Disclaimer</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                All information on the site is provided "as is," with no guarantee of completeness, accuracy, timeliness, or of the results 
                obtained from the use of this information, and without warranty of any kind, express or implied, including, but not limited to 
                warranties of performance, merchantability, and fitness for a particular purpose.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                BlogApp will not be liable to you or anyone else for any decision made or action taken in reliance on the information given by 
                the service or for any consequential, special, or similar damages, even if advised of the possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Contact Information</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have any questions about this disclaimer, please{' '}
                <Link to="/contact" className="text-primary-600 dark:text-primary-400 hover:underline">
                  contact us
                </Link>.
              </p>
            </section>

            <section className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Important Notice</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By using BlogApp, you acknowledge that you have read this disclaimer and agree to all its terms and conditions. 
                If you do not agree with any part of this disclaimer, you should not use our website or services.
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

export default Disclaimer;

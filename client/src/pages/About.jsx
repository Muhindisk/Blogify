import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About Us</h1>
          
          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Welcome to our blog platform! We're passionate about creating a space where writers and readers 
              can connect, share ideas, and engage in meaningful conversations.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our mission is to provide a simple, elegant, and powerful platform for content creators to share 
              their stories, insights, and expertise with the world. Whether you're a seasoned blogger or just 
              starting your writing journey, we're here to support you.
            </p>
          </div>

          {/* Our Values */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-700 dark:text-primary-300 mb-2">Quality Content</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We believe in promoting high-quality, well-researched content that adds value to our community.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-700 dark:text-primary-300 mb-2">Community First</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our community is at the heart of everything we do. We foster a supportive and inclusive environment.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-700 dark:text-primary-300 mb-2">Innovation</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We continuously improve our platform with new features and technologies to enhance your experience.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-700 dark:text-primary-300 mb-2">Transparency</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We believe in open communication and transparency with our users and community members.
                </p>
              </div>
            </div>
          </div>

          {/* What We Offer */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What We Offer</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Easy-to-use blog post creation and editing tools</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Image upload and management for your posts</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Category and tag organization for better discoverability</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Like and engagement features to build your audience</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Dark mode for comfortable reading at any time</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Responsive design that works on all devices</span>
              </li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-lg border-l-4 border-primary-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Join Our Community</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Ready to start sharing your stories? Join our growing community of writers and readers today!
            </p>
            <div className="flex gap-4">
              <Link 
                to="/register" 
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Get Started
              </Link>
              <Link 
                to="/contact" 
                className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Contact Us
              </Link>
            </div>
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

export default About;

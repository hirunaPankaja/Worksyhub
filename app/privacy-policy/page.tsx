// src/app/privacy-policy/page.tsx
import { Metadata } from 'next';
import { Shield, Lock, EyeOff, Cookie, Server, Users, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - WorksyHub',
  description: 'Learn how WorksyHub protects your privacy with client-side processing and zero data collection.',
  alternates: {
    canonical: 'https://worksyhub.online/privacy-policy',
  },
};

const privacySections = [
  {
    icon: Shield,
    title: 'Introduction',
    content: 'At WorksyHub, we take your privacy seriously. This Privacy Policy explains how we handle information when you use our website and tools.',
  },
  {
    icon: EyeOff,
    title: 'Information We Don\'t Collect',
    content: 'WorksyHub is designed with privacy in mind. All our tools work entirely in your browser using client-side JavaScript.',
    points: [
      'We do not collect any personal information',
      'We do not store any data you enter into our tools',
      'We do not track your usage beyond basic analytics',
      'Your files and data never leave your device'
    ]
  },
  {
    icon: Server,
    title: 'Analytics',
    content: 'We use anonymous analytics to understand how visitors use our site. This helps us improve our tools and services.',
    points: [
      'Page views and popular tools',
      'General location (country/region only)',
      'Device type and browser',
      'Referral sources'
    ],
    note: 'This data is aggregated and anonymous - we cannot identify individual users.'
  },
  {
    icon: Cookie,
    title: 'Cookies',
    content: 'We use minimal cookies only for essential functionality like remembering your theme preference (dark/light mode). We do not use tracking cookies or third-party advertising cookies.'
  },
  {
    icon: Users,
    title: 'Third-Party Services',
    content: 'We may use third-party services for analytics and hosting. These services have their own privacy policies:',
    points: [
      'Vercel (Hosting)',
      'Google Analytics (if enabled)'
    ]
  },
  {
    icon: Lock,
    title: 'Data Security',
    content: 'Since all processing happens in your browser, your data remains on your device and is never transmitted to our servers. This is the most secure approach possible.'
  }
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your privacy is our priority. Learn how we protect your data with client-side processing and zero data collection.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Last Updated: November 10, 2025
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Privacy Features Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-white">
                <h2 className="text-xl font-semibold mb-2">Your Data Stays With You</h2>
                <p className="text-blue-100 text-sm">
                  All processing happens locally in your browser. No data is sent to our servers.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-white text-2xl font-bold">100%</div>
                  <div className="text-blue-100 text-xs">Client-Side</div>
                </div>
                <div className="text-center">
                  <div className="text-white text-2xl font-bold">0</div>
                  <div className="text-blue-100 text-xs">Data Stored</div>
                </div>
                <div className="text-center">
                  <div className="text-white text-2xl font-bold">∞</div>
                  <div className="text-blue-100 text-xs">Privacy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="p-8 space-y-8">
            {privacySections.map((section, index) => (
              <section key={index} className="group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                    <section.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {section.content}
                    </p>
                    {section.points && (
                      <ul className="space-y-2 mb-4">
                        {section.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.note && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg px-4 py-3">
                        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                          {section.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {index < privacySections.length - 1 && (
                  <div className="mt-8 border-b border-gray-200 dark:border-gray-700"></div>
                )}
              </section>
            ))}

            {/* Additional Sections */}
            <div className="grid md:grid-cols-2 gap-8 pt-4">
              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Children's Privacy
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Our services are available to all ages. Since we don't collect personal information, 
                  there are no special considerations for children's data.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Policy Changes
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  We may update this Privacy Policy from time to time. The "Last Updated" date 
                  at the top indicates when changes were last made.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gray-50 dark:bg-slate-700/50 border-t border-gray-200 dark:border-gray-700 px-8 py-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Questions About Privacy?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md mx-auto">
                We're here to help you understand how we protect your privacy.
              </p>
              <a
                href="mailto:hirunapankaja611@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <Mail className="h-4 w-4" />
                Contact Us at hirunapankaja611@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <Lock className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">No Data Storage</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Your data never leaves your device
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <Server className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Client-Side Only</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              All processing happens in your browser
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <EyeOff className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">No Tracking</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              We don't track your personal information
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
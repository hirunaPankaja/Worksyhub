// src/app/terms-of-service/page.tsx
import { Metadata } from 'next';
import { FileText, Scale, Shield, AlertTriangle, Mail, BookOpen, Users, Cpu, Globe, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - WorksyHub',
  description: 'Terms of Service for WorksyHub - Learn about our terms and conditions for using our free online tools.',
  alternates: {
    canonical: 'https://worksyhub.online/terms-of-service',
  },
};

const termsSections = [
  {
    icon: BookOpen,
    title: 'Acceptance of Terms',
    content: 'By accessing and using WorksyHub ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement.',
  },
  {
    icon: Cpu,
    title: 'Description of Service',
    content: 'WorksyHub provides a collection of free online tools including productivity tools, design tools, text utilities, and file conversion tools. All tools operate client-side in your browser.',
  },
  {
    icon: Scale,
    title: 'Use License',
    content: 'Permission is granted to temporarily use the tools on WorksyHub for personal and commercial purposes. This is the grant of a license, not a transfer of title.',
  },
  {
    icon: Users,
    title: 'User Responsibilities',
    content: 'You agree to use the Service responsibly and in accordance with these terms.',
    points: [
      'Do not use the Service for any illegal purpose',
      'Do not attempt to gain unauthorized access to any part of the Service',
      'Do not use the Service in any way that could damage, disable, or impair the Service',
      'Do not use automated systems to access the Service excessively'
    ]
  },
  {
    icon: Shield,
    title: 'Intellectual Property',
    content: 'The Service and its original content, features, and functionality are owned by WorksyHub and are protected by international copyright, trademark, and other intellectual property laws.',
  },
  {
    icon: Heart,
    title: 'Data Privacy',
    content: 'All tools on WorksyHub process data locally in your browser. We do not collect, store, or transmit your data to our servers. Please refer to our Privacy Policy for more details.',
  },
  {
    icon: AlertTriangle,
    title: 'Disclaimer',
    content: 'The tools on WorksyHub are provided "as is" without any warranties, expressed or implied.',
    points: [
      'The Service will be uninterrupted or error-free',
      'The results obtained from using the Service will be accurate or reliable',
      'The quality of any products, services, information will meet your expectations'
    ]
  }
];

const additionalSections = [
  {
    title: 'Limitation of Liability',
    content: 'In no event shall WorksyHub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.'
  },
  {
    title: 'Termination',
    content: 'We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.'
  },
  {
    title: 'Changes to Terms',
    content: 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after revisions become effective, you agree to be bound by the revised terms.'
  },
  {
    title: 'Governing Law',
    content: 'These Terms shall be governed and construed in accordance with the laws of the Service provider\'s jurisdiction, without regard to its conflict of law provisions.'
  }
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
            <FileText className="h-8 w-8 text-gray-600 dark:text-gray-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Please read these terms carefully before using WorksyHub. By using our services, you agree to these terms.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
            <Scale className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Updated: November 10, 2025
            </span>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <Cpu className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Client-Side Processing</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              All tools run in your browser. Your data never leaves your device.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <Globe className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Free to Use</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              All tools are completely free for personal and commercial use.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <Shield className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">No Account Required</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Start using our tools immediately without signing up.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {termsSections.map((section, index) => (
            <section key={index} className="group">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
                  <section.icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {section.content}
                  </p>
                  {section.points && (
                    <ul className="space-y-3 mb-4">
                      {section.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              {index < termsSections.length - 1 && (
                <div className="mt-8 border-b border-gray-200 dark:border-gray-700"></div>
              )}
            </section>
          ))}

          {/* Additional Sections Grid */}
          <div className="grid md:grid-cols-2 gap-8 pt-8">
            {additionalSections.map((section, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">
                  {section.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center border-t border-gray-200 dark:border-gray-700 pt-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
            <Mail className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Questions About Our Terms?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
            If you have any questions about these Terms of Service, please don't hesitate to contact us.
          </p>
          <a
            href="mailto:hirunapankaja611@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
          >
            <Mail className="h-4 w-4" />
            Contact Us at hirunapankaja611@gmail.com
          </a>
        </div>

        {/* Related Links */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <span>Related Documents:</span>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            <a href="/" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              Home Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
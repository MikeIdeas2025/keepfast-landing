import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy - Keepfa.st",
  description: "Cookie Policy for Keepfa.st - AI-powered churn prevention for SaaS",
};

export default function CookiePolicy() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
          <Link 
            href="/" 
            className="text-brand-yellow hover:underline mb-8 inline-block"
          >
            ← Back to Home
          </Link>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-8">Cookie Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our website and hold certain information to improve your browsing experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold mb-3">2.1 Essential Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
              </p>

              <h3 className="text-xl font-semibold mb-3">2.2 Analytics Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use PostHog analytics cookies to understand how visitors interact with our website. These cookies help us:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Analyze website traffic and usage patterns</li>
                <li>Understand which pages are most popular</li>
                <li>Identify technical issues and improve user experience</li>
                <li>Track conversion events (e.g., waitlist signups)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                These cookies are only set with your explicit consent. You can withdraw your consent at any time.
              </p>

              <h3 className="text-xl font-semibold mb-3">2.3 Preference Cookies</h3>
              <p className="text-gray-700 leading-relaxed">
                These cookies remember your choices (such as your cookie preferences) to provide a more personalized experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Third-Party Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We use the following third-party services that may set cookies:</p>
              
              <h3 className="text-xl font-semibold mb-3">PostHog</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                PostHog is an analytics platform that helps us understand how users interact with our website. PostHog may use cookies to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Track page views and user sessions</li>
                <li>Record user interactions (with consent)</li>
                <li>Analyze user behavior and conversion funnels</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                For more information about PostHog's privacy practices, visit: <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-yellow hover:underline">https://posthog.com/privacy</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. How to Manage Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">You have several options to manage cookies:</p>
              
              <h3 className="text-xl font-semibold mb-3">4.1 Cookie Banner</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you first visit our website, you'll see a cookie banner where you can:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Accept all cookies</li>
                <li>Reject non-essential cookies</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">4.2 Browser Settings</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Block all cookies</li>
                <li>Block third-party cookies only</li>
                <li>Delete existing cookies</li>
                <li>Set your browser to notify you when cookies are being set</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Please note that blocking cookies may affect your ability to use certain features of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Your Consent</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By clicking "Accept All" on our cookie banner, you consent to our use of cookies as described in this Cookie Policy.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You can withdraw your consent at any time by clearing your browser cookies or changing your cookie preferences. However, this may affect your experience on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Changes to This Cookie Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Cookie Policy on this page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about our use of cookies, please contact us at:
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Email: <a href="mailto:hello@keepfa.st" className="text-brand-yellow hover:underline">hello@keepfa.st</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

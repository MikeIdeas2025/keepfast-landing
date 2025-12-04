"use client";

import Link from "next/link";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Header />

      {/* Hero Section with Gradient Background */}
      <section className="bg-gradient-hero relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fadeIn">
            {/* Yellow Badge */}
            <div className="inline-block bg-brand-yellow px-6 py-2.5 rounded-full text-sm font-semibold mb-8 shadow-yellow animate-scaleIn">
              Because who's not keeping away... everyone
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight animate-appearFromBottom">
              Keepfa.st stops your <span className="text-gradient">SaaS signup churn</span>. Usage, engagement and product: automated alerts help too fast.
            </h1>

            <p className="text-xl lg:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto animate-appearFromBottom" style={{ animationDelay: '0.1s' }}>
              Built in public. Designed for small teams with big ambitions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-appearFromBottom" style={{ animationDelay: '0.2s' }}>
              <a href="#waitlist" className="btn btn-brand-yellow btn-lg">
                Get Early Access
              </a>
              <a href="#features" className="btn btn-outline btn-lg border-2 border-black hover:bg-black hover:text-white transition-all duration-300">
                See how it works
              </a>
            </div>
          </div>

          {/* Three Icon Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="icon-circle mx-auto mb-4 animate-float" style={{ animationDelay: '0s' }}>💡</div>
              <p className="text-gray-700 font-medium">
                Your product has signals. Keepfa.st reads them.
              </p>
            </div>
            <div className="text-center group">
              <div className="icon-circle mx-auto mb-4 animate-float" style={{ animationDelay: '0.2s' }}>🎯</div>
              <p className="text-gray-700 font-medium">
                It calculates a health Score for every customer.
              </p>
            </div>
            <div className="text-center group">
              <div className="icon-circle mx-auto mb-4 animate-float" style={{ animationDelay: '0.4s' }}>🚨</div>
              <p className="text-gray-700 font-medium">
                And tells you exactly what's at churn — and what to do next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Indie Founders Problem/Solution Section */}
      <section id="features" className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="text-gray-600 mb-4 text-lg">Indie founders don't need more dashboards.</p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              They need clarity.
            </h2>
            <p className="text-3xl lg:text-4xl font-bold mt-2">
              Keepfa.st at turns scattered SaaS signals into one clear answer:
            </p>
            <p className="text-3xl lg:text-4xl font-bold text-gradient mt-2">
              "Who's at risk today?"
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* The Real Problem */}
            <div className="bg-brand-pink p-8 rounded-2xl card-modern border-2 border-red-100 hover:border-red-200">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                  ⚠️
                </div>
                <h3 className="text-2xl font-bold">The Real Problem</h3>
              </div>

              <p className="mb-6 text-gray-800">
                Indie founders discover churn when it's too late. The signals are there, but they're scattered everywhere:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Stripe</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>PostHog</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Gmail/Inbox</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Onboarding analytics</span>
                </li>
              </ul>

              <div className="mt-8 p-4 bg-red-100 rounded-lg border-2 border-red-300">
                <p className="font-semibold text-red-800">
                  Result? You need to churn instead of preventing it.
                </p>
              </div>
            </div>

            {/* The Solution */}
            <div className="bg-brand-mint p-8 rounded-2xl card-modern border-2 border-green-100 hover:border-green-200">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                  ✓
                </div>
                <h3 className="text-2xl font-bold">The Solution</h3>
              </div>

              <p className="mb-6 text-gray-800">
                Keepfa.st pulls all these disparate signals, unifies them into a Health Score, and shows you:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Who's at risk of leaving</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Why they're leaving</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>What to do right now</span>
                </li>
              </ul>

              <div className="mt-8 p-4 bg-green-100 rounded-lg border-2 border-green-300">
                <p className="font-semibold text-green-800">
                  The list "return radar" designed only for Indie SaaS and indie founders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - 4 Cards */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Health Score */}
            <div className="card-modern group">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center text-white text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                📊
              </div>
              <h3 className="text-2xl font-bold mb-4">Health Score (0-100)</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                A one-glance health score for every user or SaaS user. Billing, Usage, Engagement, Sentiment, and product trends.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Health</span>
                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">At-Risk</span>
                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Likely to Churn</span>
                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">User value</span>
                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">User onboard</span>
              </div>
            </div>

            {/* Churn Radar */}
            <div className="card-modern group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                🎯
              </div>
              <h3 className="text-2xl font-bold mb-4">Churn Radar</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                A one-shot daily score that shows who's at risk. See exactly who's dropping off and why.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Requires 6 weeks</span>
                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Using payments</span>
                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Learning trends</span>
              </div>
            </div>

            {/* Actionable Insights */}
            <div className="card-modern group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center text-white text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                💡
              </div>
              <h3 className="text-2xl font-bold mb-4">Actionable Insights (AI-powered)</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                For every at-risk user, Keepfa.st suggests the best next action.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Send manual message</span>
                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Share suggestion email</span>
                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Ask user survey</span>
              </div>
            </div>

            {/* Signals Engine */}
            <div className="card-modern group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                ⚡
              </div>
              <h3 className="text-2xl font-bold mb-4">Signals Engine (automatic)</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Integrates with your stack and automatically updates each user's risk state.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Stripe</span>
                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Resend</span>
                <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Mailchimp</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Purple Section */}
      <section id="how-it-works" className="bg-gradient-purple text-white section-padding relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl opacity-90">
              Simple setup. Automatic monitoring. Actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center text-black text-3xl mb-6 mx-auto shadow-yellow group-hover:scale-110 transition-transform duration-300">
                1️⃣
              </div>
              <div className="glass-dark rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group-hover:scale-105">
                <div className="mb-4">
                  <span className="text-5xl inline-block animate-float" style={{ animationDelay: '0s' }}>🔗</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Connect Your Signals</h3>
                <p className="opacity-90 leading-relaxed">
                  Integrate with Stripe, your app analytics, and any other tools in 5 minutes or less.
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center text-black text-3xl mb-6 mx-auto shadow-yellow group-hover:scale-110 transition-transform duration-300">
                2️⃣
              </div>
              <div className="glass-dark rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group-hover:scale-105">
                <div className="mb-4">
                  <span className="text-5xl inline-block animate-float" style={{ animationDelay: '0.2s' }}>📈</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Get Health Scores</h3>
                <p className="opacity-90 leading-relaxed">
                  Keepfa.st automatically calculates a 0-100 health score for every single customer.
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center text-black text-3xl mb-6 mx-auto shadow-yellow group-hover:scale-110 transition-transform duration-300">
                3️⃣
              </div>
              <div className="glass-dark rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group-hover:scale-105">
                <div className="mb-4">
                  <span className="text-5xl inline-block animate-float" style={{ animationDelay: '0.4s' }}>🔔</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Act Before Churn</h3>
                <p className="opacity-90 leading-relaxed">
                  Get alerts for at-risk users with AI-recommended actions to re-engage them fast.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who is it for Section */}
      <section id="who-is-it-for" className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Who is it for
            </h2>
            <p className="text-xl text-gray-600">
              Built for indie founders and micro-SaaS teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Indie Founders Plan */}
            <div className="card-modern group">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                👤
              </div>

              <h3 className="text-2xl font-bold mb-3">Indie Founders</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                For indie hackers and makers building and optimizing, and can't afford to lose MRR to preventable churn
              </p>

              <ul className="space-y-2.5">
                <li className="flex items-center gap-2.5">
                  <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-sm">No setup fees required</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-sm">Simple integration</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-sm">Works with signals, not games</span>
                </li>
              </ul>
            </div>

            {/* Micro-SaaS Plan */}
            <div className="card-modern group border-2 border-brand-yellow">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                💼
              </div>

              <h3 className="text-2xl font-bold mb-3">Micro SaaS and SaaS from $150 to $100K MRR</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                For growing SaaS: marketing, support, features. Simple non-intrusive actions
              </p>

              <ul className="space-y-2.5">
                <li className="flex items-center gap-2.5">
                  <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-sm">Everything in Indie tier</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-sm">Billing automations</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-sm">Landing audits</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-sm">Feature feedback</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Yellow Background */}
      <section className="bg-gradient-yellow section-padding relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center animate-on-scroll">
            Why Keepfa.st is Perfect for You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="flex items-start gap-3 group">
              <span className="text-2xl flex-shrink-0 group-hover:scale-125 transition-transform duration-300">✓</span>
              <span className="text-lg font-medium">No data team required</span>
            </div>
            <div className="flex items-start gap-3 group">
              <span className="text-2xl flex-shrink-0 group-hover:scale-125 transition-transform duration-300">✓</span>
              <span className="text-lg font-medium">No complex configurations</span>
            </div>
            <div className="flex items-start gap-3 group">
              <span className="text-2xl flex-shrink-0 group-hover:scale-125 transition-transform duration-300">✓</span>
              <span className="text-lg font-medium">Quick setup</span>
            </div>
            <div className="flex items-start gap-3 group">
              <span className="text-2xl flex-shrink-0 group-hover:scale-125 transition-transform duration-300">✓</span>
              <span className="text-lg font-medium">Works with signals, not guesses</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Dark Background */}
      <section className="bg-brand-dark text-white section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center relative z-10">
          <p className="text-xl mb-4 opacity-80 animate-on-scroll">
            Retention is the strongest growth engine.
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 animate-on-scroll" style={{ animationDelay: '0.1s' }}>
            Keep the customers you already earned
          </h2>
          <a href="#waitlist" className="btn btn-brand-yellow btn-lg animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            Join Early Access
          </a>
          <p className="mt-6 text-sm opacity-60">
            Join indie hackers on the waitlist
          </p>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="bg-white section-padding">
        <div className="max-w-xl mx-auto px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center animate-on-scroll">
            Join the Waitlist
          </h2>
          <p className="text-center text-gray-600 mb-8 text-lg animate-on-scroll" style={{ animationDelay: '0.1s' }}>
            Get early access and be among the first indie founders to prevent churn before it happens.
          </p>

          <div className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <WaitlistForm />
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-3 mt-12">
            <a
              href="https://x.com/MicLau93"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-200 hover:text-black transition-all duration-200"
              aria-label="Follow on X"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/michlauro/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
              aria-label="Connect on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .771 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://github.com/MikeIdeas2025/keepfast-landing"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-800 hover:text-white transition-all duration-200"
              aria-label="View on GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

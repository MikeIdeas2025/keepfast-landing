import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Logo href={undefined} />
            <p className="mt-4 text-gray-600 max-w-md leading-relaxed">
              AI-powered churn prevention for indie founders and micro-SaaS.
              Stop losing customers, start keeping them.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-4 text-gray-900">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="#features" 
                  className="link link-hover text-gray-600 hover:text-brand-yellow transition-colors duration-200"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  href="#pricing" 
                  className="link link-hover text-gray-600 hover:text-brand-yellow transition-colors duration-200"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  href="#how-it-works" 
                  className="link link-hover text-gray-600 hover:text-brand-yellow transition-colors duration-200"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-gray-900">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy-policy" 
                  className="link link-hover text-gray-600 hover:text-brand-yellow transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/cookie-policy" 
                  className="link link-hover text-gray-600 hover:text-brand-yellow transition-colors duration-200"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <a
                  href="https://x.com/MicLau93"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover text-gray-600 hover:text-brand-yellow transition-colors duration-200"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/michlauro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover text-gray-600 hover:text-brand-yellow transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/MikeIdeas2025/keepfast-landing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover text-gray-600 hover:text-brand-yellow transition-colors duration-200"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider my-8"></div>

        <div className="text-center text-sm text-gray-500">
          <p>© {currentYear} Keepfa.st. Made with ❤️ for indie hackers.</p>
        </div>
      </div>
    </footer>
  );
}

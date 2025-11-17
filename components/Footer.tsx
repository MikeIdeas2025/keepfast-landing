import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Logo href={undefined} />
            <p className="mt-4 text-base-content/70 max-w-md">
              AI-powered churn prevention for indie founders and micro-SaaS.
              Stop losing customers, start keeping them.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="link link-hover">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="link link-hover">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="link link-hover">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://twitter.com/keepfast"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/keepfast"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider"></div>

        <div className="text-center text-sm text-base-content/60">
          <p>© {currentYear} Keepfa.st. Made with ❤️ for indie hackers.</p>
        </div>
      </div>
    </footer>
  );
}

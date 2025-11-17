import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="navbar bg-base-100 border-b border-base-200 px-4 lg:px-8">
      <div className="flex-1">
        <Logo />
      </div>

      <div className="flex-none">
        <nav className="hidden lg:flex items-center gap-6 mr-8">
          <Link href="#features" className="link link-hover">
            Features
          </Link>
          <Link href="#how-it-works" className="link link-hover">
            How It Works
          </Link>
          <Link href="#pricing" className="link link-hover">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="#waitlist" className="btn btn-brand-yellow">
            Join Waitlist
          </Link>
        </div>
      </div>
    </header>
  );
}

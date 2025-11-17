import Link from "next/link";

interface LogoProps {
  className?: string;
  href?: string | null;
}

export default function Logo({ className = "", href = "/" }: LogoProps) {
  const LogoContent = () => (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Icon/Symbol */}
      <div className="w-8 h-8 bg-brand-yellow rounded-lg flex items-center justify-center font-bold text-black">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M12 2L2 7L12 12L22 7L12 2Z" />
          <path d="M2 17L12 22L22 17" />
          <path d="M2 12L12 17L22 12" />
        </svg>
      </div>

      {/* Text */}
      <span className="text-xl font-bold">
        Keepfa<span className="text-brand-yellow">.st</span>
      </span>
    </div>
  );

  if (!href) {
    return <LogoContent />;
  }

  return (
    <Link href={href} className="hover:opacity-80 transition-opacity">
      <LogoContent />
    </Link>
  );
}

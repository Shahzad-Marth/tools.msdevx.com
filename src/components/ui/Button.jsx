import Link from "next/link";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer border-0";

  const variants = {
    primary:
      "bg-brand text-white shadow-card hover:bg-brand-dark hover:shadow-card-hover disabled:opacity-50",
    secondary:
      "bg-transparent text-text border-2 border-border hover:border-brand hover:text-brand disabled:opacity-50",
    outline:
      "border-2 border-brand text-brand bg-transparent hover:bg-brand hover:text-white transition-colors",
    ghost:
      "bg-transparent text-text-muted hover:text-brand hover:bg-bg-soft transition-colors",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? "cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
}

export function ButtonLink({ children, to, variant = "primary", size = "md", className = "" }) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 border-0";

  const variants = {
    primary:
      "bg-brand text-white shadow-card hover:bg-brand-dark hover:shadow-card-hover",
    secondary:
      "bg-transparent text-text border-2 border-border hover:border-brand hover:text-brand",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <Link
      href={to}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

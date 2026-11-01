type LogoProps = {
  className?: string;
  size?: number;
};

/** Geometric “A” monogram for Ali. */
export function Logo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`block ${className}`}
      aria-hidden
    >
      <rect width="40" height="40" rx="12" className="fill-text" />
      <path
        d="M20 9.5L29.5 30H25.2L23.15 24.6H16.85L14.8 30H10.5L20 9.5ZM17.95 21.4H22.05L20 15.9L17.95 21.4Z"
        className="fill-bg"
      />
    </svg>
  );
}

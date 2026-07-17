import type * as React from "react";

export function GoogleIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3.02h3.87c2.27-2.09 3.58-5.17 3.58-8.84Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.87-3a7.15 7.15 0 0 1-10.66-3.76H1.4v3.11A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.41 14.34a7.2 7.2 0 0 1 0-4.62V6.6H1.4a12 12 0 0 0 0 10.85l4.01-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.35.61 4.6 1.8l3.44-3.44A11.63 11.63 0 0 0 12 0 12 12 0 0 0 1.4 6.6l4.01 3.12A7.16 7.16 0 0 1 12 4.75Z"
      />
    </svg>
  );
}

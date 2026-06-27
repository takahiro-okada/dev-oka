import Link from "next/link";
import type { ReactNode } from "react";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
};

export default function LinkButton({ href, children }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-lg border border-black bg-black px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16A3B] focus-visible:ring-offset-4"
    >
      {children}
    </Link>
  );
}

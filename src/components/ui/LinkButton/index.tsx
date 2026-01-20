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
      className="text-sm text-white font-bold px-6 py-3 bg-black border rounded-lg transition-colors"
    >
      {children}
    </Link>
  );
}

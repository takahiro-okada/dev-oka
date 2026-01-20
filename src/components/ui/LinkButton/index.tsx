import Link from "next/link";

type LinkButtonProps = {
  href: string;
};

export default function LinkButton({ href }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className="text-sm text-white font-bold px-6 py-3 bg-black border rounded-lg transition-colors"
    >
      READ MORE
    </Link>
  );
}

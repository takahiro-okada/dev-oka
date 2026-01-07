import Link from "next/link";

export default function Header() {
  return (
    <header className="">
      <div className="max-w-(--content-width) mx-auto flex justify-between items-center py-14">
        <h1 className="font-just-me-again-down-here text-4xl">
          <Link href="/">Takahiro Okada</Link>
        </h1>
        <button>Menu</button>
      </div>
    </header>
  );
}

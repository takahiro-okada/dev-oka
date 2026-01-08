import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 mb-10">
      <div className="max-w-(--content-width) mx-auto px-5 text-center text-gray-600 border-t border-[#D9D9D9] pt-8">
        <nav>
          <ul className="flex justify-center gap-4">
            <li>
              <Link href="#" className="text-sm">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm">
                Works
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm">
                Notes
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm">
                Privacy
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

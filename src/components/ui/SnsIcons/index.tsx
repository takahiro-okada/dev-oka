import Link from "next/link";

export default function SnsIcons() {
  return (
    <div className="flex gap-4">
      <Link
        href="#"
        className="text-gray-600 hover:text-gray-800"
        aria-label="X (Twitter) Icon"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.3 3.9A12.14 12.14 0 013 4.8a4.28 4.28 0 001.32 5.72 4.24 4.24
            0 01-1.94-.54v.05a4.28 4.28 0 003.44 4.2 4.3 4.3 0 01-1.93.07 4.28 4.28 0 004 2.97A8.6 8.6 0 012 19.54a12.14 12.14 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2l-.01-.56A8.72 8.72 0 0024 5.1a8.5 8.5 0 01-2.54.7z"
          />w
        </svg>
      </Link>
    </div>
  );
}

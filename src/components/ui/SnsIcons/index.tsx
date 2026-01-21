import Image from "next/image";
import Link from "next/link";

export default function SnsIcons() {
  return (
    <div className="flex gap-4">
      <Link
        href="https://github.com/takahiro-okada"
        target="_blank"
        className="text-gray-600 hover:text-gray-800"
        aria-label="Github Icon"
      >
        <Image
          src="/images/icon-github.svg"
          alt="Github Icon"
          width={30}
          height={30}
        />
      </Link>
      <Link
        href="https://www.linkedin.com/in/takahiro-okada-76b998287/"
        target="_blank"
        className="text-gray-600 hover:text-gray-800"
        aria-label="LinkedIn Icon"
      >
        <Image
          src="/images/icon-linkedin.svg"
          alt="LinkedIn Icon"
          width={30}
          height={30}
        />
      </Link>
      <Link
        href="https://dev.to/dev-oka"
        target="_blank"
        className="text-gray-600 hover:text-gray-800"
        aria-label="dev.to Icon"
      >
        <Image
          src="/images/icon-dev.svg"
          alt="dev.to Icon"
          width={30}
          height={30}
        />
      </Link>
      <Link
        href="https://www.youtube.com/@dev-oka"
        target="_blank"
        className="text-gray-600 hover:text-gray-800"
        aria-label="YouTube Icon"
      >
        <Image
          src="/images/icon-youtube.svg"
          alt="YouTube Icon"
          width={30}
          height={30}
        />
      </Link>
      <Link
        href="#"
        className="text-gray-600 hover:text-gray-800"
        aria-label="Instagram Icon"
      >
        <Image
          src="/images/icon-instagram.svg"
          alt="Instagram Icon"
          width={30}
          height={30}
        />
      </Link>
      <Link
        href="https://www.facebook.com/oka.jumboworld/"
        target="_blank"
        className="text-gray-600 hover:text-gray-800"
        aria-label="Facebook Icon"
      >
        <Image
          src="/images/icon-facebook.svg"
          alt="Facebook Icon"
          width={30}
          height={30}
        />
      </Link>
      <Link
        href="https://x.com/oka_jumboworld"
        target="_blank"
        className="text-gray-600 hover:text-gray-800"
        aria-label="X (Twitter) Icon"
      >
        <Image
          src="/images/icon-x.svg"
          alt="X (Twitter) Icon"
          width={30}
          height={30}
        />
      </Link>
    </div>
  );
}

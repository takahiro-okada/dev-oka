"use client";

import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { startTransition, useEffect, useRef } from "react";

type ViewTransitionProviderProps = {
  children: ReactNode;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => Promise<void> | void) => {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
    skipTransition: () => void;
  };
};

const isModifiedEvent = (event: MouseEvent<HTMLDivElement>) =>
  event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

const getInternalUrl = (anchor: HTMLAnchorElement) => {
  const url = new URL(anchor.href);

  if (url.origin !== window.location.origin) {
    return null;
  }

  if (
    url.pathname === window.location.pathname &&
    url.search === window.location.search
  ) {
    return null;
  }

  return `${url.pathname}${url.search}${url.hash}`;
};

export default function ViewTransitionProvider({
  children,
}: ViewTransitionProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const finishTransitionRef = useRef<(() => void) | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!pathname || !finishTransitionRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }

      finishTransitionRef.current?.();
      finishTransitionRef.current = null;
    });
  }, [pathname]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const anchor = target.closest("a");

    if (!anchor) {
      return;
    }

    if (
      event.button !== 0 ||
      isModifiedEvent(event) ||
      anchor.target ||
      anchor.hasAttribute("download")
    ) {
      return;
    }

    const href = getInternalUrl(anchor);

    if (!href) {
      return;
    }

    const transitionDocument = document as ViewTransitionDocument;

    if (!transitionDocument.startViewTransition) {
      event.preventDefault();
      router.push(href);
      return;
    }

    event.preventDefault();

    const transitionReady = new Promise<void>((resolve) => {
      finishTransitionRef.current = resolve;
      fallbackTimerRef.current = setTimeout(() => {
        finishTransitionRef.current?.();
        finishTransitionRef.current = null;
        fallbackTimerRef.current = null;
      }, 1200);
    });

    transitionDocument.startViewTransition(() => {
      startTransition(() => {
        router.push(href);
      });

      return transitionReady;
    });
  };

  return (
    <div onClickCapture={handleClick} className="contents">
      {children}
    </div>
  );
}

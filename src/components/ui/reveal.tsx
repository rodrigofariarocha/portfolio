"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger offset in ms. Keep groups within 30–80ms per step. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Fades and lifts its children in once, the first time they enter the viewport.
 *
 * Driven by a data attribute and a CSS transition rather than a JS animation
 * loop: it stays smooth while the page is still loading, and reduced-motion
 * users get the opacity change without the movement (handled in globals.css).
 */
export function Reveal({ children, delay = 0, className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -100px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      data-visible={visible || undefined}
      className={`opacity-0 translate-y-4 transition-[opacity,transform] duration-700 ease-(--ease-out) data-visible:opacity-100 data-visible:translate-y-0 motion-reduce:translate-y-0 ${className ?? ""}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

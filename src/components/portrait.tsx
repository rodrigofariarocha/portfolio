"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { squircleStyle } from "@/lib/squircle";

const MAX_TILT = 6;
/** Fraction of the remaining distance covered each frame — a cheap spring. */
const EASING = 0.12;

/**
 * The portrait, clipped to an iOS superellipse and tilted gently toward the
 * pointer.
 *
 * The rotation is interpolated rather than pinned straight to the cursor:
 * tying a value 1:1 to mouse position reads as mechanical, while easing toward
 * it gives the card a little weight. Fine pointers only, and disabled outright
 * under prefers-reduced-motion.
 */
export function Portrait({ alt }: { alt: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const card = cardRef.current;
    if (!frame || !card) return;

    const canTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canTilt || reduced) return;

    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let raf = 0;

    const tick = () => {
      current = {
        x: current.x + (target.x - current.x) * EASING,
        y: current.y + (target.y - current.y) * EASING,
      };

      card.style.transform = `perspective(1000px) rotateX(${current.y}deg) rotateY(${current.x}deg)`;

      const settled =
        Math.abs(target.x - current.x) < 0.01 && Math.abs(target.y - current.y) < 0.01;

      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = frame.getBoundingClientRect();
      // -0.5..0.5 from the centre of the frame.
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      target = { x: px * MAX_TILT * 2, y: -py * MAX_TILT * 2 };
      start();
    };

    const onPointerLeave = () => {
      target = { x: 0, y: 0 };
      start();
    };

    frame.addEventListener("pointermove", onPointerMove);
    frame.addEventListener("pointerleave", onPointerLeave);

    return () => {
      frame.removeEventListener("pointermove", onPointerMove);
      frame.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={frameRef} className="relative">
      {/* Ambient light behind the shape, so it sits in the page rather than on
          top of it. No border — the silhouette is the edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 opacity-80 blur-3xl"
        style={{
          ...squircleStyle,
          background: "radial-gradient(circle at 50% 40%, var(--sheen), transparent 70%)",
        }}
      />

      <div ref={cardRef} className="will-change-transform">
        <div style={squircleStyle} className="relative aspect-square w-full bg-bg-subtle">
          <Image
            src="/rodrigo.png"
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 70vw, 420px"
            className="object-cover"
          />

          {/* Two things at once, both clipped by the parent's mask: a hairline
              of light along the top edge the way a real material catches the
              room, and an inset rule that keeps the silhouette readable where
              a night photograph goes as dark as the page behind it. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_var(--hairline)]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.16), transparent 24%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

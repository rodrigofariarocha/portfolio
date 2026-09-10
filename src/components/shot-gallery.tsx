"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Shot } from "@/content/projects";
import type { Locale } from "@/lib/i18n/config";

const ASPECT = {
  phone: "aspect-[828/1792]",
  web: "aspect-[16/10]",
} as const;

const FRAME =
  "relative overflow-hidden rounded-xl bg-bg ring-1 ring-[var(--hairline)]";

/**
 * A grid of screenshots, each opening full size in a lightbox.
 *
 * Built on the native `<dialog>` element: focus trapping, Escape to close and
 * inertness of the page behind it come from the platform rather than from a
 * pile of event handlers.
 */
export function ShotGallery({
  shots,
  locale,
  kind,
  closeLabel,
  previousLabel,
  nextLabel,
}: {
  shots: Shot[];
  locale: Locale;
  kind: "phone" | "web";
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const open = (index: number) => {
    setOpenIndex(index);
    dialogRef.current?.showModal();
  };

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) =>
        current === null ? null : (current + delta + shots.length) % shots.length,
      );
    },
    [shots.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    // `close` fires for Escape too, so state stays in step with the element.
    const onClose = () => setOpenIndex(null);

    dialog.addEventListener("keydown", onKeyDown);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKeyDown);
      dialog.removeEventListener("close", onClose);
    };
  }, [step]);

  const active = openIndex === null ? null : shots[openIndex];

  return (
    <>
      <ul
        className={
          kind === "phone"
            ? "grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-6"
            : "grid gap-x-4 gap-y-6 sm:grid-cols-3"
        }
      >
        {shots.map((shot, index) => (
          <li key={shot.src}>
            <button
              type="button"
              onClick={() => open(index)}
              className="pressable group block w-full text-left"
            >
              <div
                className={`${FRAME} ${ASPECT[kind]} transition-[box-shadow] duration-300 group-hover:ring-border-strong`}
              >
                <Image
                  src={shot.src}
                  alt={shot.caption[locale]}
                  fill
                  sizes={
                    kind === "phone"
                      ? "(max-width: 640px) 28vw, 140px"
                      : "(max-width: 640px) 90vw, 300px"
                  }
                  className={`object-cover ${kind === "phone" ? "object-top" : "object-center"}`}
                />
              </div>
              <p className="mt-2.5 truncate text-center text-[12px] text-text-faint">
                {shot.caption[locale]}
              </p>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClick={(event) => {
          // Clicking the backdrop lands on the dialog itself, never a child.
          if (event.target === dialogRef.current) close();
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-4 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        {active ? (
          <div className="flex flex-col items-center gap-4">
            <div
              className={`relative max-h-[78vh] overflow-hidden rounded-2xl bg-bg shadow-2xl ring-1 ring-[var(--hairline)] ${
                kind === "phone" ? "aspect-[828/1792]" : "aspect-[16/10]"
              } ${kind === "phone" ? "h-[78vh] w-auto" : "w-[min(92vw,60rem)]"}`}
            >
              <Image
                src={active.src}
                alt={active.caption[locale]}
                fill
                sizes={kind === "phone" ? "40vh" : "92vw"}
                className="object-contain"
              />
            </div>

            <div className="flex items-center gap-2">
              {shots.length > 1 ? (
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={previousLabel}
                  className="pressable material grid size-9 place-items-center rounded-full text-text"
                >
                  <ChevronLeft aria-hidden className="size-5" />
                </button>
              ) : null}

              <p className="material rounded-full px-4 py-2 text-[13px] text-text">
                {active.caption[locale]}
              </p>

              {shots.length > 1 ? (
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={nextLabel}
                  className="pressable material grid size-9 place-items-center rounded-full text-text"
                >
                  <ChevronRight aria-hidden className="size-5" />
                </button>
              ) : null}
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={close}
          aria-label={closeLabel}
          className="pressable material fixed right-5 top-5 grid size-10 place-items-center rounded-full text-text"
        >
          <X aria-hidden className="size-5" />
        </button>
      </dialog>
    </>
  );
}

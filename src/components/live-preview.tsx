"use client";

import { Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The live site, embedded and scrollable, inside a browser frame — and a
 * button that blows it up to a full window.
 *
 * A plain iframe at container width rather than a scaled-down desktop render:
 * the site lays itself out for the width it is given, and scrolling, links and
 * form fields all behave normally. A CSS transform would look more like a
 * screenshot but make every pointer coordinate lie.
 *
 * This only works while the embedded site allows framing. If that ever
 * changes the frame goes blank, which is why the URL is a real link out.
 */
export function LivePreview({
  url,
  label,
  expandLabel,
  closeLabel,
}: {
  url: string;
  label: string;
  expandLabel: string;
  closeLabel: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [expanded, setExpanded] = useState(false);
  const host = new URL(url).host;

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // `close` fires for Escape too, so state stays in step with the element.
    const onClose = () => setExpanded(false);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const chrome = (
    <>
      <span aria-hidden className="flex gap-1.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
      </span>
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="mx-auto truncate rounded-full bg-bg-subtle px-3 py-1 text-[12px] text-text-muted transition-colors duration-200 hover:text-text"
      >
        {host}
      </a>
    </>
  );

  return (
    <>
      <figure className="m-0 overflow-hidden rounded-2xl bg-bg ring-1 ring-[var(--hairline)]">
        <div className="flex items-center gap-2 border-b border-[var(--hairline)] px-3 py-2.5">
          {chrome}
          <button
            type="button"
            onClick={() => {
              setExpanded(true);
              dialogRef.current?.showModal();
            }}
            aria-label={expandLabel}
            title={expandLabel}
            className="pressable grid size-7 shrink-0 place-items-center rounded-full text-text-faint transition-colors duration-200 hover:bg-accent-soft hover:text-text"
          >
            <Maximize2 aria-hidden className="size-3.5" />
          </button>
        </div>

        <iframe
          src={url}
          title={label}
          loading="lazy"
          // allow-same-origin refers to the framed site's own origin, which it
          // needs to run; it does not grant access to this page.
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          className="block h-[32rem] w-full border-0 bg-white"
        />
      </figure>

      <dialog
        ref={dialogRef}
        onClick={(event) => {
          // Clicking the backdrop lands on the dialog itself, never a child.
          if (event.target === dialogRef.current) close();
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-4 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        {expanded ? (
          <div className="flex h-[88vh] w-[92vw] flex-col overflow-hidden rounded-2xl bg-bg shadow-2xl ring-1 ring-[var(--hairline)]">
            <div className="flex items-center gap-2 border-b border-[var(--hairline)] px-4 py-3">
              {chrome}
              <button
                type="button"
                onClick={close}
                aria-label={closeLabel}
                className="pressable grid size-7 shrink-0 place-items-center rounded-full text-text-faint transition-colors duration-200 hover:bg-accent-soft hover:text-text"
              >
                <X aria-hidden className="size-4" />
              </button>
            </div>

            <iframe
              src={url}
              title={label}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              className="flex-1 border-0 bg-white"
            />
          </div>
        ) : null}
      </dialog>
    </>
  );
}

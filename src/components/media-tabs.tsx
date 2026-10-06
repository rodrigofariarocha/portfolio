"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type MediaTab = { id: string; label: string; content: ReactNode };

/**
 * A project's media, one group at a time behind a segmented control — the same
 * pill as the site nav — instead of every group stacked down the page.
 *
 * A panel mounts the first time its tab is picked and then stays mounted,
 * hidden, so the live site and the videos do not load until asked for and do
 * not reload every time someone flips back to them.
 *
 * WAI-ARIA tabs: arrow keys, Home and End move between tabs, and only the
 * selected tab sits in the Tab order.
 */
export function MediaTabs({ tabs, label }: { tabs: MediaTab[]; label: string }) {
  const id = useId();
  const [active, setActive] = useState(tabs[0]?.id);
  const [visited, setVisited] = useState(() => new Set([tabs[0]?.id]));
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const tab = tabs[index];
    setActive(tab.id);
    setVisited((previous) => (previous.has(tab.id) ? previous : new Set(previous).add(tab.id)));
    buttons.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const last = tabs.length - 1;
    const target =
      event.key === "ArrowRight"
        ? index === last ? 0 : index + 1
        : event.key === "ArrowLeft"
          ? index === 0 ? last : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;

    if (target === null) return;
    event.preventDefault();
    select(target);
  };

  return (
    <div>
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label={label}
          className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full bg-accent-soft p-1"
        >
          {tabs.map((tab, index) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                ref={(element) => {
                  buttons.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`${id}-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-300 sm:px-4 ${
                  selected ? "bg-bg text-text shadow-sm" : "text-text-muted hover:text-text"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${id}-panel-${tab.id}`}
          aria-labelledby={`${id}-tab-${tab.id}`}
          hidden={tab.id !== active}
          className="mt-8 animate-[rise_320ms_var(--ease-out)_both]"
        >
          {visited.has(tab.id) ? tab.content : null}
        </div>
      ))}
    </div>
  );
}

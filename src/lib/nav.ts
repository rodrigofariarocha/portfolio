import { Blocks, FolderOpen, Home, Mail, Route } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { Dictionary } from "./i18n/dictionaries";

export type NavItem = {
  /** Section id on the home page. Empty string means the top of the page. */
  id: string;
  key: keyof Dictionary["nav"]["tabs"];
  Icon: LucideIcon;
};

/**
 * Five destinations, which is also the ceiling for a comfortable tab bar.
 * They are sections of the home page, not separate routes — only a project
 * gets a page of its own.
 */
export const NAV_ITEMS: NavItem[] = [
  { id: "", key: "home", Icon: Home },
  { id: "work", key: "work", Icon: FolderOpen },
  { id: "journey", key: "journey", Icon: Route },
  { id: "stack", key: "stack", Icon: Blocks },
  { id: "contact", key: "contact", Icon: Mail },
];

/** Absolute, so the nav works identically from a project page. */
export function hrefFor(locale: string, id: string) {
  return id ? `/${locale}#${id}` : `/${locale}`;
}

export const SECTION_IDS = NAV_ITEMS.map((item) => item.id).filter(Boolean);

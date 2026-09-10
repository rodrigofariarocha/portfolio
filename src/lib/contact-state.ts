/**
 * State shared between the contact form and its server action.
 *
 * Lives outside the action module on purpose: a "use server" file may only
 * export async functions, so the types and the initial value cannot sit there.
 */

export type ContactFieldError = "name" | "email" | "message";

/** What the visitor typed, echoed back so a rejected submit doesn't lose it. */
export type ContactValues = { name: string; email: string; message: string };

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      fields: ContactFieldError[];
      reason?: "generic" | "unconfigured";
      values: ContactValues;
    };

export const initialContactState: ContactState = { status: "idle" };

export const emptyContactValues: ContactValues = { name: "", email: "", message: "" };

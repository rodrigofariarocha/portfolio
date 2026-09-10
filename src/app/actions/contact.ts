"use server";

import { Resend } from "resend";

import { site } from "@/content/site";
import type { ContactFieldError, ContactState } from "@/lib/contact-state";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Returns error *keys* rather than messages: the copy lives in the dictionary,
 * so the action stays locale-agnostic and the two never drift apart.
 */
export async function sendContactMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Bots fill every field they find; humans never see this one.
  if ((formData.get("company") as string | null)?.trim()) {
    return { status: "success" };
  }

  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  // React resets the form once the action resolves, so anything we want the
  // visitor to keep has to travel back in the state.
  const values = { name, email, message };

  const fields: ContactFieldError[] = [];
  if (name.length < 2) fields.push("name");
  if (!EMAIL_PATTERN.test(email)) fields.push("email");
  if (message.length < 10) fields.push("message");

  if (fields.length > 0) return { status: "error", fields, values };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: "error", fields: [], reason: "unconfigured", values };
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? site.email,
      replyTo: email,
      subject: `Portfolio — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return { status: "error", fields: [], reason: "generic", values };
    }

    return { status: "success" };
  } catch (error) {
    console.error("[contact] Failed to send message:", error);
    return { status: "error", fields: [], reason: "generic", values };
  }
}

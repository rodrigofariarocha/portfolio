"use client";

import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useActionState } from "react";

import { sendContactMessage } from "@/app/actions/contact";
import {
  emptyContactValues,
  initialContactState,
  type ContactFieldError,
} from "@/lib/contact-state";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const FIELD_CLASS =
  "w-full rounded-xl border border-border-base bg-bg px-4 py-3 text-[15px] text-text placeholder:text-text-faint transition-colors duration-200 focus:border-text-faint aria-invalid:border-red-600 dark:aria-invalid:border-red-400";

export function ContactForm({ labels }: { labels: Dictionary["contact"]["form"] }) {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialContactState,
  );

  const invalid = (field: ContactFieldError) =>
    state.status === "error" && state.fields.includes(field);

  const formError =
    state.status === "error" && state.reason ? labels.errors[state.reason] : null;

  // React clears an uncontrolled form once its action resolves. Feeding the
  // echoed values back in as defaults means a rejected submit doesn't cost the
  // visitor the message they just typed.
  const values = state.status === "error" ? state.values : emptyContactValues;

  return (
    // noValidate: the browser's own bubble would silently block submission on an
    // invalid type="email", so our localized messages would never get to run.
    <form action={formAction} noValidate className="space-y-5">
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label={labels.name}
          placeholder={labels.namePlaceholder}
          autoComplete="name"
          defaultValue={values.name}
          invalid={invalid("name")}
          error={labels.errors.name}
        />
        <Field
          id="email"
          type="email"
          label={labels.email}
          placeholder={labels.emailPlaceholder}
          autoComplete="email"
          defaultValue={values.email}
          invalid={invalid("email")}
          error={labels.errors.email}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="type-label text-text-faint">
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={labels.messagePlaceholder}
          defaultValue={values.message}
          aria-invalid={invalid("message")}
          aria-describedby={invalid("message") ? "message-error" : undefined}
          className={`${FIELD_CLASS} resize-y`}
        />
        {invalid("message") ? (
          <p id="message-error" className="text-[13px] text-red-600 dark:text-red-400">
            {labels.errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 pt-1">
        <button
          type="submit"
          disabled={pending}
          className="pressable group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-medium text-accent-contrast disabled:opacity-60"
        >
          {pending ? (
            <Loader2 aria-hidden className="size-4 animate-spin" />
          ) : (
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 ease-(--ease-out) group-hover:translate-x-0.5"
            />
          )}
          {pending ? labels.submitting : labels.submit}
        </button>

        <p aria-live="polite" className="text-center text-[15px]">
          {state.status === "success" ? (
            <span className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Check aria-hidden className="size-4" />
              {labels.success}
            </span>
          ) : null}
          {formError ? (
            <span className="text-red-600 dark:text-red-400">{formError}</span>
          ) : null}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
  autoComplete,
  defaultValue,
  invalid,
  error,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  defaultValue: string;
  invalid: boolean;
  error: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="type-label text-text-faint">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={invalid}
        aria-describedby={invalid ? `${id}-error` : undefined}
        className={FIELD_CLASS}
      />
      {invalid ? (
        <p id={`${id}-error`} className="text-[13px] text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

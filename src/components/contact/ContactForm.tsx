"use client";

import { useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { BRAND } from "@/lib/constants";

interface FormState {
  status: "idle" | "submitting" | "success" | "error";
  error?: string;
}

const inputStyle =
  "w-full border-b border-paper/15 bg-transparent px-1 py-3.5 text-sm text-paper placeholder:text-paper/30 outline-none transition-colors focus:border-accent";

export default function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ status: "submitting" });

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Replace with your preferred handler (API route, form service, etc.)
    try {
      const href = `mailto:${BRAND.email}?subject=${encodeURIComponent(
        String(data.project || "New project enquiry")
      )}&body=${encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${
          data.company || "n/a"
        }\n\nDetails:\n${data.details || ""}`
      )}`;
      window.location.href = href;
      setState({ status: "success" });
    } catch {
      setState({ status: "error", error: "Something went wrong. Please try again." });
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium text-paper/60">Name</span>
          <input
            required
            name="name"
            type="text"
            placeholder="Your name"
            className={inputStyle}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium text-paper/60">Email</span>
          <input
            required
            name="email"
            type="email"
            placeholder="you@company.com"
            className={inputStyle}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-xs font-medium text-paper/60">Company (optional)</span>
        <input
          name="company"
          type="text"
          placeholder="Company"
          className={inputStyle}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-xs font-medium text-paper/60">What do you need?</span>
        <textarea
          required
          name="details"
          rows={5}
          placeholder="Tell us about your goals, timeline and budget."
          className={`${inputStyle} resize-none`}
        />
      </label>

      <button
        type="submit"
        disabled={state.status === "submitting"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-paper px-8 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-accent hover:text-paper disabled:opacity-60"
      >
        {state.status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
            Sending…
          </>
        ) : state.status === "success" ? (
          <>
            <Check className="h-4 w-4" strokeWidth={2} />
            Message ready
          </>
        ) : (
          "Send message"
        )}
      </button>

      {state.status === "error" && (
        <p className="text-sm text-red-400">{state.error}</p>
      )}
      {state.status === "success" && (
        <p className="text-sm text-paper/50">
          Your email draft has opened. We&apos;ll get back to you shortly.
        </p>
      )}
    </form>
  );
}
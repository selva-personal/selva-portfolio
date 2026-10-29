
"use client";

import { profile } from "@/data/profile";
import { Code, ExternalLink, Mail, Send, MessageSquare } from "lucide-react";
import { type FormEvent, useState } from "react";

type Status = "idle" | "error" | "ready";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setError("Please fill in your name, email, and message.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("ready");
    setError("");
  };

  return (
    <section
      id="contact"
      className="mx-auto w-[min(1120px,calc(100%-2rem))] scroll-mt-28 pb-20 pt-12 sm:pb-28 sm:pt-16"
    >
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
        <span className="h-px w-7 bg-blue-600" />
        Get in Touch
      </p>

      <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
        {profile.contactHeadline}
      </h2>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
        {profile.contactBody}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
              <MessageSquare size={23} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Let&apos;s connect
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Have a project, an opportunity, or an idea to discuss? Reach out
              through email or explore my professional profiles.
            </p>

            <div className="mt-6 space-y-4">
              <a
                className="flex min-w-0 items-center gap-3 text-sm text-slate-700 transition hover:text-blue-700"
                href={`mailto:${profile.email}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-blue-700">
                  <Mail size={17} />
                </span>
                <span className="break-all">{profile.email}</span>
                <ExternalLink size={14} className="ml-auto shrink-0 text-slate-400" />
              </a>

              <a
                className="flex items-center gap-3 text-sm text-slate-700 transition hover:text-blue-700"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-blue-700">
                  <ExternalLink size={17} />
                </span>
                <span>LinkedIn profile</span>
                <ExternalLink size={14} className="ml-auto text-slate-400" />
              </a>

              <a
                className="flex items-center gap-3 text-sm text-slate-700 transition hover:text-blue-700"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-blue-700">
                  <Code size={17} />
                </span>
                <span>GitHub projects</span>
                <ExternalLink size={14} className="ml-auto text-slate-400" />
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
            <p className="text-sm font-semibold text-slate-800">
              Open to meaningful opportunities
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Let&apos;s discuss how my development experience can contribute to
              your team and products.
            </p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_32px_rgba(15,23,42,0.04)] sm:p-7"
          noValidate
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900">
              Send an inquiry
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Complete the form to prepare a message in your email application.
            </p>
          </div>

          <label className="mb-4 block text-sm font-semibold text-slate-700">
            Name
            <input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setStatus("idle");
              }}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              placeholder="Your name"
              autoComplete="name"
              required
            />
          </label>

          <label className="mb-4 block text-sm font-semibold text-slate-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setStatus("idle");
              }}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="mb-5 block text-sm font-semibold text-slate-700">
            Message
            <textarea
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
                setStatus("idle");
              }}
              rows={5}
              className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-normal leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              placeholder="Tell me about your opportunity or project..."
              required
            />
          </label>

          <button
            type="submit"
            className="accent-button w-full sm:w-auto"
          >
            Prepare email
            <Send size={16} />
          </button>

          {status === "error" && (
            <p role="alert" className="mt-4 text-sm text-red-600">
              {error}
            </p>
          )}

          {status === "ready" && (
            <p role="status" className="mt-4 text-sm leading-6 text-blue-700">
              Your email draft has been requested. If your email application
              did not open, please email me directly using the address above.
              This website does not store or send form submissions to a server.
            </p>
          )}

          {status !== "ready" && (
            <p className="mt-4 text-xs leading-5 text-slate-400">
              This form uses your device&apos;s configured email application. It
              does not send or store messages directly on this website.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

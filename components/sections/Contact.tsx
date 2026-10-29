"use client";

import { profile } from "@/data/profile";
import { Code, ExternalLink, Mail } from "lucide-react";
import { FormEvent, useState } from "react";

type Status = "idle" | "error" | "ready";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent) => {
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
    <section id="contact" className="mx-auto mt-28 w-[min(1120px,calc(100%-1.5rem))] pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">Final destination</p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-white sm:text-4xl">
        {profile.contactHeadline}
      </h2>
      <p className="mt-4 max-w-2xl text-slate-300">{profile.contactBody}</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-3 text-sm">
          <a className="flex items-center gap-2 text-cyan-300" href={`mailto:${profile.email}`}>
            <Mail size={16} /> {profile.email}
          </a>
          <a className="flex items-center gap-2 text-slate-200" href={profile.linkedin} target="_blank" rel="noreferrer">
            <ExternalLink size={16} /> linkedin.com/in/selvakumar-dev
          </a>
          <a className="flex items-center gap-2 text-slate-200" href={profile.github} target="_blank" rel="noreferrer">
            <Code size={16} /> github.com/selva-personal
          </a>
        </div>
        <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6" noValidate>
          <label className="block text-sm text-slate-300">
            Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#07091a] px-4 py-3 text-white"
              autoComplete="name"
            />
          </label>
          <label className="block text-sm text-slate-300">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#07091a] px-4 py-3 text-white"
              autoComplete="email"
            />
          </label>
          <label className="block text-sm text-slate-300">
            Message
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#07091a] px-4 py-3 text-white"
            />
          </label>
          <button
            type="submit"
            className="rounded-full bg-linear-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm text-white"
          >
            Open email draft
          </button>
          {status === "error" ? <p className="text-sm text-rose-300">{error}</p> : null}
          {status === "ready" ? (
            <p className="text-sm text-cyan-200">
              This form opens your email client with a prefilled message. Nothing is
              stored on a server.
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              There is no backend on this site. Submitting uses mailto and your local
              email app.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

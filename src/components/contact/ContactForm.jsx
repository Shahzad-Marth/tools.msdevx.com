"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    access_key: "188ac6a8-83f9-4427-b35f-6aaeeebbf0f3",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          message: "",
          access_key: "188ac6a8-83f9-4427-b35f-6aaeeebbf0f3",
        });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand mb-2">
          📬 Contact
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-text">
          Get in <span className="text-brand">Touch</span>
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Have a question, suggestion, or feature request? We&apos;d love to hear
          from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <SectionHeader title="Contact Information" centered={false} />
          <div className="space-y-6 mt-6">
            {contactItems.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center text-brand text-xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-text mb-1">{item.title}</h3>
                  <p className="text-text-muted text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card p-8 rounded-xl border border-border shadow-card">
          {status === "success" ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4" aria-hidden="true">✅</div>
              <h2 className="text-xl font-semibold text-text mb-2">Message Sent!</h2>
              <p className="text-text-muted">Thank you for reaching out. We&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {status === "error" && (
                <div className="mb-5 p-4 bg-soft border border-red-400/50 rounded-lg text-text text-sm" role="alert">
                  Oops! Something went wrong. Please try again.
                </div>
              )}

              <div className="mb-5">
                <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text"
                  placeholder="John Doe"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text"
                  placeholder="john@example.com"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <Button type="submit" className="w-full" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending..." : "Send Message →"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const contactItems = [
  {
    icon: "💡",
    title: "Suggest a Tool",
    description: "Have an idea for a new tool? Let us know and we might just build it!",
  },
  {
    icon: "🐛",
    title: "Report a Bug",
    description: "Found something that's not working correctly? Let us know and we'll fix it.",
  },
  {
    icon: "❓",
    title: "General Inquiry",
    description: "Any other questions? Use the form and we'll get back to you.",
  },
];

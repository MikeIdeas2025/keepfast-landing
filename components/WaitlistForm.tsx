"use client";

import { useState, FormEvent } from "react";
import toast from "react-hot-toast";

interface WaitlistFormProps {
  compact?: boolean;
}

export default function WaitlistForm({ compact = false }: WaitlistFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: name.trim(), 
          email: email.toLowerCase().trim() 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      toast.success("🎉 You're on the waitlist! Check your email for confirmation.");
      setSubmitted(true);
      setName("");
      setEmail("");
    } catch (error: any) {
      console.error("Waitlist submission error:", error);
      toast.error(error.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted && !compact) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
        <p className="text-gray-600">
          We'll send you an email when we're ready to launch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-brand-yellow focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          required
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-brand-yellow focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full btn btn-brand-yellow btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="loading loading-spinner loading-sm"></span>
            Joining...
          </span>
        ) : (
          "Join Waitlist"
        )}
      </button>

      {submitted && compact && (
        <p className="text-sm text-green-600 text-center font-medium">
          ✓ You're on the waitlist!
        </p>
      )}
    </form>
  );
}

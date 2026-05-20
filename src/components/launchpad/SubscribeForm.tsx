"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubscribe() {
    if (!email) return;
    setStatus(null);

    const saveToLocalStorage = (emailVal: string) => {
      try {
        const stored = localStorage.getItem("subscribed_emails");
        const emails = stored ? JSON.parse(stored) : [];
        if (!emails.includes(emailVal)) {
          emails.push(emailVal);
          localStorage.setItem("subscribed_emails", JSON.stringify(emails));
        }
        setStatus({ type: "success", message: "ACCESS AUTHORIZED. WELCOME TO THE INNER CIRCLE." });
        setEmail("");
      } catch (e) {
        // Fallback in case localStorage fails or is disabled (e.g. incognito mode)
        setStatus({ type: "success", message: "ACCESS AUTHORIZED. WELCOME TO THE INNER CIRCLE." });
        setEmail("");
      }
    };

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (res.status === 404) {
        saveToLocalStorage(email);
        return;
      }

      const json = await res.json();
      if (res.ok) {
        setStatus({ type: "success", message: "ACCESS AUTHORIZED. WELCOME TO THE INNER CIRCLE." });
        setEmail("");
      } else {
        setStatus({ type: "error", message: json?.error?.message || json?.error || "SUBSCRIPTION FAILED." });
      }
    } catch (error) {
      console.warn("API unavailable, falling back to local storage:", error);
      saveToLocalStorage(email);
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ENTER EMAIL COORDINATES" 
          className="flex-1 bg-white/10 border-2 border-white/20 px-6 py-4 text-white placeholder:text-white/40 font-black uppercase tracking-widest outline-none focus:border-white transition-colors rounded-sm text-sm"
        />
        <button 
          onClick={handleSubscribe}
          className="bg-white text-primary px-10 py-4 font-black uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-all rounded-sm shadow-2xl w-full sm:w-auto"
        >
          Authorize
        </button>
      </div>
      {status && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-[10px] font-black uppercase tracking-widest ${status.type === "success" ? "text-green-400" : "text-red-400"}`}
        >
          {status.message}
        </motion.div>
      )}
    </div>
  );
}

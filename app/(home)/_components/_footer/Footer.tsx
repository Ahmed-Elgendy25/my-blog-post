"use client";

import type React from "react";
import { useState } from "react";
import MarqueeComponent from "@/app/shared/MarqueeComponent";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="bg-foreground text-background">
      {/* Scrolling Text Banner */}
      <MarqueeComponent text="NEWSLETTER+++" />

      {/* Newsletter Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Title */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              DESIGN NEWS TO
              <br />
              YOUR INBOX
            </h2>
          </div>

          {/* Right Side - Form */}
          <div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 px-6 py-4 bg-background text-foreground border-none outline-none"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-background text-foreground font-medium hover:opacity-80 transition-opacity"
              >
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

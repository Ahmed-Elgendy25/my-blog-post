"use client";

import type React from "react";
import { useState } from "react";

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
      <div className="border-y border-background/20 py-4 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-sm font-medium mx-8">NEWSLETTER+++</span>
          <span className="text-sm font-medium mx-8">NEWSLETTER+++</span>
          <span className="text-sm font-medium mx-8">NEWSLETTER+++</span>
          <span className="text-sm font-medium mx-8">NEWSLETTER+++</span>
          <span className="text-sm font-medium mx-8">NEWSLETTER+++</span>
          <span className="text-sm font-medium mx-8">NEWSLETTER+++</span>
          <span className="text-sm font-medium mx-8">NEWSLETTER+++</span>
          <span className="text-sm font-medium mx-8">NEWSLETTER+++</span>
        </div>
      </div>

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

        {/* Footer Links */}
        <div className="mt-20 pt-12 border-t border-background/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-medium mb-4">FYRRE MAGAZINE</h3>
            </div>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-sm hover:opacity-60 transition-opacity"
              >
                Art
              </a>
              <a
                href="#"
                className="block text-sm hover:opacity-60 transition-opacity"
              >
                Sculptures
              </a>
              <a
                href="#"
                className="block text-sm hover:opacity-60 transition-opacity"
              >
                Street Art
              </a>
            </div>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-sm hover:opacity-60 transition-opacity"
              >
                Magazine
              </a>
              <a
                href="#"
                className="block text-sm hover:opacity-60 transition-opacity"
              >
                Podcast
              </a>
              <a
                href="#"
                className="block text-sm hover:opacity-60 transition-opacity"
              >
                Authors
              </a>
            </div>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-sm hover:opacity-60 transition-opacity"
              >
                Binyville
              </a>
              <a
                href="#"
                className="block text-sm hover:opacity-60 transition-opacity"
              >
                Licensing
              </a>
              <a
                href="#"
                className="block text-sm hover:opacity-60 transition-opacity"
              >
                Changelog
              </a>
            </div>
          </div>

          <div className="mt-12 text-xs text-background/60">
            © Made by Pawel Gola. Powered by Webflow.
          </div>
        </div>
      </div>
    </section>
  );
}

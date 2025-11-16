"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import {
  LinkedinLogo,
  XLogo,
  SignOut,
  SignIn,
  List,
  X as CloseIcon,
} from "@phosphor-icons/react/dist/ssr";
import { clearAuthCookies } from "@/utils/auth/logout";

function Navbar() {
  const [user, setUser] = useState<{
    token?: string;
    userId?: number;
  } | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get cookies on mount
  useEffect(() => {
    const token = getCookie("token");
    const userId = getCookie("userId");

    if (token && userId) {
      try {
        setUser({
          token: String(token),
          userId: parseInt(String(userId)),
        });
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const handleLogOut = () => {
    clearAuthCookies();
    setUser(null);
  };

  const isAuthor = user?.token;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm"
            : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 hover:text-gray-700 transition-colors duration-200"
              >
                STACK STORIES
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <NavLink href="/magazine?page=1">Magazine</NavLink>
              <NavLink href="/podcast">Who Am I</NavLink>
              {isAuthor && (
                <NavLink href="/create-article">Create Article</NavLink>
              )}

              {/* Divider */}
              <div className="w-px h-6 bg-gray-300 mx-3 lg:mx-4"></div>

              {/* Social Links */}
              <SocialLink
                href="https://x.com/shoffaa__"
                icon={<XLogo size={20} weight="regular" />}
                label="X"
              />
              <SocialLink
                href="https://www.linkedin.com/in/ahmed-ashraf-37319522a/"
                icon={<LinkedinLogo size={20} weight="regular" />}
                label="LinkedIn"
              />

              {/* Auth Button */}
              {user ? (
                <button
                  onClick={handleLogOut}
                  className="ml-2 p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                  aria-label="Sign Out"
                >
                  <SignOut size={20} weight="regular" />
                </button>
              ) : (
                <Link
                  href="/signin"
                  className="ml-2 p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                  aria-label="Sign In"
                >
                  <SignIn size={20} weight="regular" />
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <CloseIcon size={24} weight="regular" />
              ) : (
                <List size={24} weight="regular" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-1 bg-white/95 backdrop-blur-md border-t border-gray-100">
            <MobileNavLink
              href="/magazine?page=1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Magazine
            </MobileNavLink>
            <MobileNavLink
              href="/podcast"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Who Am I
            </MobileNavLink>
            {isAuthor && (
              <MobileNavLink
                href="/create-article"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Create Article
              </MobileNavLink>
            )}

            {/* Mobile Social & Auth */}
            <div className="pt-4 mt-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  href="https://x.com/shoffaa__"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  aria-label="X"
                >
                  <XLogo size={22} weight="regular" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/ahmed-ashraf-37319522a/"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <LinkedinLogo size={22} weight="regular" />
                </Link>
              </div>

              {user ? (
                <button
                  onClick={() => {
                    handleLogOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  <SignOut size={20} weight="regular" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  href="/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  <SignIn size={20} weight="regular" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}

// Desktop Nav Link Component
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative px-3 lg:px-4 py-2 text-sm lg:text-base font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
    >
      {children}
      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gray-900 transform -translate-x-1/2 group-hover:w-3/4 transition-all duration-300 ease-out"></span>
    </Link>
  );
}

// Social Link Component
function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </Link>
  );
}

// Mobile Nav Link Component
function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
    >
      {children}
    </Link>
  );
}

export default Navbar;

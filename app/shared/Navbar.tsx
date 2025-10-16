"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import {
  LinkedinLogo,
  XLogo,
  SignOut,
  SignIn,
} from "@phosphor-icons/react/dist/ssr";
import { clearAuthCookies } from "@/utils/auth/logout";

function Navbar() {
  const [user, setUser] = useState<{
    token?: string;
    roles?: string[];
    userId?: number;
  } | null>(null);

  // Get cookies on mount
  useEffect(() => {
    const token = getCookie("token");
    const roles = getCookie("roles");
    const userId = getCookie("userId");

    if (token && roles && userId) {
      try {
        setUser({
          token: String(token),
          roles: JSON.parse(String(roles)),
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
    setUser(null); // instantly reflect logout
  };

  const isAuthor = user?.roles?.includes("author");

  return (
    <header className="mx-3 md:container md:mx-auto p-3 border-b text-[#222] md:flex md:justify-between md:items-center">
      <h2 className="text-2xl font-bold">
        <Link href="/">STACK STORIES</Link>
      </h2>

      <nav className="w-1/2 p-2 md:block hidden">
        <ul className="list-none">
          <div className="flex text-[1.3rem] font-light justify-end gap-x-10 items-center">
            <div className="flex gap-x-5">
              <li>
                <Link href="/magazine?page=1">Magazine</Link>
              </li>
              <li>
                <Link href="/podcast">Who Am I</Link>
              </li>

              {isAuthor && (
                <li>
                  <Link href="/create-article">Create Article</Link>
                </li>
              )}
            </div>

            <div className="w-5 h-[1px] bg-black"></div>

            <div className="flex gap-x-3 items-center">
              <Link href={"https://x.com/shoffaa__"}>
                <XLogo size={22} />
              </Link>
              <Link
                href={"https://www.linkedin.com/in/ahmed-ashraf-37319522a/"}
              >
                <LinkedinLogo size={22} />
              </Link>

              {user ? (
                <SignOut
                  size={22}
                  className="cursor-pointer"
                  onClick={handleLogOut}
                />
              ) : (
                <Link href="/signin" title="Sign In">
                  <SignIn size={22} />
                </Link>
              )}
            </div>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

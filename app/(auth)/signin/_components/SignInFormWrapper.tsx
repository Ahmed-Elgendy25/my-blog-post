"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signIn, type SignInState } from "../_actions/auth";
import { setCookiesAndRedirect } from "../_actions/cookies";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const initialState: SignInState = {
  error: undefined,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full h-12 bg-black hover:bg-black/90"
      disabled={pending}
    >
      {pending ? "Logging in..." : "Login"}
    </Button>
  );
}

export default function SignInFormWrapper() {
  const [state, formAction] = useActionState(signIn, initialState);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state.success && state.data) {
      // Use server action to set cookies and redirect
      setCookiesAndRedirect(
        state.data.token,
        state.data.roles,
        state.data.userId,
      );
    }
  }, [state]);

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Brand */}
        <div className="space-y-2">
          <h1 className="text-4xl tracking-tight font-bold">STACK</h1>
          <h1 className="text-4xl tracking-tight font-bold">STORIES</h1>
          <p className="text-muted-foreground mt-4">
            Welcome back! Please login to your account.
          </p>
        </div>

        {/* Error Message */}
        {state.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="text-sm text-center font-medium">{state.error}</p>
          </div>
        )}

        {/* Login Form */}
        <form action={formAction} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="pl-11 h-12 bg-blue-50/50 border-blue-100 focus:bg-blue-50 focus:border-blue-300"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="pl-11 pr-11 h-12 bg-blue-50/50 border-blue-100 focus:bg-blue-50 focus:border-blue-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300"
              />
              <label
                htmlFor="remember"
                className="text-sm cursor-pointer select-none font-normal"
              >
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm hover:underline font-normal"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <SubmitButton />

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-muted-foreground font-normal">
              Don&apos;t have an account?{" "}
            </span>
            <Link href="/signup" className="hover:underline font-medium">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

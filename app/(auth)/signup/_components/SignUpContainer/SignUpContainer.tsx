"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  EyeOff,
  Upload,
  User,
  Mail,
  Lock,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import useSignUpForm from "../../_hooks/useSignUpForm";
import signupSubmit from "../../_actions/SignupSubmission";
import { SignupFormFields } from "../../_schema/SignupSchema";

function SignUpContainer() {
  const { register, handleSubmit, errors, reset } = useSignUpForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const onSubmit = async (data: SignupFormFields) => {
    // Prepare data with isAuthor state
    const submissionData = {
      ...data,
      role: isAuthor ? ["author"] : ["user"],
    };

    const result = await signupSubmit(submissionData);
    if (result.success) {
      reset();
      setShowPassword(false);
      setShowConfirmPassword(false);
      setIsAuthor(false);
      setProfileImageFile(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full col-span-12 lg:col-span-6 flex items-center justify-center p-4 sm:p-8 bg-white overflow-y-auto min-h-screen">
      <div className="w-full max-w-2xl space-y-8 py-8">
        {/* Logo/Brand */}
        <div className="space-y-2">
          <h1 className="text-4xl tracking-tight" style={{ fontWeight: 700 }}>
            STACK
          </h1>
          <h1 className="text-4xl tracking-tight" style={{ fontWeight: 700 }}>
            STORIES
          </h1>
          <p className="text-muted-foreground mt-4">
            Create your account and start sharing your developer journey.
          </p>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email & First Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="pl-11 h-12 bg-blue-50/50 border-blue-100 focus:bg-blue-50 focus:border-blue-300"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  {...register("firstName")}
                  className="pl-11 h-12 bg-blue-50/50 border-blue-100 focus:bg-blue-50 focus:border-blue-300"
                />
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </div>

          {/* Last Name & Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  {...register("lastName")}
                  className="pl-11 h-12 bg-blue-50/50 border-blue-100 focus:bg-blue-50 focus:border-blue-300"
                />
              </div>
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  {...register("password")}
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
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Confirm Password & LinkedIn */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  {...register("confirmPassword")}
                  className="pl-11 pr-11 h-12 bg-blue-50/50 border-blue-100 focus:bg-blue-50 focus:border-blue-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="linkedin"
                  type="text"
                  placeholder="linkedin.com/in/username"
                  {...register("linkedinProfile")}
                  className="pl-11 h-12 bg-blue-50/50 border-blue-100 focus:bg-blue-50 focus:border-blue-300"
                />
              </div>
              {errors.linkedinProfile && (
                <p className="text-red-500 text-sm">
                  {errors.linkedinProfile.message}
                </p>
              )}
            </div>
          </div>

          {/* Twitter & Instagram */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter Profile</Label>
              <div className="relative">
                <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="twitter"
                  type="text"
                  placeholder="@username"
                  {...register("twitterProfile")}
                  className="pl-11 h-12 bg-blue-50/50 border-blue-100 focus:bg-blue-50 focus:border-blue-300"
                />
              </div>
              {errors.twitterProfile && (
                <p className="text-red-500 text-sm">
                  {errors.twitterProfile.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram Profile</Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="instagram"
                  type="text"
                  placeholder="@username"
                  {...register("instagramProfile")}
                  className="pl-11 h-12 bg-blue-50/50 border-blue-100 focus:bg-blue-50 focus:border-blue-300"
                />
              </div>
              {errors.instagramProfile && (
                <p className="text-red-500 text-sm">
                  {errors.instagramProfile.message}
                </p>
              )}
            </div>
          </div>

          {/* Author Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="author"
              checked={isAuthor}
              onCheckedChange={(checked) => setIsAuthor(checked as boolean)}
            />
            <label
              htmlFor="author"
              className="cursor-pointer select-none"
              style={{ fontWeight: 400 }}
            >
              Register as an Author
            </label>
          </div>

          {/* Upload Profile Image */}
          <div className="space-y-3">
            <Label>Profile Image</Label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                {...register("profileImage")}
                onChange={(e) => {
                  handleImageUpload(e);
                  // Also update the form register
                  const target = e.target as HTMLInputElement;
                  if (target.files) {
                    register("profileImage").onChange(e);
                  }
                }}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="h-12 border-gray-300 hover:bg-gray-50"
                onClick={() => document.getElementById("profileImage")?.click()}
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Profile Image
              </Button>
              {profileImageFile && (
                <span className="text-sm text-muted-foreground">
                  {profileImageFile.name}
                </span>
              )}
            </div>
          </div>

          {/* Sign Up Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-black hover:bg-black/90"
          >
            Sign Up
          </Button>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-muted-foreground" style={{ fontWeight: 400 }}>
              Already have an account?{" "}
            </span>
            <a
              href="/signin"
              className="hover:underline"
              style={{ fontWeight: 500 }}
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpContainer;

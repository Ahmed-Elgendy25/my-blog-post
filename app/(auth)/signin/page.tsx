import SignInContainer from "./_components/SignInContainer";
import RightSide from "./_components/RightSide";

export default async function Page() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <SignInContainer />

      {/* Right side - 3D Background */}
      <RightSide />
    </div>
  );
}

import RightSide from "./_components/RightSide";
import SignUpContainer from "./_components/SignUpContainer/SignUpContainer";

function page() {
  return (
    <div className="min-h-screen">
      <main className="min-h-screen grid grid-cols-12">
        <SignUpContainer />
        <RightSide />
      </main>
    </div>
  );
}

export default page;

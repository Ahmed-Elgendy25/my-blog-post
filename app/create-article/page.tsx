import { verifySession } from "@/dal";
import EditorWrapper from "./_components/EditorWrapper";

async function page() {
  const session = await verifySession();
  if (!session) return null;
  return <EditorWrapper />;
}

export default page;

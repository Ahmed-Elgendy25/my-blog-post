import { verifySession } from "@/dal";
import EditorWrapper from "./_components/EditorWrapper";


async function page() {
  const session = await verifySession()
  if (!session) return null
    return (
        <main className=' flex lg:flex-row  flex-col gap-x-3'>
          <EditorWrapper/>
        </main>
    );
}

export default page;

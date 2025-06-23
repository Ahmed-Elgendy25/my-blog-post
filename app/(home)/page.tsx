
import { verifySession } from "@/dal";
import MainComponent from "./_components/MainComponent";


export default async function Home() {
  const session = await verifySession()
  if (!session) return null
  return <>
      <MainComponent/>
  </>
      
  
}

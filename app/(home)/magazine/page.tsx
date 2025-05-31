import HeadingComponent from "@/app/shared/HeadingComponent"
import MagazineGrid from "./_components/MagazineGrid"
import { verifySession } from "@/dal"

async function page() {
  const session = await verifySession()
  if (!session) return null
  return (
    <div>
    <HeadingComponent title="MAGAZINE" headingStyle="text-center  font-bold  text-[#222222]  " overrideStyle={false} inlineStyle={{fontSize: '12vw'}}/>

      <MagazineGrid/>
    </div>
  )
}

export default page
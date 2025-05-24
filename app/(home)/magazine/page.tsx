import HeadingComponent from "@/app/shared/HeadingComponent"
import MagazineGrid from "./_components/MagazineGrid"

function page() {
  return (
    <div>
    <HeadingComponent title="MAGAZINE" headingStyle="text-center  font-bold  text-[#222222]  " overrideStyle={false} inlineStyle={{fontSize: '12vw'}}/>

      <MagazineGrid/>
    </div>
  )
}

export default page
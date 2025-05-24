import InputComponent from "@/app/shared/InputComponent";
import FooterStyles from "./_styles/Footer.module.css";
import ButtonComponent from "@/app/shared/ButtonComponent";

function Footer() {
  return (
    <footer className="bg-black  text-[#E7E8E2] py-12">
        <div className="container mx-auto">
            <div className="md:flex-row flex-col flex justify-between items-center  ">
                <div className="w-2/3 p-5">
                    <h2 className={`${FooterStyles.title}`}>
                        TECH NEWS TO YOUR INBOX
                    </h2>
                </div>
                <div className="min-w-1/3  flex gap-x-2 p-5">
                <InputComponent
                 input={<input
                 type="email"
                 placeholder="Enter your email"
                 className="bg-[#E7E8E2] text-[#222222] placeholder:text-[#222222] placeholder:font-medium  outline-none p-5 min-w-2/3 "
                />
                }/>
                <ButtonComponent type="submit" overrideStyle={false} style="bg-[#E7E8E2] text-[#222222] font-medium cursor-pointer  py-5 px-10 border-0 ">
                    Subscribe
                </ButtonComponent>
                </div>
            </div>
        </div>

    </footer>
  )
}

export default Footer
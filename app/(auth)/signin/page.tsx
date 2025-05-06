import FormComponent from '../_components/FormComponent';
import RightSideImage from '../_components/RightSideImage';
import LeftColGrid from '../_components/LeftColGrid';
import RightColGrid from '../_components/RightColGrid';
import SectionComponent from '../_components/SectionComponent';
import InputComponent from '../_components/InputComponent';
import ButtonComponent from '../_components/ButtonComponent';
import Link from 'next/link';
function page() {
    return (
        <div className='mx-auto container'>
            <main className="p-4 h-screen  min-w-full grid grid-cols-12">

                <LeftColGrid>
                    <FormComponent style=' flex flex-col h-1/2 w-full items-center p-5' serverAction='' sectionComponent={  <SectionComponent style='text-center mt-5'>
                    <p>Don&apos;t have an account? <Link href={'/signup'} className="text-[#222222] font-semibold cursor-pointer hover:text-[#222222]/50 transition-all duration-300">Sign Up</Link></p>
            </SectionComponent>
              }>
                    <SectionComponent style='w-3/4 my-10'>
                        <InputComponent  input={<input type="email" placeholder="Email" className={` bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5`}/>}/>
                    </SectionComponent>
            
                    <SectionComponent style='w-3/4'>
                    <InputComponent input={<input type="password" placeholder="Password" className={` bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5`}/>}/>
                    </SectionComponent>

                    <SectionComponent style='w-3/4 mt-10'>
                        <ButtonComponent type="submit" >Login</ButtonComponent>
                    </SectionComponent>
              
                    </FormComponent>


                </LeftColGrid>
                    <RightColGrid>
                        <RightSideImage/>
                    </RightColGrid>

            </main>
        </div>

    );
}

export default page;

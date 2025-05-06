'use client'

import FormComponent from '../_components/FormComponent';
import RightSideImage from '../_components/RightSideImage';
import LeftColGrid from '../_components/LeftColGrid';
import RightColGrid from '../_components/RightColGrid';
import SectionComponent from '../_components/SectionComponent';
import InputComponent from '../_components/InputComponent';
import ButtonComponent from '../_components/ButtonComponent';
function page() {
    return (
        <div className='mx-auto container'>
            <main className="  min-w-full grid grid-cols-12">
                <LeftColGrid>
                    <FormComponent style='p-5 flex flex-wrap gap-x-15   items-center content-center   bg-purple-300 ' serverAction='' >
                    <SectionComponent style='w-1/2 mt-5 '>
                        <InputComponent input={<input  
                        type="email" 
                        name="email"
                         placeholder="email" 
                         className={` bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5`}/> }/>
                    </SectionComponent>
                    <SectionComponent style='w-1/3 mt-5'>
                        <InputComponent input={
                            <input  type="text" name="firstname" placeholder="firstname" className={` bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5`}/>
                        }/>
                    </SectionComponent>
                    <SectionComponent style='w-1/2 mt-5'>
                        <InputComponent  input={
                            <input  type="text" name="lastname" placeholder="lastname" className={` bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5`}/>
                        }/>
                    </SectionComponent>

                    <SectionComponent style='w-1/3 mt-5'>
                    <InputComponent  input={
                        <input  type="password" name="password" placeholder="password" className={` bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5`}/>
                    }/>
                    </SectionComponent>

                    <SectionComponent style='w-1/2 mt-5'>
                    <InputComponent  input={
                        <input  type="password" name="confirmpassword" placeholder="confirmpassword" className={` bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5`}/>
                    }/>
                    </SectionComponent>

                    <SectionComponent style='w-1/3 mt-5 flex px-4 justify-between'>

                    <div>
                    <label htmlFor='user' className="font-medium">User</label>
                    <InputComponent  input={<input type="radio"   id='user' value='user' className={` bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5`}/>}/>
                    </div>
                   
                    <div>
                    <label htmlFor='author' className="font-medium ">Author</label>
                    <InputComponent input={<input type="radio"  id='author' value='author' className={` bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5`}/>}/>
                    </div>
                   </SectionComponent>
                   
                    <SectionComponent style=' w-1/2 mt-5 '>
                    <label htmlFor='profileimage' className="font-medium ">Profile Image</label>
                   
                    <InputComponent input={<input id='profileimage' placeholder='Upload' name='profileimage'  type="file" className={`  bg-none bg-[#222222] mt-1 text-[#e7e8e2] cursor-pointer min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-2 hover:bg-[#222222]/40 transition-all duration-300`}/>}/>

                    
                   </SectionComponent>

            

                    <SectionComponent style='w-3/4 mt-10 mx-auto'>
                        <ButtonComponent type="submit" >Sign Up</ButtonComponent>
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

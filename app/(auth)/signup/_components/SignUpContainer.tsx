'use client'
import LeftColGrid from "../../_components/LeftColGrid";
import FormComponent from "../../_components/FormComponent";
import SectionComponent from "../../_components/SectionComponent";
import InputComponent from "../../_components/InputComponent";
import ButtonComponent from "../../_components/ButtonComponent";
import useSignUpForm from "../_hooks/useSignUpForm";

function SignUpContainer({serverAction}: {serverAction: (formData: FormData) => void | Promise<void>}) {

    const {formData,handleChange} = useSignUpForm();
  return  <>
    <LeftColGrid>
        <FormComponent style='p-5 flex flex-wrap gap-x-15   items-center content-center' serverAction={serverAction} >
        <SectionComponent style='md:w-1/2 w-full mt-5 '>
            <InputComponent input={<input  
            type="email" 
            name="email"
            onChange={handleChange}
             placeholder="email" 
             className={` bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5`}/> }/>
        </SectionComponent>
        <SectionComponent style='md:w-1/3 w-full mt-5'>
            <InputComponent input={
                <input  type="text" name="firstname" onChange={handleChange} placeholder="firstname" className={` bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5`}/>
            }/>
        </SectionComponent>
        <SectionComponent style='md:w-1/2 w-full mt-5'>
            <InputComponent  input={
                <input  type="text" name="lastname" onChange={handleChange} placeholder="lastname" className={` bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5`}/>
            }/>
        </SectionComponent>

        <SectionComponent style='md:w-1/3 w-full mt-5'>
        <InputComponent  input={
            <input  type="password" name="password"onChange={handleChange} placeholder="password" className={` bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5`}/>
        }/>
        </SectionComponent>

        <SectionComponent style='md:w-1/2 w-full mt-5'>
        <InputComponent  input={
            <input  type="password" name="confirmpassword" onChange={handleChange} placeholder="confirmpassword" className={` bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5`}/>
        }/>
        </SectionComponent>

        <SectionComponent style='md:w-1/3 w-full mt-5 flex px-4 justify-between'>

        <div>
        <label htmlFor='user' className="font-medium">User</label>
        <InputComponent  input={<input type="checkbox" name="role" onChange={handleChange} id='user' value='user' className={` bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5`}/>}/>
        </div>
       
        <div>
        <label htmlFor='author' className="font-medium ">Author</label>
        <InputComponent input={<input type="checkbox" name="role" onChange={handleChange} id='author' value='author' className={` bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5`}/>}/>
        </div>
       </SectionComponent>
       
        <SectionComponent style='md:w-1/2 w-full mt-5 '>
        <label
            htmlFor="profileimage"
            className="bg-[#222222] mt-2 text-[#e7e8e2] cursor-pointer min-w-full p-5 rounded-2xl flex justify-center items-center">
            {formData.profileimage ? formData.profileimage.name : 'Upload Profile Image'}
        </label>
       
        <InputComponent input={<input id='profileimage' onChange={handleChange} placeholder='Upload' name='profileimage' style={{ display: 'none' }} type="file" />}/>

        
       </SectionComponent>



        <SectionComponent style='w-full mt-10'>
            <ButtonComponent type="submit" >Sign Up</ButtonComponent>
        </SectionComponent>
  
        </FormComponent>
    </LeftColGrid>
    </>
  
}

export default SignUpContainer
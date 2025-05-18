'use server'

import LeftColGrid from '../../_components/LeftColGrid'
import SectionComponent from '../../_components/SectionComponent'
import InputComponent from '../../_components/InputComponent'
import Link from 'next/link'
import ButtonComponent from '../../../shared/ButtonComponent'
import SignInForm from './SignInForm'

 export default async function SignInContainer({
  serverAction
}: {
  serverAction: (formData: FormData) => Promise<void>
}) {
  return (
    <LeftColGrid>
      <SignInForm 
        style='flex flex-col h-1/2 w-full items-center p-5' 
        formAction={serverAction}   
        sectionComponent={
          <SectionComponent style='text-center mt-5'>
            <p>Don&apos;t have an account? <Link href={'/signup'} className="text-[#222222] font-semibold cursor-pointer hover:text-[#222222]/50 transition-all duration-300">Sign Up</Link></p>
          </SectionComponent>
        }
      >
        <SectionComponent style='w-3/4 my-10'>
          <InputComponent input={
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              className="bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5"
            />
          }/>
        </SectionComponent>

        <SectionComponent style='w-3/4'>
          <InputComponent input={
            <input 
              type="password"
              name="password" 
              placeholder="Password" 
              className="bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5"
            />
          }/>
        </SectionComponent>

        <SectionComponent style='w-3/4 mt-10'>
          <ButtonComponent type="submit" overrideStyle={true} style="min-w-full">Login</ButtonComponent>
        </SectionComponent>
      </SignInForm>
    </LeftColGrid>
  )
}


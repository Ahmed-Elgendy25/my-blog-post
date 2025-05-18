'use client'
import LeftColGrid from "../../../_components/LeftColGrid";
import SectionComponent from "../../../_components/SectionComponent";
import InputComponent from "../../../_components/InputComponent";
import ButtonComponent from "../../../../shared/ButtonComponent";
import useSignUpForm from "../../_hooks/useSignUpForm";
import signupSubmit from "../../_actions/SignupSubmission";
import SignUpForm from "../SignUpForm/SignUpForm";
import { SignupFormFields } from "../../_schema/SignupSchema";

function SignUpContainer() {
  const { register, handleSubmit, errors, reset } = useSignUpForm();
  
  const onSubmit = async (data: SignupFormFields) => {
    const result = await signupSubmit(data);
    if (result.success) {
      reset();
    }
  };

  return (
    <LeftColGrid>
      <SignUpForm style='p-5 flex flex-wrap gap-x-15 items-center content-center' submit={handleSubmit(onSubmit)}>
        <SectionComponent style='md:w-1/2 w-full mt-5'>
          {errors.email && <div className="text-red-500 font-medium text-sm w-auto">{errors.email.message}</div>}
          <InputComponent input={
            <input
              type="email"
              {...register('email')}
              placeholder="email"
              className="bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5"
            />
          }/>
        </SectionComponent>

        <SectionComponent style='md:w-1/3 w-full mt-5'>
          {errors.firstName && <div className="text-red-500 font-medium text-sm w-auto">{errors.firstName.message}</div>}
          <InputComponent input={
            <input
              type="text"
              {...register('firstName')}
              placeholder="firstname"
              className="bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5"
            />
          }/>
        </SectionComponent>

        <SectionComponent style='md:w-1/2 w-full mt-5'>
          {errors.lastName && <div className="text-red-500 font-medium text-sm w-auto">{errors.lastName.message}</div>}
          <InputComponent input={
            <input
              type="text"
              {...register('lastName')}
              placeholder="lastname"
              className="bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5"
            />
          }/>
        </SectionComponent>

        <SectionComponent style='md:w-1/3 w-full mt-5'>
          {errors.password && <div className="text-red-500 font-medium text-sm w-auto">{errors.password.message}</div>}
          <InputComponent input={
            <input
              type="password"
              {...register('password')}
              placeholder="password"
              className="bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5"
            />
          }/>
        </SectionComponent>

        <SectionComponent style='md:w-1/2 w-full mt-5'>
          {errors.confirmPassword && <div className="text-red-500 font-medium text-sm w-auto">{errors.confirmPassword.message}</div>}
          <InputComponent input={
            <input
              type="password"
              {...register('confirmPassword')}
              placeholder="confirmpassword"
              className="bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5"
            />
          }/>
        </SectionComponent>

        <SectionComponent style='md:w-1/3 w-full mt-5'>
          {errors.role && <div className="text-red-500 font-medium text-sm w-auto">{errors.role.message}</div>}
          <div className="md:w-1/3 w-full flex justify-between">
            <div className="flex flex-col justify-center items-center p-5 min-w-auto">
              <label htmlFor='user' className="font-medium">User</label>
              <InputComponent input={<input type="checkbox" {...register('role')} id='user' value='user' className="bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5"/>}/>
            </div>
            <div className="flex flex-col justify-center items-center p-5 min-w-auto">
              <label htmlFor='author' className="font-medium">Author</label>
              <InputComponent input={<input type="checkbox" {...register('role')} id='author' value='author' className="bg-none min-w-full placeholder:text-[#222222] placeholder:font-medium border-b-[1.9px] border-b-[#222222]/50 outline-none p-5"/>}/>
            </div>
          </div>
        </SectionComponent>

        <SectionComponent style='md:w-1/2 w-full mt-5'>
          <label
            htmlFor="profileimage"
            className="bg-[#222222] mt-2 text-[#e7e8e2] cursor-pointer min-w-full p-5 rounded-2xl flex justify-center items-center">
            Upload Profile Image
          </label>
          <InputComponent input={<input id='profileimage' {...register('profileImage')} placeholder='Upload' style={{ display: 'none' }} type="file" />}/>
        </SectionComponent>

        <SectionComponent style='w-full mt-10'>
          <ButtonComponent type="submit" overrideStyle={true} style="min-w-full">Sign Up</ButtonComponent>
        </SectionComponent>
        
      </SignUpForm>
    </LeftColGrid>
  );
}

export default SignUpContainer;
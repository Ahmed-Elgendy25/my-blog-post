'use client'
import LeftColGrid from "../../../_components/LeftColGrid";
import SectionComponent from "../../../_components/SectionComponent";
import InputComponent from "../../../../shared/InputComponent";
import ButtonComponent from "../../../../shared/ButtonComponent";
import useSignUpForm from "../../_hooks/useSignUpForm";
import signupSubmit from "../../_actions/SignupSubmission";
import SignUpForm from "../SignUpForm/SignUpForm";
import { SignupFormFields } from "../../_schema/SignupSchema";

function SignUpContainer() {
  const { register, handleSubmit, errors, reset } = useSignUpForm();

  const onSubmit = async (data: SignupFormFields) => {
    const result = await signupSubmit(data);
    if (result.success) reset();
  };

  return (
    <LeftColGrid>
      <SignUpForm 
        style="p-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-start" 
        submit={handleSubmit(onSubmit)}
      >
        {/* Email */}
        <SectionComponent>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          <InputComponent input={
            <input 
              type="email"
              {...register('email')}
              placeholder="Email"
              className="w-full border-b-2 border-[#222]/50 p-5 placeholder:font-medium outline-none"
            />
          }/>
        </SectionComponent>

        {/* First Name */}
        <SectionComponent>
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          <InputComponent input={
            <input 
              type="text"
              {...register('firstName')}
              placeholder="First Name"
              className="w-full border-b-2 border-[#222]/50 p-5 placeholder:font-medium outline-none"
            />
          }/>
        </SectionComponent>

        {/* Last Name */}
        <SectionComponent>
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          <InputComponent input={
            <input 
              type="text"
              {...register('lastName')}
              placeholder="Last Name"
              className="w-full border-b-2 border-[#222]/50 p-5 placeholder:font-medium outline-none"
            />
          }/>
        </SectionComponent>

        {/* Password */}
        <SectionComponent>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          <InputComponent input={
            <input 
              type="password"
              {...register('password')}
              placeholder="Password"
              className="w-full border-b-2 border-[#222]/50 p-5 placeholder:font-medium outline-none"
            />
          }/>
        </SectionComponent>

        {/* Confirm Password */}
        <SectionComponent>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          <InputComponent input={
            <input 
              type="password"
              {...register('confirmPassword')}
              placeholder="Confirm Password"
              className="w-full border-b-2 border-[#222]/50 p-5 placeholder:font-medium outline-none"
            />
          }/>
        </SectionComponent>

        {/* LinkedIn */}
        <SectionComponent>
          {errors.linkedinProfile && <p className="text-red-500 text-sm">{errors.linkedinProfile.message}</p>}
          <InputComponent input={
            <input 
              type="text"
              {...register('linkedinProfile')}
              placeholder="LinkedIn Profile"
              className="w-full border-b-2 border-[#222]/50 p-5 placeholder:font-medium outline-none"
            />
          }/>
        </SectionComponent>

        {/* Twitter */}
        <SectionComponent>
          {errors.twitterProfile && <p className="text-red-500 text-sm">{errors.twitterProfile.message}</p>}
          <InputComponent input={
            <input 
              type="text"
              {...register('twitterProfile')}
              placeholder="Twitter Profile"
              className="w-full border-b-2 border-[#222]/50 p-5 placeholder:font-medium outline-none"
            />
          }/>
        </SectionComponent>

        {/* Instagram */}
        <SectionComponent>
          {errors.instagramProfile && <p className="text-red-500 text-sm">{errors.instagramProfile.message}</p>}
          <InputComponent input={
            <input 
              type="text"
              {...register('instagramProfile')}
              placeholder="Instagram Profile"
              className="w-full border-b-2 border-[#222]/50 p-5 placeholder:font-medium outline-none"
            />
          }/>
        </SectionComponent>

        {/* Role Selection - full width */}
        <SectionComponent style="col-span-1 md:col-span-2">
          {errors.role && <p className="text-red-500 text-sm mb-2">{errors.role.message}</p>}
          <div className="flex flex-wrap justify-center gap-8">
            {['user', 'author'].map(role => (
              <label key={role} className="flex items-center gap-2 font-medium">
                <input 
                  type="checkbox" 
                  {...register('role')} 
                  value={role}
                  className="accent-[#222]"
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            ))}
          </div>
        </SectionComponent>

        {/* Profile Image */}
        <SectionComponent>
        <label 
  htmlFor="profileimage"
  className="bg-[#222] text-[#e7e8e2] cursor-pointer min-w-full inline-block p-5 rounded-2xl text-center"
>
  Upload Profile Image
</label>

          <InputComponent input={
            <input 
              id="profileimage" 
              {...register('profileImage')} 
              type="file" 
              style={{ display: 'none' }} 
            />
          }/>
        </SectionComponent>

        {/* Submit button full width */}
        <SectionComponent style="col-span-1 md:col-span-2">
          <ButtonComponent type="submit" overrideStyle={true} style="w-full">Sign Up</ButtonComponent>
        </SectionComponent>

      </SignUpForm>
    </LeftColGrid>
  );
}

export default SignUpContainer;

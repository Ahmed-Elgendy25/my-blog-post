'use client'
import { useForm } from "react-hook-form";
import { SignupFormFields, SignupSchema } from "../_schema/SignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";



function useSignUpForm() {
  
    const {register,handleSubmit,formState:{errors},reset} = useForm<SignupFormFields>({
        defaultValues:{
            role:[]
        },
        resolver:zodResolver(SignupSchema)
    });



    return {register,handleSubmit,errors,reset   }



}

export default useSignUpForm
    







/*

'use client'
import React, { useState } from "react"

type FormDataTyped = {
        email:string;
        firstname:string;
        lastname:string;
        password:string;
        confirmpassword:string;
        role:string[],
        profileimage: File | null
}

function useSignUpForm() {
    const [formData,setFormData] = useState<FormDataTyped>({
    
        email:'',
        firstname:'',
        lastname:'',
        password:'',
        confirmpassword:'',
        role:[],
        profileimage:null
    })
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files, checked } = e.target;
        
        if (type === 'file' && files && files.length > 0) {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0]
            }));
        } else if (type === 'checkbox') {
            // Handle checkbox inputs (for roles)
            if (checked) {
                setFormData((prev) => ({
                    ...prev,
                    role: [...prev.role, value]
                }));
            } else {
                setFormData((prev) => ({
                    ...prev,
                    role: prev.role.filter(role => role !== value)
                }));
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
        
        setFormData({  email:'',
            firstname:'',
            lastname:'',
            password:'',
            confirmpassword:'',
            role:[],
            profileimage:null})
        console.log(files);
    };


    return {
        formData,
        handleChange
    }



}

export default useSignUpForm
    
*/
import RightSideImage from '../_components/RightSideImage';
import RightColGrid from '../_components/RightColGrid';

import SignUpContainer from './_components/SignUpContainer/SignUpContainer';
function page() {
    // async function createPost(formData: FormData) {
    //     'use server'
    //     const firstname = formData.get('firstname')
    //     const lastname = formData.get('lastname')
    //     const email = formData.get('email')
    //     const password = formData.get('password')
    //     const confirmpassword = formData.get('confirmpassword')
        
    //     // Get all roles from the form data
    //     const roles = formData.getAll('role')
        
    //     const profileimage = formData.get('profileimage')

    //     console.log(firstname, lastname, email, password, confirmpassword, roles, profileimage);
        
    //     // Process the form data here
    //     // Don't return a string value
    //   }
    return (
        //Todo:
        // Fix the responsive of the right grid image
        //  Don't forget to make it controlled "Hooks & states" (DONE)
        //  Make the form submission Actions (DONE)
        //  Add Zod validation for form
        //  Make an API Request and test
        <div className='mx-auto container'>
            <main className="  min-w-full grid grid-cols-12">
               <SignUpContainer />
                <RightColGrid >
                        <RightSideImage/>
                </RightColGrid>

            </main>
        </div>

    );
}

export default page;

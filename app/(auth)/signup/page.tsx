import RightSideImage from '../_components/RightSideImage';
import RightColGrid from '../_components/RightColGrid';

import SignUpContainer from './_components/SignUpContainer/SignUpContainer';
function page() {
 
    return (
        //Todo:
        // Fix the responsive of the right grid image
        //  Don't forget to make it controlled "Hooks & states" (DONE)
        //  Make the form submission Actions (DONE)
        //  Add Zod validation for form (DONE)
        //  Make an API Request and test (DONE)
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

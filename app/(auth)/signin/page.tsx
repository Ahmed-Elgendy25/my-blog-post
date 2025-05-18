import RightSideImage from '../_components/RightSideImage';
import RightColGrid from '../_components/RightColGrid';
import SignInContainer from './_components/SignInContainer';
import { signIn } from './_actions/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export  default async function Page() {

    const signInAction = async (formData: FormData) => {
        'use server'
        const result = await signIn(formData);
        if(result) {
            const cookieStore =await cookies();
            cookieStore.set('token', JSON.stringify(result.token));
            cookieStore.set('roles', JSON.stringify(result.roles));
            redirect('/create-article')
        }
    }
    return (
        <div className='mx-auto container'>
            <main className="p-4 h-screen min-w-full grid grid-cols-12">
                <SignInContainer serverAction={signInAction}/>
                <RightColGrid>
                    <RightSideImage/>
                </RightColGrid>
            </main>
        </div>
    );
}


import HeadingComponent from './HeadingComponent';
import { JSX } from 'react';
function FormComponent({serverAction,style,children,sectionComponent}: {serverAction: (formData: FormData) => void | Promise<void>, style?: string,children: React.ReactNode,sectionComponent?:JSX.Element}) {
    return (
        <main>
            <HeadingComponent title="STACK STORIES" subtitle="Welcome back, User"/>
            <form action={serverAction} className={style}>
                {children}
            </form>
            {sectionComponent}
            </main>

    )
}

export default FormComponent
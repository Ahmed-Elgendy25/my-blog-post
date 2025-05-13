

import HeadingComponent from './HeadingComponent';
import { JSX } from 'react';
function FormComponent({style,children,sectionComponent}: {onSubmit?: Promise<void>, style?: string,children: React.ReactNode,sectionComponent?:JSX.Element}) {
    return (
        <main>
            <HeadingComponent title="STACK STORIES" subtitle="Welcome back, User"/>
            <form   className={style}>
                {children}
            </form>
            {sectionComponent}
            </main>

    )
}

export default FormComponent
/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX } from "react"
import HeadingComponent from "../../../../shared/HeadingComponent"

function SignUpForm({submit,children,style,sectionComponent}:{submit:any,children: React.ReactNode,style?: string,sectionComponent?:JSX.Element}) {
    return (
        <main>
            <HeadingComponent title="STACK STORIES" subtitle="Welcome back, User"/>
            <form className={style} onSubmit={submit}>
                {children}
            </form>
            {sectionComponent}
            </main>

    )
}

export default SignUpForm
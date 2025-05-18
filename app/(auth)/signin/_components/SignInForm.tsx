
import { JSX } from "react"
import HeadingComponent from "../../_components/HeadingComponent"
function SignInForm({
  style,
  children,
  sectionComponent,
  formAction
}: {
  style?: string,
  children: React.ReactNode,
  sectionComponent?: JSX.Element,
  formAction: (formData: FormData) => Promise<void>
}) {
  return (
    <main>
      <HeadingComponent title="STACK STORIES" subtitle="Welcome back, User"/>
      <form action={formAction} className={style}>
           
       
          {children}
      </form>
      {sectionComponent}
    </main>
  )
}

export default SignInForm
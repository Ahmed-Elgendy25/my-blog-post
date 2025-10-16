import { JSX } from "react";
import HeadingComponent from "../../../shared/HeadingComponent";
import pageStyle from "../_styles/page.module.css";

function SignInForm({
  style,
  children,
  sectionComponent,
  formAction,
}: {
  style?: string;
  children: React.ReactNode;
  sectionComponent?: JSX.Element;
  formAction:
    | ((formData: FormData) => Promise<void>)
    | ((payload: FormData) => void);
}) {
  return (
    <main>
      <HeadingComponent title="STACK STORIES">
        <h2
          className={` ${pageStyle.montserrat} p-5 bg-[#222222] font-medium    text-[#e7e8e2]`}
          style={{ fontSize: "clamp(1.5rem,1.6vmax,10rem)" }}
        >
          Welcome back, User
        </h2>
      </HeadingComponent>
      <form action={formAction} className={style}>
        {children}
      </form>
      {sectionComponent}
    </main>
  );
}

export default SignInForm;

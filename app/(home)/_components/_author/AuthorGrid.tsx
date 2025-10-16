import Image from "next/image";
import author1 from "/public/authors/rehab_v3.jpg";
import AuthorStyle from "./_styles/Author.module.css";
import {
  EnvelopeSimpleIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

function AuthorGrid() {
  return (
    <section className="grid grid-cols-12 ">
      <div className=" col-span-12 border-1 border-[#222222]  px-3 py-8">
        <div className="flex items-center  gap-x-5 p-3">
          <Image
            src={author1}
            alt="Meet the mind behind The Grinder — hustler, coder, and creator Ahmed Ashraf El-Gendy."
            width={150}
            height={500}
            className="  object-cover rounded-[50%]"
            unoptimized={true}
          />
          <div className="">
            <h3
              className={`${AuthorStyle.authorName} font-bold text-[#222222] `}
            >
              AHMED EL-GENDY
            </h3>
          </div>
          <div className="flex flex-col md:flex-row  items-center ms-auto gap-10 me-3 ">
            <Link
              href={`mailto:ahmedashrafelgendy25@gmail.com?subject=Hello&body=Hi%20there!`}
            >
              <EnvelopeSimpleIcon size={35} weight="fill" />
            </Link>
            <Link href={`https://x.com/AhmedShofa`}>
              <XLogoIcon size={35} weight="fill" />
            </Link>

            <Link href={`https://www.linkedin.com/in/ahmed-ashraf-37319522a/`}>
              <LinkedinLogoIcon size={35} weight="fill" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthorGrid;

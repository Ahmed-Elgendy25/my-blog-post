import React from "react";
import {
    InstagramLogo,
    LinkedinLogo,
    XLogo,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import placeholderImage from "@/public/landscape-placeholder-svgrepo-com.png";
import Image from "next/image";
import { UserTyped } from "../_schema/PostById";
function Aside({
    userImg,
    user,
    date,
    durationRead,
}: {
    userImg: string;
    user: UserTyped;
    date: string;
    durationRead: string;
}) {
    return (
        <aside className="  lg:order-none lg:col-span-4 col-start-1 col-end-13 mt-10  ">
            <div className="sticky top-10">
                <div className="flex items-center gap-x-2 border-[#222222] border-b-1 p-4">
                    {!userImg ? (
                        <Image
                            placeholder="empty"
                            src={placeholderImage}
                            alt={`${user.firstName} ${user.lastName}`}
                            width={95}
                            height={500}
                            className="object-cover rounded-[50%] me-4"
                        />
                    ) : (
                        <Image
                            src={userImg}
                            alt={`${user.firstName} ${user.lastName}`}
                            width={95}
                            height={500}
                            className="object-cover rounded-[50%] me-4"
                        />
                    )}

                    <h2 className="text-3xl font-bold text-[#222222]">
                        {`${user.firstName} ${user.lastName}`}
                    </h2>
                </div>

                <ul className="flex flex-col gap-y-2 py-3 px-4">
                    <li className="flex justify-between text-md text-[#222222]">
                        <span className="font-bold">Date</span>
                        <p>{date}</p>
                    </li>
                    <li className="flex justify-between text-md text-[#222222]">
                        <span className="font-bold">Read</span>
                        <p>{durationRead}</p>
                    </li>
                    <li className="flex justify-between  text-md text-[#222222]">
                        <span className="flex  font-bold">Share</span>
                        <div className=" flex gap-x-3  ">
                            <Link href={"https://www.linkedin.com/"}>
                                <LinkedinLogo size={28} weight="fill" />
                            </Link>
                            <Link href={"https://www.x.com/"}>
                                <XLogo size={28} weight="fill" />
                            </Link>
                            <Link href={"https://www.instagram.com/"}>
                                <InstagramLogo size={28} weight="fill" />
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Aside;

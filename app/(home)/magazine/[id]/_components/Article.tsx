import Image from "next/image";
import parse, { DOMNode } from "html-react-parser";
import { imageUrls, UserTyped } from "../_schema/PostById";

import Aside from "./Aside";

function Article({
    userImg,
    content,
    user,
    date,
    durationRead,
    images,
}: {
    userImg: string;
    content: string;
    user: UserTyped;
    date: string;
    durationRead: string;
    images: imageUrls[];
}) {
    const replaceImagePlaceholder = (domNode: DOMNode) => {
        if (domNode.type === "text") {
            const matches = [...domNode.data.matchAll(/{{image:img(\d+)}}/g)];
            if (matches.length === 0) return;

            const elements: (string | React.ReactNode)[] = [];
            let lastIndex = 0;

            for (const match of matches) {
                const [placeholder, indexStr] = match;
                const index = parseInt(indexStr);
                const imageUrl = images?.[index]?.data?.publicUrl;

                // Push text before the match
                elements.push(domNode.data.slice(lastIndex, match.index));

                if (imageUrl) {
                    elements.push(
                        <div
                            key={placeholder}
                            className="relative w-full  min-h-[45rem]   my-4"
                        >
                            <Image
                                src={imageUrl}
                                alt="Article image"
                                fill
                                className="object-cover"
                            />
                        </div>
                    );
                } else {
                    elements.push(placeholder); // if not found, push raw
                }

                lastIndex = match.index! + placeholder.length;
            }

            // Push remaining text
            elements.push(domNode.data.slice(lastIndex));

            return <>{elements}</>;
        }
    };

    const options = { replace: replaceImagePlaceholder };
    const parsedContent = parse(content, options);

    return (
        <>
            <Aside
                userImg={userImg}
                user={user}
                date={date}
                durationRead={durationRead}
            />
            <article className="lg:col-span-8 col-span-full mt-10   h-full  p-7 ">
                {parsedContent}
            </article>
        </>
    );
}

export default Article;

import Image from "next/image";
import parse, { DOMNode } from "html-react-parser";
import { imageUrls, UserTyped } from "../_schema/PostById";

import Aside from "./Aside";

function Article({
  userImg,
  content,
  user,
  images,
}: {
  userImg: string;
  content: string;
  user: UserTyped;
  images: imageUrls[] | null;
}) {
  const replaceImagePlaceholder = (domNode: DOMNode) => {
    if (!images || domNode.type !== "text") return;

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
            className="relative w-full max-w-3xl mx-auto my-8"
          >
            <Image
              src={imageUrl}
              alt="Article image"
              width={800}
              height={450}
              className="w-full h-auto object-contain rounded-lg"
              unoptimized={true}
            />
          </div>,
        );
      } else {
        elements.push(placeholder); // if not found, push raw
      }

      lastIndex = match.index! + placeholder.length;
    }

    // Push remaining text
    elements.push(domNode.data.slice(lastIndex));

    return <>{elements}</>;
  };

  const options = { replace: replaceImagePlaceholder };
  const parsedContent = parse(content, options);

  return (
    <div className="py-12 sm:py-16">
      {/* Author Card */}
      <div className="mb-12">
        <Aside userImg={userImg} user={user} />
      </div>

      {/* Article Content */}
      <article
        className="prose prose-lg prose-gray dark:prose-invert max-w-none 
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-8
        prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-8
        prose-h3:text-2xl prose-h3:mb-2 prose-h3:mt-6
        prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6 prose-p:text-gray-700 dark:prose-p:text-gray-300
        prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
        prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
        prose-li:my-2 prose-li:text-gray-700 dark:prose-li:text-gray-300
        prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
        prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg
        prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic
        prose-img:rounded-lg prose-img:my-8"
      >
        <div className="tiptap-preview">{parsedContent}</div>
      </article>
    </div>
  );
}

export default Article;

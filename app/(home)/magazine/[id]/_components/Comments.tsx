"use client";
import Giscus from "@giscus/react";

export default function Comments() {
    return (
        <Giscus
            repo="Ahmed-Elgendy25/my-blog-post"
            repoId="R_kgDOOG8GpQ"
            category="[ENTER CATEGORY NAME HERE]"
            categoryId="[ENTER CATEGORY ID HERE]"
            mapping="title"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme="light"
            lang="en"
            loading="lazy"
        />
    );
}

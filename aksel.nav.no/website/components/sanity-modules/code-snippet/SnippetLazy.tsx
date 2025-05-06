"use client";

import dynamic from "next/dynamic";

const SnippetLazy = dynamic(() => import("./Snippet"), {
  ssr: false,
});

export default SnippetLazy;

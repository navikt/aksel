import dynamic from "next/dynamic";

export const Snippet = dynamic(() => import("./Snippet"), {
  ssr: false,
});

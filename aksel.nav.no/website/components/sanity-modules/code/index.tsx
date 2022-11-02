import dynamic from "next/dynamic";

export const Snippet = dynamic(() => import("./Snippet"), {
  loading: () => (
    <div className="min-h-32 mb-8 block w-full rounded-md bg-gray-900" />
  ),
  ssr: false,
});

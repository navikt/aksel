import dynamic from "next/dynamic";

export const Snippet = dynamic(() => import("./Snippet"), {
  loading: () => (
    <div className="mb-8 block min-h-32 w-full rounded-md bg-gray-900" />
  ),
  ssr: false,
});

import { Studio } from "@/app/(admin)/admin/[[...index]]/Studio";


export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}

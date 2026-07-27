import { AdminStudio } from "@/app/(admin)/AdminStudio";

export { metadata, viewport } from "next-sanity/studio";

// TODO: Cache Components adoption. Was `export const dynamic = "force-static"`. Studio is a client SPA; opted out of prerender validation for now.
export const unstable_instant = false;

export default function StudioPage() {
  return <AdminStudio />;
}

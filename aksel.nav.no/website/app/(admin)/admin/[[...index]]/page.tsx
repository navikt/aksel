import { AdminStudio } from "@/app/(admin)/AdminStudio";

export { metadata, viewport } from "next-sanity/studio";

export const dynamic = "force-static";

export default function StudioPage() {
  return <AdminStudio />;
}

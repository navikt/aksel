import { AdminStudio } from "@/app/(routes)/(admin)/AdminStudio";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <AdminStudio />;
}

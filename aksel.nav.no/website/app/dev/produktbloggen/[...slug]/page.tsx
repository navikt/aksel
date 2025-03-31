import { parseDesignsystemSlug } from "../../(designsystemet)/slug";

type Props = {
  params: Promise<{ slug: string[] }>;
};

/* https://nextjs.org/docs/app/api-reference/file-conventions/page#props */
export default async function Page({ params }: Props) {
  const { slug } = await params;

  const parsedSlug = parseDesignsystemSlug(slug, "produktbloggen");

  return <div>page for {parsedSlug}</div>;
}

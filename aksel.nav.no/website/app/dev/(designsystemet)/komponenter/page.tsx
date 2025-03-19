/* import { client } from "@/app/_sanity/client"; */

/* import { disableDraftMode, enableDraftMode } from "@/app/actions"; */
import { DesignsystemetPageLayout } from "../PageLayout";

/* https://nextjs.org/docs/app/api-reference/file-conventions/page#props */
export default async function Page(/* {
  params,
}: {
  params: Promise<{ slug: string }>;
} */) {
  /* const data = await client.fetch(
    "*[_type == 'komponent_artikkel'][0].heading",
    undefined,
    { useCdn: false, perspective: "drafts" },
  ); */

  /* <button onClick={enableDraftMode}>on</button>
  <hr />
  <button onClick={disableDraftMode}>off</button>

  <pre>{data}</pre> */

  return (
    <DesignsystemetPageLayout>
      <div style={{ background: "red", width: "100%", height: 50 }}></div>
      <div style={{ background: "blue", width: "240px", height: 50 }}></div>
    </DesignsystemetPageLayout>
  );
}

/*

*[_type == "komponent_artikkel"][2]{
  "TOC": content[style match 'h2'][]{
    _key,
    "text": pt::text(@)
  }
}

*/

/* import { client } from "@/app/_sanity/client"; */

/* import { disableDraftMode, enableDraftMode } from "@/app/actions"; */
import { CodeBlock } from "@/app/_ui/code-block/CodeBlock";

export default async function Page() {
  /* const data = await client.fetch(
    "*[_type == 'komponent_artikkel'][0].heading",
    undefined,
    { useCdn: false, perspective: "drafts" },
  ); */

  return (
    <div>
      {/* <button onClick={enableDraftMode}>on</button>
      <hr />
      <button onClick={disableDraftMode}>off</button>

      <pre>{data}</pre> */}
      DEV
      <CodeBlock />
    </div>
  );
}

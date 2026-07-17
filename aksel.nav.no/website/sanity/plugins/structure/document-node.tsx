import { Iframe, type IframeOptions } from "sanity-plugin-iframe-pane";
import { referencesView } from "sanity-plugin-references";
import type { DefaultDocumentNodeResolver } from "sanity/structure";
import { landingsider, previews } from "@/sanity/config";
import { resolveProductionUrlAppdir } from "./resolve-production-url";

const previewSchemaTypes = [
  ...previews,
  ...landingsider.map((x) => x.name),
  "gp_endringslogg_artikkel",
];

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
  if (previewSchemaTypes.includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: {
            origin: "same-origin",
            preview: resolveProductionUrlAppdir,
            draftMode: "/api/draft-mode/enable",
          } satisfies IframeOptions["url"],
          reload: { button: true },
          attributes: {
            allow: "fullscreen",
          },
        })
        .title("Forhåndsvisning"),
      referencesView(S, {
        title: "Referanser",
      }),
    ]);
  }

  return S.document().views([S.view.form()]);
};

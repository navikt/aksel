import { landingsider, previews } from "@/sanity/config";
import { resolveProductionUrl } from "../resolveProductionUrl";
import { Iframe } from "./IFrame";

const defaultDocumentNode = (S, { schemaType }) => {
  if ([...previews, ...landingsider.map((x) => x.name)].includes(schemaType)) {
    return S.document().views([
      S.view.form(),

      S.view
        .component(Iframe)
        .options({
          url: (doc) => resolveProductionUrl(doc),
        })
        .title("Forhåndsvisning"),
    ]);
  }
  if (schemaType === "aksel_forside") {
    return S.document().views([S.view.form()]);
  }
  return S.document().views([S.view.form()]);
};

export { defaultDocumentNode };

import { StructureBuilder } from "sanity/structure";
import {
  CircleSlashIcon,
  EyeIcon,
  FileTextIcon,
  ImageIcon,
  PieChartIcon,
} from "@navikt/aksel-icons";
import { SANITY_API_VERSION } from "@/sanity/config";

export function adminStructure(S: StructureBuilder) {
  const adminOrDev = S.context.currentUser?.roles.find((x) =>
    ["developer", "administrator"].includes(x.name),
  );
  if (!adminOrDev) {
    return S.divider();
  }

  return S.listItem()
    .title("Admin")
    .icon(CircleSlashIcon)
    .child(
      S.list()
        .title("Admin")
        .items([
          S.documentListItem()
            .title(`Forside`)
            .schemaType(`aksel_forside`)
            .icon(ImageIcon)
            .id(`aksel_forside_dokument`),

          S.documentListItem()
            .title(`Forside Designsystemet`)
            .schemaType(`aksel_ds_forside`)
            .icon(ImageIcon)
            .id(`aksel_ds_forside_dokument`),

          S.listItem()
            .title("Standalone-sider")
            .child(
              S.documentList()
                .title("Sider")
                .filter(`_type == 'aksel_standalone'`)
                .apiVersion(SANITY_API_VERSION),
            ),
          S.listItem()
            .title("Redirects")
            .child(
              S.documentList()
                .title("Redirects")
                .filter(`_type == 'redirect'`)
                .apiVersion(SANITY_API_VERSION),
            ),
          S.listItem()
            .title("Eksempler/Templates")
            .child(
              S.documentList()
                .title("Eksempler")
                .filter(`_type == 'kode_eksempler_fil'`)
                .apiVersion(SANITY_API_VERSION),
            ),
          S.listItem()
            .title("Token-grupper Designsystemet")
            .child(
              S.documentList()
                .title("Grupper")
                .filter(`_type == 'token_kategori'`)
                .apiVersion(SANITY_API_VERSION),
            ),
          S.listItem()
            .title("Props Designsystemet")
            .child(
              S.documentList()
                .title("Props")
                .filter(`_type == 'ds_props'`)
                .apiVersion(SANITY_API_VERSION),
            ),
          S.documentListItem()
            .title(`Skrivehjelp`)
            .schemaType(`skrivehjelp`)
            .icon(FileTextIcon)
            .id(`skrivehjelp`),
          S.documentListItem()
            .title(`Cookie banner`)
            .schemaType(`cookie_tracker`)
            .icon(PieChartIcon)
            .id(`cookie_tracker`),
          S.documentListItem()
            .title(`Publiseringsflyt`)
            .schemaType(`publication_flow`)
            .icon(FileTextIcon)
            .id(`publication_flow`),
          S.listItem()
            .title("Artikkelvisninger")
            .icon(EyeIcon)
            .child(
              S.documentList()
                .title("Artikkelvisninger")
                .filter(`_type == 'article_views'`)
                .apiVersion(SANITY_API_VERSION)
                .menuItems([
                  ...(S.documentTypeList("article_views").getMenuItems() ?? []),
                ]),
            ),
        ]),
    );
}

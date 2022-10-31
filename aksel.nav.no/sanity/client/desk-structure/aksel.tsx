import { prinsipper } from "@/lib";
import { Facilitet } from "@navikt/ds-icons";
import S from "@sanity/desk-tool/structure-builder";
import documentStore from "part:@sanity/base/datastore/document";
import React from "react";
import { map } from "rxjs/operators";

const temaQuery = `*[_type == "aksel_tema" && count(*[references(^._id)]) > 0]`;

const AkselLogo = () => (
  <svg
    width="192px"
    height="192px"
    viewBox="0 0 192 192"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    aria-hidden="true"
    strokeLinecap="round"
    strokeWidth="10"
    stroke="currentColor"
  >
    <path d="m41.63 150.3 47.39-47.38" />
    <path d="M40.92 80.3 77.7 43.53c4.25-4.24 9.9-4.24 14.15 0l56.56 56.57c4.25 4.25 4.25 9.9 0 14.14l-36.77 36.77" />
    <path d="m40.92 80.3 38.19-38.18c3.53-3.54 6.72-3.18 13.79-3.18h48.79s0 0 0 0c6.36 0 11.31 4.95 11.31 11.31 0 0 0 0 0 0v48.8c0 7.06.35 10.24-3.18 13.78l-38.19 38.18" />
  </svg>
);

export const akselInnhold = async () => {
  return S.listItem()
    .title("Aksel")
    .icon(() => <AkselLogo />)
    .child(
      S.list()
        .title("Innhold")
        .items([
          S.listItem()
            .title("Artikler")
            .child(() =>
              documentStore.listenQuery(temaQuery).pipe(
                map((tema: any) => {
                  return S.list()
                    .title("Artikler")
                    .items([
                      S.listItem()
                        .title("Alle artikler")
                        .child(S.documentTypeList("aksel_artikkel")),
                      S.listItem()
                        .title("Uten tema")
                        .child(
                          S.documentTypeList("aksel_artikkel").filter(
                            `_type == "aksel_artikkel" && !defined(tema)`
                          )
                        ),
                      ...tema.map((tag) => {
                        return S.listItem()
                          .title(tag.title)
                          .child(
                            S.documentList()
                              .title(tag.title)
                              .filter(
                                `_type == 'aksel_artikkel' && $tag in tema[]->title`
                              )
                              .params({ tag: tag.title })
                          );
                      }),
                    ]);
                })
              )
            ),
          S.listItem().title("Blogg").child(S.documentTypeList("aksel_blogg")),
          S.listItem()
            .title("Prinsipper")
            .child(
              S.list()
                .title("Prinsipper")
                .items([
                  S.listItem()
                    .title("Alle artikler")
                    .child(S.documentTypeList("aksel_prinsipp")),
                  ...prinsipper.map(({ value, title }) =>
                    S.listItem()
                      .title(title)
                      .child(
                        S.documentList()
                          .title(title)
                          .filter(
                            `_type == 'aksel_prinsipp' && $value == prinsipp.prinsippvalg`
                          )
                          .params({ value })
                      )
                  ),
                ])
            ),
          S.divider(),
          S.listItem()
            .title("Temasider")
            .icon(() => <Facilitet />)
            .child(S.documentTypeList("aksel_tema")),
        ])
    );
};

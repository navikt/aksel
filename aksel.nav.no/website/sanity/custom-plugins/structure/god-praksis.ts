/* documentStore is in Alpha, so avoid using for now */
export const GodPraksisPanes = async (getClient, S) => {
  const artikler = await getClient({ apiVersion: "2021-06-07" }).fetch(
    `*[_type == "aksel_artikkel"]{_id}`
  );

  let tema = await getClient({ apiVersion: "2021-06-07" }).fetch(
    `*[_type == "aksel_tema" && defined(seksjoner)]{title,seksjoner, _id}`
  );
  tema = tema
    .filter((x) => x?.seksjoner?.length > 0)
    .map((x) => ({
      title: x.title,
      sider: x.seksjoner.reduce((b, n) => [...b, ...(n?.sider ?? [])], []),
    }));

  const usedIds = tema.reduce(
    (a, b) => [...a, ...b.sider.map((c) => c._ref)],
    []
  );

  const noTema = artikler.filter((x) => !usedIds.find((y) => y === x._id));

  return [
    S.listItem()
      .title(`Temasider (${tema.length})`)
      .child(S.documentTypeList("aksel_tema")),
    S.divider(),
    ...tema.map(({ title, sider }) =>
      S.listItem()
        .title(`${title} (${sider.length})`)
        .child(
          S.documentList()
            .title(`${title} (${sider.length})`)
            .filter(`_type == "aksel_artikkel" && @._id in $ids`)
            .params({ ids: sider.map((x) => x._ref) })
        )
    ),
    S.divider(),
    S.listItem()
      .title(`Artikler uten tema (${noTema.length})`)
      .child(
        S.documentList()
          .title(`Artikler uten tema (${noTema.length})`)
          .filter(`_type == "aksel_artikkel" && _id in $ids`)
          .params({ ids: noTema.map((x) => x._id) })
      ),
  ];
};

import { getClient } from "../sanity/sanity.server";

const docTypes = [
  "aksel_artikkel",
  "aksel_blogg",
  "aksel_prinsipp",
  "ds_artikkel",
  "komponent_artikkel",
];

const akselSpesifics = `
_type == "aksel_prinsipp" => {"prinsipp": prinsipp.prinsippvalg},
_type == "aksel_artikkel" => {"tema": tema[]->title}`;

const dsSpesifics = `
artikkel_type == true => {
  "tabs": content_tabs[].title
}
`;

const query = `
*[_type in $types]{
   _id,
   _type,
  "url": slug.current,
  heading,
  ${akselSpesifics},
  ${dsSpesifics}
}`;

export const generateObjects = async () => {
  const data = await getClient().fetch(query, {
    types: docTypes,
  });

  const objects = [];

  data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ _id, ...rest }) => ({ ...rest, rank: 1 }))
    .forEach((doc) => {
      switch (doc._type) {
        case "aksel_artikkel":
          /* Hide docs without a tema set */
          doc.tema && objects.push(doc);
          break;
        case "aksel_blogg":
          objects.push(doc);
          break;
        case "aksel_prinsipp":
          objects.push(doc);
          break;
        case "ds_artikkel":
          if (doc.tabs) {
            doc.tabs.forEach((x, i) =>
              objects.push({
                ...doc,
                tab: x,
                url:
                  i > 0
                    ? `${doc.url}/${x.toLowerCase().replace(/\s+/g, "-")}`
                    : doc.url,
              })
            );
            break;
          }
          objects.push(doc);
          break;
        case "komponent_artikkel":
          objects.push({
            ...doc,
            tab: "bruk",
            rank: 1,
          });
          objects.push({
            ...doc,
            tab: "bruk",
            url: `${doc.url}/kode`,
            rank: 2,
          });
          break;
        default:
          break;
      }
    });

  return objects;
};

import { DocumentLocationResolver } from "sanity/presentation";

export const locate: DocumentLocationResolver = () => {
  // Set up locations for documents of the type "post"
  /* if (type === "komponent_artikkel") {
    return {
      locations: [{ title: "Komponenter", href: "/komponenter" }],
    };
  } */
  return null;
};

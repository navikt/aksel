import { ConditionalProperty, NewDocumentOptionsResolver } from "sanity";

export function showForDevsOnly(): ConditionalProperty {
  return ({ currentUser }) =>
    !currentUser?.roles.find(({ name }) =>
      ["developer", "administrator"].includes(name),
    );
}

export const newDocumentsCreator: NewDocumentOptionsResolver = (
  prev,
  { creationContext },
) => {
  if (creationContext.type === "global") {
    const templates = {
      god_praksis_forfatter: [
        {
          title: "God praksis artikkel",
          id: "godPraksisForfatterRole",
          templateId: "aksel_artikkel",
          subtitle: "Fagartikkel",
        },
      ],
      blogger: [
        {
          title: "Bloggpost",
          id: "bloggerRole",
          templateId: "aksel_blogg",
        },
      ],
      grunnleggende: [
        {
          title: "Grunnleggende artikkel",
          id: "grunnleggendeRole",
          templateId: "ds_artikkel",
          subtitle: "Guider og dokumentasjon for designsystemet",
        },
      ],
      komponenter: [
        {
          title: "Komponent artikkel",
          id: "komponenterRole",
          templateId: "komponent_artikkel",
          subtitle: "Dokumentasjon for designsystemet",
        },
      ],
      prinsipper: [
        {
          title: "Prinsipp artikkel",
          id: "prinsippereRole",
          templateId: "aksel_prinsipp",
        },
      ],
    };
    return Object.values(templates).flat();
  }

  return prev;
};

/**
 * Cleans up strings to be used as URLs
 * @param input
 * @returns cleaned input
 */
export function sanitizeSlug(input: string) {
  if (!input) {
    return "";
  }

  return (
    input
      .toLowerCase()
      .trim()
      /* Space */
      .replace(/\s+/g, "-")
      /* multiple - converted to single - */
      .replace(/-+/gm, "-")
      /* Special-characters */
      .replace(/[æåø]/g, (char) => {
        switch (char) {
          case "æ":
            return "ae";
          case "å":
            return "a";
          case "ø":
            return "o";
          default:
            return "";
        }
      })
      // Replace accented characters with non-accented equivalents
      .normalize("NFD")
      // biome-ignore lint/suspicious/noMisleadingCharacterClass: Nextjs-loader (webpack/loaders/next-swc-loader.js) does not support the `v` flag in regex expressions
      .replace(/[\u0300-\u036f]/g, "")
      // Replace any non [a-zA-Z0-9_]
      .replace(/[^\w-]+/g, "")
  );
}

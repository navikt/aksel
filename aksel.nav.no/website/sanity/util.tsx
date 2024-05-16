import type {
  ConditionalPropertyCallbackContext,
  NewDocumentOptionsResolver,
} from "sanity";

export const devsOnly = ({ currentUser }: ConditionalPropertyCallbackContext) =>
  !currentUser?.roles.find(({ name }) =>
    ["developer", "administrator"].includes(name),
  );

export const newDocumentsCreator: NewDocumentOptionsResolver = (
  prev,
  { creationContext },
) => {
  if (creationContext.type === "global") {
    const templates = {
      profil: [
        {
          title: "Profilside",
          id: "profilRole",
          templateId: "editor",
        },
      ],
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

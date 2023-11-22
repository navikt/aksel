export const devsOnly = ({ currentUser }) =>
  !currentUser.roles.find(({ name }) =>
    ["developer", "administrator"].includes(name)
  );

export const getTemplates = () => {
  const templates = {
    profil: [
      {
        title: "Profilside",
        id: "profilRole",
        templateId: "editor",
        subtitle: "(Kan bare ha 1 profilside)",
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
    tema_ansvarlig: [
      {
        title: "God praksis tema",
        id: "temaAnsvarligRole",
        templateId: "aksel_tema",
        subtitle: "Nytt god-praksis tema",
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
};

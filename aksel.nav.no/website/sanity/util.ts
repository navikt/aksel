import { Role } from "sanity";

export const toPlainText = (blocks) => {
  if (!blocks || blocks.length === 0) {
    return "";
  }

  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }

      return block.children.map((child) => child.text).join("");
    })
    .join("\n\n");
};

export const getTemplates = (roles: Role[]) => {
  const templates = {
    blogger: [
      {
        id: "bloggerRole",
        templateId: "aksel_blogg",
      },
    ],
    god_praksis_forfatter: [
      {
        id: "godPraksisForfatterRole",
        templateId: "aksel_artikkel",
      },
    ],
    grunnleggende: [
      {
        id: "grunnleggendeRole",
        templateId: "ds_artikkel",
      },
    ],
    komponenter: [
      {
        id: "komponenterRole",
        templateId: "komponent_artikkel",
      },
    ],
    prinsipper: [
      {
        id: "prinsippereRole",
        templateId: "aksel_prinsipp",
      },
    ],
    profil: [
      {
        id: "profilRole",
        templateId: "editor",
      },
    ],
    tema_ansvarlig: [
      {
        id: "temaAnsvarligRole",
        templateId: "aksel_tema",
      },
    ],
  };
  return roles
    .map((role) => {
      if (templates[role.name.replaceAll("-", "_")]) {
        return templates[role.name.replaceAll("-", "_")];
      }
      return [];
    })
    .flat();
};

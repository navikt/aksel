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
  };
  return roles
    .map((role) => {
      if (templates[role.name]) {
        return templates[role.name];
      }
      return [];
    })
    .flat();
};

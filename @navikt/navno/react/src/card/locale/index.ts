import { ProductName, Language, CardLanguage } from "../base-card/types";

import LibraryNO from "./locale-no.json";
import LibraryEN from "./locale-en.json";

const getLibrary = (language: Language) => {
  if (language === "en") {
    return LibraryEN;
  }
  return LibraryNO;
};

const getCardText = (
  cardName: ProductName,
  language: Language
): CardLanguage => {
  const library = getLibrary(language);
  const cardLanguage = library[cardName];

  if (!cardLanguage) {
    return { title: "", text: "", category: "" };
  }

  return cardLanguage;
};

export { getCardText };

import React, { useContext } from "react";
import { I18nContext } from "./context";
import { TranslationDictionary } from "./types";

const I18NProvider = ({
  i18n,
  children,
}: {
  i18n?: TranslationDictionary | TranslationDictionary[];
  children: React.ReactNode;
}) => {
  const i18nContext = useContext(I18nContext);

  return (
    <I18nContext.Provider value={i18n ?? i18nContext}>
      {children}
    </I18nContext.Provider>
  );
};

export default I18NProvider;

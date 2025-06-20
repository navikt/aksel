import { Dispatch, SetStateAction, createContext, useContext } from "react";

interface ShowMoreContextType {
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  shouldFlash: boolean;
  setShouldFlash: Dispatch<SetStateAction<boolean>>;
  shouldScroll: boolean;
  setShouldScroll: Dispatch<SetStateAction<boolean>>;
}

export const ShowMoreContext = createContext<ShowMoreContextType | undefined>(
  undefined,
);

export const useShowMoreContext = () => {
  const context = useContext(ShowMoreContext);
  if (!context) {
    throw new Error(
      "useShowMoreContext must be used within a ShowMoreContext.Provider",
    );
  }
  return context;
};

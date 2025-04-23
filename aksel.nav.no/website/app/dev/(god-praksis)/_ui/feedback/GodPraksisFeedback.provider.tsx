"use client";

import React, { createContext, useContext, useState } from "react";

type GodPraksisFeedbackContextType = {
  formState: "sent" | "loggedOut" | "writable" | "submitting";
  updateFormState: (state: "loggedOut" | "writable" | "submitting") => void;
};

const GodPraksisFeedbackContext =
  createContext<GodPraksisFeedbackContextType | null>(null);

interface GodPraksisFeedbackProviderProps {
  children: React.ReactNode;
  loggedIn: boolean;
}

function GodPraksisFeedbackProvider(props: GodPraksisFeedbackProviderProps) {
  const { children, loggedIn } = props;

  const [formState, setFormState] = useState<
    GodPraksisFeedbackContextType["formState"]
  >(loggedIn ? "writable" : "loggedOut");

  return (
    <GodPraksisFeedbackContext.Provider
      value={{
        formState: loggedIn ? formState : "loggedOut",
        /* formState: "writable", */
        updateFormState: setFormState,
      }}
    >
      {children}
    </GodPraksisFeedbackContext.Provider>
  );
}

function useGodPraksisFeedbackContext() {
  const context = useContext(GodPraksisFeedbackContext);

  if (!context) {
    throw new Error(
      "useGodPraksisFeedbackContext must be used within a GodPraksisFeedbackProvider",
    );
  }
  return context;
}

export { GodPraksisFeedbackProvider, useGodPraksisFeedbackContext };

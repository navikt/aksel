"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { Box } from "@navikt/ds-react";
import { useEscapeKeydown } from "@/hooks/useEscapeKeydown";
import styles from "./Hero.module.css";

type GodPraksisHeroContextType = {
  dialogState: {
    open: boolean;
    toggleOpen: (
      e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>,
    ) => void;
    setClose: () => void;
  };
  registerRef: {
    dialogRef: (ref: HTMLDivElement | null) => void;
    openDialogButtonRef: (ref: HTMLButtonElement | null) => void;
    closeDialogButtonRef: (ref: HTMLButtonElement | null) => void;
  };
};

const GodPraksisHeroContext = createContext<GodPraksisHeroContextType | null>(
  null,
);

interface GodPraksisHeroProviderProps {
  children: React.ReactNode;
}

function GodPraksisHeroProvider(props: GodPraksisHeroProviderProps) {
  const { children } = props;

  const [openDialog, setOpenDialog] = useState(false);

  const [dialogHeight, setDialogHeight] = useState(0);
  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [animationRef, setAnimationRef] = useState({ x: 0, y: 0 });

  const [openDialogButton, setOpenDialogButton] = useState<HTMLElement | null>(
    null,
  );

  const [closeDialogButton, setCloseDialogButton] =
    useState<HTMLElement | null>(null);

  const handleOpen = useCallback(
    (e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
      const rect = e.currentTarget.getBoundingClientRect();

      setAnimationRef({
        x: e.currentTarget.offsetLeft + rect.width / 2,
        y: e.currentTarget.offsetTop + rect.height / 2,
      });
      setOpenDialog(true);

      // Since we cant focus elements inside `display: none` elements, we need to
      // wait for the dialog to be open before we focus the close button
      setTimeout(() => closeDialogButton?.focus());
    },
    [closeDialogButton],
  );

  const handleClose = useCallback(() => {
    setOpenDialog(false);
    setTimeout(() => openDialogButton?.focus());
  }, [openDialogButton]);

  const handleToggleOpen = useCallback(
    (e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
      if (openDialog) {
        handleClose();
      } else {
        handleOpen(e);
      }
    },
    [openDialog, handleClose, handleOpen],
  );

  useEscapeKeydown(handleClose, [handleClose]);

  /**
   * Tries to equal height for both wrapper and absolute-element
   * by increasing the margin-bottom of the wrapper
   */
  const getMargin = () => {
    if (!openDialog) return 0;
    const height = dialogHeight ? dialogHeight - wrapperHeight : 0;
    if (height > 0) return height;
    return 0;
  };

  function registerDialogRef(ref: HTMLDivElement | null) {
    setDialogHeight(ref?.getBoundingClientRect().height || 0);
  }

  function registerOpenDialogButtonRef(ref: HTMLButtonElement | null) {
    setOpenDialogButton(ref);
  }

  function registerCloseDialogButtonRef(ref: HTMLButtonElement | null) {
    setCloseDialogButton(ref);
  }

  const customStyles: React.CSSProperties = {
    "--website-hero-selector-x": animationRef.x + "px",
    "--website-hero-selector-y": animationRef.y + "px",
    marginBottom: getMargin(),
    transitionTimingFunction: openDialog
      ? "cubic-bezier(0.3, 1, 0.15, 1)"
      : "cubic-bezier(0, 0.7, 0.15, 1)",
  };

  return (
    <GodPraksisHeroContext.Provider
      value={{
        dialogState: {
          open: openDialog,
          toggleOpen: handleToggleOpen,
          setClose: () => setOpenDialog(false),
        },
        registerRef: {
          dialogRef: registerDialogRef,
          openDialogButtonRef: registerOpenDialogButtonRef,
          closeDialogButtonRef: registerCloseDialogButtonRef,
        },
      }}
    >
      <Box
        paddingInline={{ xs: "space-16", lg: "space-40" }}
        paddingBlock={{ xs: "space-16", lg: "space-40" }}
        className={styles.godPraksisHero}
        style={customStyles}
        ref={(el) => {
          setWrapperHeight(el?.getBoundingClientRect().height || 0);
        }}
      >
        {children}
      </Box>
    </GodPraksisHeroContext.Provider>
  );
}

function useGodPraksisHeroContext() {
  const context = useContext(GodPraksisHeroContext);

  if (!context) {
    throw new Error(
      "useGodPraksisHeroContext must be used within a GodPraksisHeroProvider",
    );
  }
  return context;
}

export { GodPraksisHeroProvider, useGodPraksisHeroContext };

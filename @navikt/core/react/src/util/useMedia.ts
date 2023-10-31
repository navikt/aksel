import { useEffect, useState } from "react";

export const noMatchMedia =
  typeof window !== "undefined" &&
  (window.matchMedia === undefined || navigator.userAgent.includes("jsdom"));

/**
 * @example useMedia("screen and (min-width: 1024px)")
 * @param media string
 * @param defaultFallback boolean
 * @returns isActive-boolean
 */
export const useMedia = (media: string, defaultFallback?: boolean): boolean => {
  const [isActive, setIsActive] = useState(defaultFallback ?? false);

  useEffect(() => {
    if (noMatchMedia) {
      return;
    }
    const mediaQueryList = window.matchMedia(media);

    setIsActive(mediaQueryList.matches);

    const listener = (evt: MediaQueryListEvent) => {
      setIsActive(evt.matches);
    };

    mediaQueryList.addEventListener("change", listener);

    return () => {
      if (noMatchMedia) {
        return;
      }
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [media]);

  return isActive;
};

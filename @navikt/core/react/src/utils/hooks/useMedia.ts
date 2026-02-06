import { useEffect, useState } from "react";

export const noMatchMedia =
  typeof window !== "undefined" && window.matchMedia === undefined;

/**
 * @example useMedia("screen and (min-width: 1024px)")
 * @param media string
 * @param fallback boolean
 * @returns boolean | undefined
 */
export const useMedia = (
  media: string,
  fallback?: boolean,
): boolean | undefined => {
  const [matches, setMatches] = useState(fallback);

  useEffect(() => {
    if (noMatchMedia) {
      return;
    }
    const mediaQueryList = window.matchMedia(media);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(mediaQueryList.matches);

    const listener = (evt: MediaQueryListEvent) => {
      setMatches(evt.matches);
    };

    mediaQueryList.addEventListener("change", listener);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [media]);

  return matches;
};

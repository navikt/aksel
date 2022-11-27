import { useEffect } from "react";

const environment = process.env.NODE_ENV;

export const isProduction = (): boolean => {
  if (typeof window !== "undefined") {
    const url =
      window && window.location && window.location.href
        ? window.location.href
        : "";
    return environment === "production" && /aksel.nav.no/.test(url);
  } else {
    return false;
  }
};

// https://stackoverflow.com/questions/38588346/anchor-a-tags-not-working-in-chrome-when-using/38588927#38588927
// https://github.com/vercel/next.js/discussions/13134
export function useScrollToHashOnPageLoad(): void {
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        window.location.hash = "";
        window.location.hash = hash;
      }, 500);
    }
  }, []);
}

export const getActiveHeading = (nav: any, slug = "") =>
  nav?.headings.find((heading) => {
    if (heading?.menu) {
      return (
        heading.menu
          .filter((x) => x?._type !== "subheading")
          .find((item) => item?.link?.slug?.current === slug) ??
        heading?.link_ref?.slug?.current === slug
      );
    } else {
      return heading?.link_ref?.slug?.current === slug;
    }
  }) ?? null;

export const removeEmojies = (s: string) =>
  s.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    ""
  );

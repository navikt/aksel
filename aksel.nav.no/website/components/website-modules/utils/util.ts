import { useEffect } from "react";

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

export const removeEmojies = (s: string) =>
  s.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    ""
  );

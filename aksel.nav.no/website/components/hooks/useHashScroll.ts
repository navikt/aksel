import { useEffect } from "react";

// https://stackoverflow.com/questions/38588346/anchor-a-tags-not-working-in-chrome-when-using/38588927#38588927
// https://github.com/vercel/next.js/discussions/13134
export function useHashScroll(): void {
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

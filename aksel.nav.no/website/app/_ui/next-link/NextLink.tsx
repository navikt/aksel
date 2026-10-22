// https://github.com/vercel/next.js/issues/85604

"use client";

import Link from "next/link";
import { createContext, useContext } from "react";

const DisablePrefetchContext = createContext(false);

/**
 * In draft mode, `<SanityLive>` calls `router.refresh()` on every content change,
 * which re-prefetches every visible link. Disabling prefetch avoids that request burst.
 */
function DisableLinkPrefetch({ children }: { children: React.ReactNode }) {
  return (
    <DisablePrefetchContext.Provider value>
      {children}
    </DisablePrefetchContext.Provider>
  );
}

function NextLink(props: React.ComponentProps<typeof Link>) {
  const disablePrefetch = useContext(DisablePrefetchContext);

  return disablePrefetch ? (
    <Link {...props} prefetch={false} />
  ) : (
    <Link {...props} />
  );
}

export { DisableLinkPrefetch, NextLink };

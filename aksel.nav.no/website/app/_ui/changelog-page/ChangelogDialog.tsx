"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogPopup } from "@navikt/ds-react/Dialog";

type ChangelogDialogProps = {
  children: React.ReactNode;
};

function ChangelogDialog(props: ChangelogDialogProps) {
  const { children } = props;
  const router = useRouter();

  const [openState, setOpenState] = useState(false);
  const skipRoutingBack = useRef(false);

  useEffect(function delayOpenToShowOpeningAnimation() {
    /**
     * Waiting 2 cyles "reliably" makes sure animations work
     * This is quite hacky and would prefere a more robust solution, but it works for now
     */
    queueMicrotask(() => {
      queueMicrotask(() => {
        setOpenState(true);
      });
    });
  }, []);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstRenderRef = useRef(true);

  // biome-ignore lint/correctness/useExhaustiveDependencies: We only want to trigger this effect on URL change, not on initial render, and router object is stable
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    /* URL changed -> close dialog */
    setOpenState(false);
    skipRoutingBack.current = true;
  }, [pathname, searchParams]);

  return (
    <Dialog
      open={openState}
      onOpenChange={(newOpenState) => {
        !newOpenState && setOpenState(false);
      }}
      onOpenChangeComplete={(newOpenState) => {
        if (skipRoutingBack.current) {
          skipRoutingBack.current = false;
          return;
        }
        !newOpenState && router.back();
      }}
    >
      <DialogPopup width="large" aria-labelledby="endringslogg-page-heading">
        {children}
      </DialogPopup>
    </Dialog>
  );
}

export { ChangelogDialog };

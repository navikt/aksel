"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogPopup } from "@navikt/ds-react/Dialog";

type ChangelogDialogProps = {
  children: React.ReactNode;
};

function ChangelogDialog(props: ChangelogDialogProps) {
  const { children } = props;
  const router = useRouter();

  const [openState, setOpenState] = useState(false);

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

  return (
    <Dialog
      open={openState}
      onOpenChange={(newOpenState) => {
        !newOpenState && setOpenState(false);
      }}
      onOpenChangeComplete={(newOpenState) => {
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

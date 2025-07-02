"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import {
  FaceFrownIcon,
  FaceIcon,
  FaceLaughIcon,
  FaceSmileIcon,
} from "@navikt/aksel-icons";
import { BoxNew } from "@navikt/ds-react";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardIcon,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";

function AnimatedFaceCard() {
  const [state, setState] = useState<number>(3);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    setState(0);
    intervalRef.current = setInterval(() => {
      setState((prev) => (prev + 1) % 4);
    }, 400);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!intervalRef.current) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setState(4);
  }, []);

  let Icon: typeof FaceLaughIcon = FaceLaughIcon;

  switch (state) {
    case 0:
      Icon = FaceFrownIcon;
      break;
    case 1:
      Icon = FaceIcon;
      break;
    case 2:
      Icon = FaceSmileIcon;
      break;
    case 3:
      Icon = FaceLaughIcon;
      break;
  }

  return (
    <LinkCard
      data-color="brand-blue"
      arrow={false}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <BoxNew
        asChild
        padding="space-8"
        borderRadius="12"
        background="brand-blue-moderateA"
      >
        <LinkCardIcon>
          <Icon fontSize="3rem" color="var(--ax-text-subtle)" />
        </LinkCardIcon>
      </BoxNew>
      <LinkCardTitle data-color="neutral">
        <LinkCardAnchor asChild>
          <Link href="/komponenter/ikoner">Ikoner</Link>
        </LinkCardAnchor>
      </LinkCardTitle>
      <LinkCardDescription>900+ linje- og fylte ikoner</LinkCardDescription>
    </LinkCard>
  );
}

export { AnimatedFaceCard };

"use client";

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
import { NextLink } from "@/app/_ui/next-link/NextLink";

function AnimatedFaceCard() {
  const [state, setState] = useState<number>(3);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    setState(0);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

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
          <NextLink href="/komponenter/ikoner">Ikoner</NextLink>
        </LinkCardAnchor>
      </LinkCardTitle>
      <LinkCardDescription>900+ linje- og fylte ikoner</LinkCardDescription>
    </LinkCard>
  );
}

export { AnimatedFaceCard };

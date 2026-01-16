"use client";

import React, { ReactElement } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { cl } from "@/ui-utils/className";
import styles from "./ShowMore.module.css";
import { useShowMoreContext } from "./ShowMoreContext";

interface ShowMoreButtonProps {
  /**
   * A button to use with ShowMore
   * @default '<Button />'
   */
  children: ReactElement<React.ComponentProps<typeof Button>>;
  /**
   * Text to show when content is collapsed.
   * @default "Vis mer"
   */
  collapsedText?: string;
  /**
   * Text to show when content is expanded.
   * @default "Vis mindre"
   */
  expandedText?: string;
}

const ShowMoreButton = ({
  children: child = <Button />,
  collapsedText = "Vis mer",
  expandedText = "Vis mindre",
}: ShowMoreButtonProps) => {
  const { isExpanded, setIsExpanded, setShouldFlash, setShouldScroll } =
    useShowMoreContext();

  const ChevronIcon = isExpanded ? ChevronUpIcon : ChevronDownIcon;

  const toggleExpansion = () => {
    setIsExpanded((previous) => !previous);
    if (isExpanded) {
      setShouldFlash(true);
      setShouldScroll(true);
    } else {
      setShouldFlash(false);
      setShouldScroll(false);
    }
  };

  const buttonText = isExpanded ? expandedText : collapsedText;

  const { className, ...restProps } = child?.props ?? {};

  const childClone = React.cloneElement(
    React.Children.only(child),
    {
      className: cl(styles.showMoreButton, className),
      onClick: toggleExpansion,
      icon: <ChevronIcon aria-hidden />,
      ...restProps,
    } as Record<string, unknown>,
    buttonText,
  );
  return React.isValidElement(childClone) ? childClone : null;
};

export default ShowMoreButton;

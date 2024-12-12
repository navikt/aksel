import { ReactNode } from "@tanstack/react-router";
import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/darkside-js";

const ScLink = styled.a`
  color: ${tokens.TextAccent};

  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }

  &[data-inverted="true"] {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &[data-neutral="true"] {
    color: ${tokens.TextDefault};
  }
`;

export const Link = ({
  href = "#",
  inverted = false,
  neutral = false,
  ...rest
}: {
  children: ReactNode;
  inverted?: boolean;
  neutral?: boolean;
  className?: string;
  href?: string;
}) => {
  return (
    <ScLink
      href={href}
      {...rest}
      data-neutral={neutral}
      data-inverted={inverted}
    />
  );
};

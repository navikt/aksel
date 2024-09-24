import { ReactNode } from "@tanstack/react-router";
import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/dist/darkside/tokens";

const ScLink = styled.a`
  color: ${tokens.TextAccentSubtle};

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
`;

export const Link = ({
  href = "#",
  inverted = false,
  ...rest
}: {
  children: ReactNode;
  inverted?: boolean;
  href?: string;
  className?: string;
}) => {
  return <ScLink href={href} {...rest} data-inverted={inverted} />;
};

import { ReactNode } from "@tanstack/react-router";
import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/dist/darkside/tokens";

export const Link = ({
  href = "#",
  ...rest
}: {
  children: ReactNode;
  inverted?: boolean;
  href?: string;
  className?: string;
}) => {
  const _Link = styled.a<{ inverted?: boolean }>`
    color: ${tokens.Accent900};
    text-decoration: ${(props) => (props.inverted ? "none" : "underline")};
    &:hover {
      text-decoration: ${(props) => (props.inverted ? "underline" : "none")};
    }
  `;

  return <_Link href={href} {...rest} />;
};

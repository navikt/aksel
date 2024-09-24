import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/dist/darkside/tokens";

const ScButton = styled.button`
  display: inline-block;
  font-size: 18px;
  border-radius: 4px;
  padding-inline: 1.25rem;
  padding-block: 0.25rem;
  min-height: 48px;
  width: fit-content;

  &[data-variant="primary"] {
    color: ${tokens.ContrastAccent};
    background-color: ${tokens.BgAccentStrong};

    &:hover {
      background-color: ${tokens.BgAccentStrongHover};
    }

    &:active {
      background-color: ${tokens.BgAccentStrongActive};
    }
  }

  &[data-variant="secondary"] {
    color: ${tokens.TextAccentSubtle};
    box-shadow: inset 0 0 0 2px ${tokens.BorderAccent};

    &:hover {
      background-color: ${tokens.BgAccentHover};
    }

    &:active {
      background-color: ${tokens.BgAccentModerateActive};
    }
  }
`;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export const Button = ({
  children,
  variant = "primary",
  ...rest
}: ButtonProps) => {
  return (
    <ScButton {...rest} data-variant={variant}>
      {children}
    </ScButton>
  );
};

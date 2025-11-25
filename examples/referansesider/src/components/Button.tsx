import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/js";

const ScButton = styled.button`
  display: inline-block;
  font-size: 18px;
  border-radius: 4px;
  padding-inline: 1.25rem;
  padding-block: 0.25rem;
  min-height: 48px;
  width: fit-content;

  &[data-variant="primary"] {
    color: ${tokens.TextAccentContrast};
    background-color: ${tokens.BgAccentStrong};

    &:hover {
      background-color: ${tokens.BgAccentStrongHover};
    }

    &:active {
      background-color: ${tokens.BgAccentStrongPressed};
    }
  }

  &[data-variant="secondary"] {
    color: ${tokens.TextAccentSubtle};
    box-shadow: inset 0 0 0 2px ${tokens.BorderAccent};

    &:hover {
      background-color: ${tokens.BgAccentModerateHover};
    }

    &:active {
      background-color: ${tokens.BgAccentModeratePressed};
    }
  }

  &[data-size="small"] {
    min-height: fit-content;
    padding-inline: 0.75rem;
    > span {
      font-size: 16px;
      line-height: 24px;
      display: block;
    }
  }
`;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  size?: "default" | "small";
};

export const Button = ({
  children,
  variant = "primary",
  size = "default",
  ...rest
}: ButtonProps) => {
  return (
    <ScButton {...rest} data-variant={variant} data-size={size}>
      <span>{children}</span>
    </ScButton>
  );
};

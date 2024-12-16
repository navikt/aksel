import { ReactNode } from "@tanstack/react-router";
import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/darkside-js";
import { Link } from "./Link";

const ScLink = styled(Link)`
  font-weight: 500;
  border-radius: 6px;
  padding-block: 14px;
  padding-inline: 12px;
  &:hover {
    background-color: ${tokens.Accent300};
  }
  && {
    text-decoration: none;
  }
`;

const ScScLink = styled(Link)`
  font-weight: 500;
  padding-block: 14px;
  padding-inline: 12px;
  &:hover {
    border-bottom: 4px solid ${tokens.BorderSubtle};
  }
  && {
    color: ${tokens.TextDefault};
    text-decoration: none;
  }
  &[data-active] {
    border-bottom: 4px solid ${tokens.Accent900};
  }
`;

const ScFooter = styled.footer`
  background-color: ${tokens.BrandBlue900};
`;

export const Dekoratoren = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="flex flex-nowrap justify-between max-w-[1440px] m-auto px-4">
        <div className="flex gap-4 items-baseline h-12">
          <span className="text-red-600 font-bold">NAV</span>
          <div className="flex gap-4">
            <ScScLink data-active>Privat</ScScLink>
            <ScScLink>Arbeidsgiver</ScScLink>
            <ScScLink>Samarbeidspartner</ScScLink>
          </div>
        </div>

        <div className="flex gap-4">
          <ScLink>Logg inn</ScLink>
          <ScLink>Meny</ScLink>
          <ScLink>Søk</ScLink>
        </div>
      </div>
      {children}
      <ScFooter>
        <span>this</span>
        <div>is</div>
        <Link>the footer</Link>
      </ScFooter>
    </div>
  );
};

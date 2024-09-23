import { ReactNode } from "@tanstack/react-router";
import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/dist/darkside/tokens";
import { Link } from "./Link";
import { Page } from "./Page";

export const Dekoratoren = ({ children }: { children: ReactNode }) => {
  const _link = styled(Link)`
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

  const __link = styled(Link)`
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

  const _footer = styled.footer`
    background-color: ${tokens.BrandThree900};
  `;

  return (
    <div>
      <div className="flex flex-nowrap justify-between w-[150ch] m-auto">
        <div className="flex gap-4 items-baseline h-12">
          <span className="text-red-600 font-bold">NAV</span>
          <div className="flex gap-4">
            <__link data-active>Privat</__link>
            <__link>Arbeidsgiver</__link>
            <__link>Samarbeidspartner</__link>
          </div>
        </div>

        <div className="flex gap-4">
          <_link>Logg inn</_link>
          <_link>Meny</_link>
          <_link>Søk</_link>
        </div>
      </div>
      <Page>{children}</Page>
      <_footer>
        <span>this</span>
        <div>is</div>
        <Link>the footer</Link>
      </_footer>
    </div>
  );
};

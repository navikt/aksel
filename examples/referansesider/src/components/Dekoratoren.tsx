import { ReactNode } from "@tanstack/react-router";
import styled from "styled-components";
import {
  EnterIcon,
  MagnifyingGlassIcon,
  MenuHamburgerIcon,
} from "@navikt/aksel-icons";
import { Button, HStack, Link } from "@navikt/ds-react";
import * as tokens from "@navikt/ds-tokens/darkside-js";
import NavLogo from "../assets/NavLogo";

const ScFooter = styled.footer`
  background-color: ${tokens.BrandBlue900};
`;

export const Dekoratoren = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="flex flex-nowrap justify-between max-w-[1440px] m-auto px-4">
        <HStack gap="space-8">
          <Link>
            <NavLogo title="Til forsiden" />
          </Link>
          <HStack gap="space-8" height="2rem">
            <Button variant="tertiary">Privat</Button>
            <Button variant="tertiary">Arbeidsgiver</Button>
            <Button variant="tertiary">Samarbeidspartner</Button>
          </HStack>
        </HStack>

        <div className="flex gap-4">
          <Button variant="tertiary" icon={<EnterIcon aria-hidden />}>
            Logg inn
          </Button>
          <Button variant="tertiary" icon={<MenuHamburgerIcon aria-hidden />}>
            Meny
          </Button>
          <Button variant="tertiary" icon={<MagnifyingGlassIcon aria-hidden />}>
            Søk
          </Button>
        </div>
      </div>
      {children}
      <ScFooter>
        <span>this</span>
        <div>is</div>
        <Link href="#">the footer</Link>
      </ScFooter>
    </div>
  );
};

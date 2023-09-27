import React from "react";
import { Heading, Label } from "../../typography";
import { Box } from "../box";
import { VStack } from "../stack";
import { Link } from "../../link";

const LinkElement = ({ children }) => {
  return (
    <Label as="li" className="sidebarlink">
      {children}
    </Label>
  );
};

export function Sidebar() {
  return (
    <VStack gap="4" className="sidebar">
      <ContentPanel />
      <NewsPanel />
    </VStack>
  );
}

export function ContentPanel() {
  return (
    <Box
      as="nav"
      aria-label="innhold"
      paddingInline="2"
      paddingBlock="8 4"
      background="surface-default"
      borderRadius="medium"
    >
      <Box paddingBlock="0 4" paddingInline="2 0">
        <Heading size="medium">Innhold</Heading>
      </Box>
      <ul className="reset-list">
        <LinkElement>Kort om dagpenger</LinkElement>
        <LinkElement>Hvem kan få?</LinkElement>
        <LinkElement>Hvor mye kan du få?</LinkElement>
        <LinkElement>Når utbetales pengene?</LinkElement>
        <LinkElement>Hvor lenge kan du få?</LinkElement>
        <LinkElement>Slik søker du</LinkElement>
        <LinkElement>Hva må du gjøre for å få dagpenger?</LinkElement>
        <LinkElement>Gi beskjed om endringer</LinkElement>
        <LinkElement>Jobb i kombinasjon med dagpenger</LinkElement>
        <LinkElement>Utdanning og opplæring</LinkElement>
        <LinkElement>Ferie og utenlandsopphold</LinkElement>
        <LinkElement>Slik klager du</LinkElement>
      </ul>
    </Box>
  );
}

export function NewsPanel() {
  return (
    <Box
      paddingBlock="4"
      paddingInline="2"
      background="surface-default"
      aria-label="Nyttig å vite"
      as="section"
      borderRadius="medium"
    >
      <Box paddingBlock="0 3" paddingInline="2">
        <Heading size="small">Nyttig å vite</Heading>
      </Box>
      <nav aria-label="innhold">
        <ul className="reset-list">
          <Box paddingBlock="2" paddingInline="2">
            <Link>Hva sier loven?</Link>
          </Box>
        </ul>
      </nav>
    </Box>
  );
}

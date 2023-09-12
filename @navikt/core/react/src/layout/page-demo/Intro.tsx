import { LinkIcon } from "@navikt/aksel-icons";
import React from "react";
import { CopyButton } from "../../copybutton";
import { Heading, BodyLong, Detail, Label } from "../../typography";
import { Box } from "../box";
import { HStack, VStack } from "../stack";

export function IntroCard() {
  return (
    <Box background="bg-default" padding="10">
      <VStack gap="6">
        <VStack gap="2" align="start">
          <Heading size="large">Kort om dagpenger</Heading>
          <CopyButton
            copyText="#"
            text="Kopier lenke"
            size="small"
            icon={<LinkIcon aria-hidden />}
          />
        </VStack>
        <BodyLong>
          Dagpenger er en pengestøtte du kan få hvis du er arbeidsledig eller
          permittert.
        </BodyLong>
        <div>
          <Label as="p" spacing>
            Dagpenger er aktuelt for deg som
          </Label>
          <HStack wrap gap="4">
            <Box
              borderRadius="full"
              shadow="small"
              borderWidth="1"
              borderColor="border-subtle"
              paddingBlock="1"
              paddingInline="2"
            >
              <HStack gap="2" align="center">
                <Box
                  borderRadius="full"
                  borderWidth="4"
                  borderColor="border-success"
                />
                <Detail as="span">Er arbeidsledig eller permitert</Detail>
              </HStack>
            </Box>
            <Box
              borderRadius="full"
              shadow="small"
              borderWidth="1"
              borderColor="border-subtle"
              paddingBlock="1"
              paddingInline="2"
            >
              <HStack gap="2" align="center">
                <Box
                  borderRadius="full"
                  borderWidth="4"
                  borderColor="border-success"
                />
                <Detail as="span">Søker jobb</Detail>
              </HStack>
            </Box>
            <Box
              borderRadius="full"
              shadow="small"
              borderWidth="1"
              borderColor="border-subtle"
              paddingBlock="1"
              paddingInline="2"
            >
              <HStack gap="2" align="center">
                <Box
                  borderRadius="full"
                  borderWidth="4"
                  borderColor="border-success"
                />
                <Detail as="span">Trenger hjelp til å komme i jobb</Detail>
              </HStack>
            </Box>
          </HStack>
        </div>
      </VStack>
    </Box>
  );
}

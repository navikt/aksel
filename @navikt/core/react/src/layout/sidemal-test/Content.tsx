import { LinkIcon } from "@navikt/aksel-icons";
import React from "react";
import { Accordion } from "../../accordion";
import { CopyButton } from "../../copybutton";
import { ReadMore } from "../../read-more";
import { Heading, BodyLong } from "../../typography";
import { Box } from "../box";
import { VStack } from "../stack";
import { AvatarPanel } from "./AvatarPanel";
import { List } from "../../list";
import { Link } from "../../link";

export function Content() {
  return (
    <AvatarPanel>
      <Box paddingBlock="0 6">
        <VStack gap="3" align="start">
          <Heading size="large">Hvem kan få?</Heading>
          <CopyButton
            copyText="#"
            text="Kopier lenke"
            size="small"
            icon={<LinkIcon aria-hidden />}
          />
        </VStack>
      </Box>
      <BodyLong weight="semibold">
        Har du blitt arbeidsledig eller permittert, kan du få dagpenger fra NAV
        hvis alt dette gjelder for deg:
      </BodyLong>
      <List>
        <List.Item>
          Du har mistet minst 50 prosent av den totale arbeidstiden din.
        </List.Item>
        <List.Item>
          Du har fått inntekten din helt eller delvis redusert.
        </List.Item>
        <List.Item>
          Du har hatt en inntekt på minst 177 930 kroner (1,5 G - Grunnbeløp) de
          siste 12 månedene, eller minst 355 860 kroner (3 G) de siste 36
          månedene.
        </List.Item>
        <List.Item>Du er under 67 år.</List.Item>
      </List>
      <Box paddingBlock="0 7">
        <ReadMore header="Hvilke inntekter gir rett til dagpenger?">
          Vi bruker disse inntektene for å finne ut om du har rett til
          dagpenger:
          <List>
            <List.Item>Arbeidsinntekt</List.Item>
            <List.Item>Foreldrepenger som arbeidstaker</List.Item>
            <List.Item>Svangerskapspenger som arbeidstaker</List.Item>
            <List.Item>
              Svangerskapsrelaterte sykepenger som arbeidstaker
            </List.Item>
          </List>
          <BodyLong>
            Inntekt som selvstendig næringsdrivende regnes ikke som
            arbeidsinntekt.
          </BodyLong>
        </ReadMore>
      </Box>
      <BodyLong weight="semibold">For å få dagpenger må du:</BodyLong>
      <List>
        <List.Item>søke dagpenger</List.Item>
        <List.Item>registrere deg som arbeidssøker</List.Item>
        <List.Item>
          oppholde deg i Norge og være medlem av folketrygden
        </List.Item>
        <List.Item>sende meldekort hver 14. dag</List.Item>
        <List.Item>være reell arbeidssøker</List.Item>
      </List>
      <BodyLong spacing>
        Les mer om <Link href="#">hva du må gjøre for å få dagpenger.</Link>
      </BodyLong>
      <Box paddingBlock="0 7">
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>Har du flere jobber?</Accordion.Header>
            <Accordion.Content>
              Det er den totale arbeidstiden din som må være redusert med minst
              50 prosent. Har du flere jobber må du samlet sett ha mistet minst
              50 prosent av arbeidstiden din for å kunne få dagpenger.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Header>Oppholder du deg i utlandet?</Accordion.Header>
            <Accordion.Content>
              Det er den totale arbeidstiden din som må være redusert med minst
              50 prosent. Har du flere jobber må du samlet sett ha mistet minst
              50 prosent av arbeidstiden din for å kunne få dagpenger.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Header>Mottar du annen pengestøtte?</Accordion.Header>
            <Accordion.Content>
              Det er den totale arbeidstiden din som må være redusert med minst
              50 prosent. Har du flere jobber må du samlet sett ha mistet minst
              50 prosent av arbeidstiden din for å kunne få dagpenger.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Box>
      <Heading spacing level="3" size="medium">
        Hvis du er arbeidsledig
      </Heading>
      <BodyLong spacing>
        Grunnen til at du mistet jobben din kan få betydning for dagpengene
        dine. Sjekk hvilke regler som gjelder for disse situasjonene.
      </BodyLong>
      <Heading spacing level="3" size="medium">
        Hvis du er permittert
      </Heading>
      <BodyLong spacing>
        Som permittert har du rett til lønn fra arbeidsgiveren din de 15 første
        arbeidsdagene du er permittert. Hvis du er delvis permittert, kan de 15
        arbeidsdagene med lønn strekke seg over en lengre periode. Etter denne
        perioden med lønn, kan du få dagpenger.
      </BodyLong>
      <BodyLong spacing>
        For at du skal ha rett til dagpenger som permittert, må
        permitteringsårsaken være mangel på arbeid i bedriften eller andre
        forhold som arbeidsgiveren din ikke kan påvirke. Grunnen til at du
        permitteres kan derfor ha betydning for din rett til dagpenger. NAV
        vurderer om permitteringsårsaken gir deg rett til dagpenger.
      </BodyLong>
    </AvatarPanel>
  );
}

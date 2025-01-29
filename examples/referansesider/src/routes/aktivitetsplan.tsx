import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import { StarIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  BodyShort,
  Button,
  Detail,
  HGrid,
  HStack,
  Heading,
  List,
  Select,
  Tag,
  VStack,
} from "@navikt/ds-react";
import { ListItem } from "@navikt/ds-react/List";
import * as tokens from "@navikt/ds-tokens/darkside-js";
import SykepengerIcon from "../assets/SykepengerIcon";
import { Dekoratoren } from "../components/Dekoratoren";
import { Page } from "../components/Page";
import { ActivityCard } from "../components/aktivitetsplan/ActivityCard";
import { ActivityColumn } from "../components/aktivitetsplan/ActivityColumn";
import { MainCard } from "../components/aktivitetsplan/MainCard";
import { Activity, activities } from "../data/activities";

let BlueDotHeader;
{
  const ScBlueDot = styled.div`
    background-color: ${tokens.Accent900};
  `;

  BlueDotHeader = ({
    children,
    dot,
  }: {
    children: string;
    level?: 2 | 3;
    dot?: boolean;
  }) => {
    return (
      <div className="flex items-center">
        {dot && <ScBlueDot className="w-[10px] h-[10px] mr-1 rounded-full" />}
        <BodyShort as="span" size="small" weight="semibold">
          {children}
        </BodyShort>
      </div>
    );
  };
}

type Board = {
  cards: Activity[];
  column: string;
  helpText: string;
}[];

const board: Board = [
  {
    column: "Forslag",
    cards: [],
    helpText: `Her kan du legge til en aktivitet du tror du kommer til å gjøre. Dra aktiviteten til "Planlegger" når du bestemmer deg for å gjøre aktiviteten.`,
  },
  {
    column: "Planlagt",
    cards: [activities[0], activities[1], activities[2]],
    helpText: `Her kan du legge aktiviteter som du har bestemt deg for å gjøre, men ikke har begynt på enda.`,
  },
  {
    column: "Gjennomfører",
    cards: [activities[3], activities[4], activities[5]],
    helpText: `Aktiviteter som du holder på med, kan du sette til "Gjennomfører".`,
  },
  {
    column: "Fullført",
    cards: [activities[6]],
    helpText: `Dra aktiviteter hit som du er ferdig med. Flytter du en aktivitet til "Fullført", blir den låst og kan ikke redigeres. Hvis du angrer, kan du legge til en ny aktivitet.`,
  },
  {
    column: "Avbrutt",
    cards: [],
    helpText: `Dra aktiviteter hit som du avslutter eller ikke begynner på. Flytter du en aktivitet til "Avbrutt", blir den låst og kan ikke redigeres. Hvis du angrer, kan du legge til en ny aktivitet.`,
  },
];

const AktivitetsplanPage = () => {
  return (
    <Dekoratoren>
      <Page options={{ width: "medium", footer: "none" }}>
        <Heading as="h1" size="xlarge">
          Aktivitetsplan
        </Heading>
        <MainCard>
          <HStack align="center" gap="space-32">
            <div style={{ height: "96px", width: "96px" }}>
              <SykepengerIcon />
            </div>
            <VStack gap="space-16" marginBlock="0 space-4">
              <Heading as="h2" size="medium">
                Mitt mål
              </Heading>
              <div>
                <BodyLong>
                  Skriv noen ord om hva som er målet ditt slik at vi kan veilede
                  deg bedre.
                </BodyLong>
                <List>
                  <ListItem>
                    Hva er målet på kort sikt? Hva er målet på lengre sikt?
                  </ListItem>
                  <ListItem>Hva slags arbeidsoppgaver ønsker du deg?</ListItem>
                </List>
                <Button variant="secondary" size="small">
                  Sett et mål
                </Button>
              </div>
            </VStack>
          </HStack>
        </MainCard>
        <div className="flex justify-between mt-6">
          <div className="flex gap-4">
            <Button icon={<StarIcon />}>Legg til aktivitet</Button>
            <Button variant="secondary">Filtrer</Button>
          </div>
          <Select label="Velg periode" hideLabel>
            <option value="dog">Nåværende periode</option>
            <option value="dog2">Cat</option>
            <option value="dog3">Border Collie</option>
            <option value="dog4">Maine Coon</option>
          </Select>
        </div>
      </Page>
      <Page options={{ width: "xlarge" }}>
        <HGrid as="div" gap="space-16" columns={{ md: "repeat(5, 1fr)" }}>
          {board.map(({ column, cards, helpText }) => (
            <ActivityColumn key={column} title={column} helpText={helpText}>
              {cards.map(({ category, hasChange, title, date, tag, id }) => (
                <ActivityCard key={`${id}`}>
                  <div>
                    <Detail uppercase>{category}</Detail>
                    <Link
                      className="activity-card__link"
                      to={`/aktivitetsplan/${id}`}
                    >
                      <BlueDotHeader dot={hasChange} level={3}>
                        {title}
                      </BlueDotHeader>
                    </Link>
                  </div>
                  {date && (
                    <BodyShort>
                      {date.start}
                      {date.end && ` - ${date.end}`}
                    </BodyShort>
                  )}
                  {tag && (
                    <Tag variant={tag.variant} size="small">
                      {tag.text}
                    </Tag>
                  )}
                </ActivityCard>
              ))}
            </ActivityColumn>
          ))}
        </HGrid>
      </Page>
      <Outlet />
    </Dekoratoren>
  );
};

export const Route = createFileRoute("/aktivitetsplan")({
  component: AktivitetsplanPage,
});

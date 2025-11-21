import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
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
  Page,
  Select,
  Tag,
  VStack,
} from "@navikt/ds-react";
import { ListItem } from "@navikt/ds-react/List";
import * as tokens from "@navikt/ds-tokens/darkside-js";
import SykepengerIcon from "../assets/SykepengerIcon";
import { ActivityCard } from "../components/aktivitetsplan/ActivityCard";
import { ActivityColumn } from "../components/aktivitetsplan/ActivityColumn";
import { MainCard } from "../components/aktivitetsplan/MainCard";
import { Activity, activities } from "../data/activities";
import { ThemeProviderContext } from "../theme/ThemeContext";

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
  const { theme } = useContext(ThemeProviderContext);
  return (
    <Page>
      <VStack gap="space-32" marginBlock="space-20">
        <Page.Block width="lg" gutters>
          <VStack gap="space-32">
            <Heading as="h1" size="xlarge">
              Aktivitetsplan
            </Heading>
            <MainCard>
              <HStack align="center" gap="space-32">
                <div style={{ height: "96px", width: "96px" }}>
                  <SykepengerIcon darkmode={theme === "dark"} />
                </div>
                <VStack gap="space-16" marginBlock="0 space-4" align="start">
                  <Heading as="h2" size="medium">
                    Mitt mål
                  </Heading>
                  <div>
                    <BodyLong>
                      Skriv noen ord om hva som er målet ditt slik at vi kan
                      veilede deg bedre.
                    </BodyLong>
                    <List>
                      <ListItem>
                        Hva er målet på kort sikt? Hva er målet på lengre sikt?
                      </ListItem>
                      <ListItem>
                        Hva slags arbeidsoppgaver ønsker du deg?
                      </ListItem>
                    </List>
                  </div>
                  <Button variant="secondary" size="small">
                    Sett et mål
                  </Button>
                </VStack>
              </HStack>
            </MainCard>
            <HStack align="center" justify="space-between" gap="space-16">
              <HStack gap="space-16">
                <Button as={Link} to="/aktivitetsplan/ny" icon={<StarIcon />}>
                  Legg til aktivitet
                </Button>
                <Button variant="secondary">Filtrer</Button>
              </HStack>
              <Select label="Velg periode" hideLabel>
                <option value="dog">Nåværende periode</option>
                <option value="2017-01-30 - 2017-12-13">
                  30. jan. 2017 - 31. des. 2017
                </option>
                <option value="2016-01-30 - 2016-12-31">
                  30. jan. 2016 - 31. des. 2016
                </option>
              </Select>
            </HStack>
          </VStack>
        </Page.Block>
        <Page.Block width="2xl" gutters>
          <HGrid
            as="div"
            gap="space-16"
            columns={{ xl: "repeat(5, 1fr)" }}
            marginBlock="space-16"
          >
            {board.map(({ column, cards, helpText }) => (
              <ActivityColumn key={column} title={column} helpText={helpText}>
                {cards.map(({ category, hasChange, title, date, tag, id }) => (
                  <ActivityCard key={`${id}`}>
                    <div>
                      <Detail textColor="subtle" uppercase>
                        {category}
                      </Detail>
                      <Link
                        className="activity-card__link"
                        to="/aktivitetsplan/$activityId/"
                        params={{ activityId: id }}
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
                      /* @ts-expect-error Temp ignore until variant is optional */
                      <Tag data-color={tag.color} size="small">
                        {tag.text}
                      </Tag>
                    )}
                  </ActivityCard>
                ))}
              </ActivityColumn>
            ))}
          </HGrid>
        </Page.Block>
        <Outlet />
      </VStack>
    </Page>
  );
};

export const Route = createFileRoute("/aktivitetsplan")({
  component: AktivitetsplanPage,
});

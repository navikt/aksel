import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import styled from "styled-components";
import {
  BodyShort,
  Detail,
  HGrid,
  Heading,
  Select,
  Tag,
  VStack,
} from "@navikt/ds-react";
import * as tokens from "@navikt/ds-tokens/darkside-js";
import SykepengerIcon from "../assets/SykepengerIcon";
import { Button } from "../components/Button";
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
    level = 2,
  }: {
    children: string;
    level?: 2 | 3;
    dot?: boolean;
  }) => {
    const Header: keyof JSX.IntrinsicElements = `h${level}`;
    return (
      <div className="flex items-center">
        {dot && <ScBlueDot className="w-[10px] h-[10px] mr-1 rounded-full" />}
        <Header
          className={clsx("font-semibold", {
            "text-2xl": level === 2,
          })}
        >
          {children}
        </Header>
      </div>
    );
  };
}

type Board = {
  column: string;
  cards: Activity[];
}[];

const board: Board = [
  {
    column: "Forslag",
    cards: [],
  },
  {
    column: "Planlagt",
    cards: [activities[0], activities[1], activities[2]],
  },
  {
    column: "Gjennomfører",
    cards: [activities[3], activities[4], activities[5]],
  },
  {
    column: "Fullført",
    cards: [activities[6]],
  },
  {
    column: "Avbrutt",
    cards: [],
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
          <SykepengerIcon />
          <VStack gap="space-16" marginBlock="0 space-4">
            <BlueDotHeader dot level={2}>
              Mitt mål
            </BlueDotHeader>
            <BodyShort>Jeg vil bli sjørøver</BodyShort>
            <Button variant="secondary" size="small">
              Endre målet
            </Button>
          </VStack>
        </MainCard>
        <div className="flex justify-between mt-6">
          <div className="flex gap-4">
            <Button>Legg til aktivitet</Button>
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
        <HGrid as="div" gap="space-8" columns={{ md: "repeat(5, 1fr)" }}>
          {board.map(({ column, cards }) => (
            <ActivityColumn key={column} title={column}>
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

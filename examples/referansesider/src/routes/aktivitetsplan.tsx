import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import styled from "styled-components";
import {
  BodyShort,
  Detail,
  HGrid,
  Heading,
  Select,
  Tag,
  TagProps,
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

type Activities = {
  column: string;
  cards: {
    category: string;
    title: string;
    date?: { start: string; end?: string };
    hasChange?: boolean;
    tag?: { variant: TagProps["variant"]; text: string };
  }[];
}[];

const activities: Activities = [
  {
    column: "Forslag",
    cards: [],
  },
  {
    column: "Planlagt",
    cards: [
      {
        category: "Stilling fra Nav",
        title: "Servitør",
        hasChange: true,
        tag: {
          variant: "success",
          text: "Venter på å bli kontaktet",
        },
      },
      {
        category: "Behandling",
        title: "Medisinsk behandling",
        date: {
          start: "13.09.2022",
          end: "14.09.2022",
        },
        tag: { variant: "info-filled", text: "Avtalt med Nav" },
      },
      {
        category: "Møte med Nav",
        title: "Beste møtet ever",
        date: {
          start: "21.08.2030",
        },
      },
    ],
  },
  {
    column: "Gjennomfører",
    cards: [
      {
        category: "Stilling fra Nav",
        hasChange: true,
        title: "Servitør",
        tag: {
          variant: "success",
          text: "Venter på å bli kontaktet",
        },
      },
      {
        category: "Stilling fra Nav",
        hasChange: true,
        title: "Assisterende skipskokk",
        tag: {
          variant: "success",
          text: "Venter på å bli kontaktet",
        },
      },
      {
        category: "Stilling fra Nav",
        hasChange: true,
        title: "Servitør",
        tag: {
          variant: "success",
          text: "Venter på å bli kontaktet",
        },
      },
    ],
  },
  {
    column: "Fullført",
    cards: [
      {
        category: "Stilling fra Nav",
        title: "Greve av Gral",
        tag: {
          variant: "neutral",
          text: "Ikke fått jobben",
        },
      },
    ],
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
          {activities.map(({ column, cards }) => (
            <ActivityColumn key={column} title={column}>
              {cards.map(({ category, hasChange, title, date, tag }) => (
                <ActivityCard key={`${title} ${date}`}>
                  <div>
                    <Detail uppercase>{category}</Detail>
                    <BlueDotHeader dot={hasChange} level={3}>
                      {title}
                    </BlueDotHeader>
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
    </Dekoratoren>
  );
};

export const Route = createFileRoute("/aktivitetsplan")({
  component: AktivitetsplanPage,
});

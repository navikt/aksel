import { ReactNode, createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import styled from "styled-components";
import {
  BodyShort,
  Box,
  Detail,
  Stack,
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

const Header1 = styled.h1`
  font-size: 40px;
  font-weight: 600;
`;

let ActivityColumn;
{
  ActivityColumn = ({
    children,
    title,
  }: {
    children: ReactNode;
    title: string;
  }) => {
    return (
      <Box.New
        background="accent"
        borderRadius="medium"
        borderWidth="1"
        padding="space-12"
      >
        <VStack gap="4">
          <h2>{title}</h2>
          {children}
        </VStack>
      </Box.New>
    );
  };
}

/*let ActivityCard;
{
  const ScCard = styled.div`
    display: flex;
    flex-flow: column nowrap;
    gap: 4px;
    border: 1px solid ${tokens.BorderDefault};
    border-radius: 8px;
    background-color: ${tokens.BgDefault};
    padding: 16px;
    width: 100%;
  `;

  ActivityCard = ({
    children,
    title,
  }: {
    children: ReactNode;
    title: string;
  }) => {
    return (
      <ScCard>
        <h3 className="uppercase text-sm text-gray-600">{title}</h3>
        {children}
      </ScCard>
    );
  };
}*/

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

const ScMainCard = styled.div`
  border: 2px dashed ${tokens.BorderDefault};
  border-radius: 8px;
`;

const ScSelect = styled.select`
  background-color: ${tokens.BgInput};
  border: 1px solid ${tokens.BorderDefault};
  border-radius: 4px;
  padding: 8px;
  min-width: 300px;
`;

type Activities = {
  column: string;
  cards: {
    category: string;
    title: string;
    tag?: { variant: TagProps["variant"]; text: string };
    date?: { start: string; end?: string };
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
    cards: [],
  },
  {
    column: "Fullført",
    cards: [],
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
        <Header1>Aktivitetsplan</Header1>
        <ScMainCard className="p-2 flex mt-6">
          <SykepengerIcon className="w-40 relative translate-x-5 translate-y-3" />
          <div className="flex flex-col gap-2 justify-between my-2">
            <BlueDotHeader dot level={2}>
              Mitt mål
            </BlueDotHeader>
            <p>jeg vil bli sjørøver</p>
            <Button variant="secondary" size="small">
              Endre målet
            </Button>
          </div>
        </ScMainCard>
        <div className="flex justify-between mt-6">
          <div className="flex gap-4">
            <Button>Legg til aktivitet</Button>
            <Button variant="secondary">Filtrer</Button>
          </div>
          <ScSelect>
            <option value="dog">Nåværende periode</option>
            <option value="dog2">Cat</option>
            <option value="dog3">Border Collie</option>
            <option value="dog4">Maine Coon</option>
          </ScSelect>
        </div>
      </Page>
      <Page options={{ width: "xlarge" }}>
        <Stack gap="space-8" direction={{ xs: "column", md: "row" }}>
          {activities.map(({ column, cards }) => (
            <ActivityColumn key={column} title={column}>
              {cards.map(({ category, title, date, tag }) => (
                <ActivityCard key={`${title} ${date}`}>
                  <Detail uppercase>{category}</Detail>
                  <BlueDotHeader dot level={3}>
                    {title}
                  </BlueDotHeader>
                  {date && (
                    <BodyShort>
                      {date.start}
                      {date.end && ` - ${date.end}`}
                    </BodyShort>
                  )}
                  {tag && <Tag variant={tag.variant}>{tag.text}</Tag>}
                </ActivityCard>
              ))}
            </ActivityColumn>
          ))}
        </Stack>
      </Page>
    </Dekoratoren>
  );
};

export const Route = createFileRoute("/aktivitetsplan")({
  component: AktivitetsplanPage,
});

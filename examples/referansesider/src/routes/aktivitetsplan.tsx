import { ReactNode, createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/dist/darkside/tokens";
import SykepengerIcon from "../assets/SykepengerIcon";
import { Button } from "../components/Button";
import { Dekoratoren } from "../components/Dekoratoren";
import { Page } from "../components/Page";
import { Tag } from "../components/Tag";

const Header1 = styled.h1`
  font-size: 40px;
  font-weight: 600;
`;

let ActivityColumn;
{
  const ScCol = styled.div`
    display: flex;
    flex-flow: column nowrap;
    gap: 10px;
    width: 300px;
    height: fit-content;
    border-radius: 8px;
    background-color: ${tokens.BgNeutral};
    padding: 8px;
    padding-bottom: 16px;
  `;

  ActivityColumn = ({
    children,
    title,
  }: {
    children: ReactNode;
    title: string;
  }) => {
    return (
      <ScCol>
        <h2>{title}</h2>
        {children}
      </ScCol>
    );
  };
}

let ActivityCard;
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
}

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

const AktivitetsplanPage = () => {
  return (
    <Dekoratoren>
      <Page options={{ width: "medium", footer: "none" }}>
        <Header1>Aktivitetsplan</Header1>
        <div className="p-2 border border-black rounded-xl flex">
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
        </div>
      </Page>
      <Page options={{ width: "xlarge" }}>
        <div className="flex gap-5 justify-center">
          <ActivityColumn title="Forslag">
            <ActivityCard title="Servitør">
              <BlueDotHeader dot level={3}>
                Servitør (ikke svart)
              </BlueDotHeader>
              <Tag $variant="success">Venter på å bli kontaktet</Tag>
            </ActivityCard>
            <ActivityCard title="Servitør">
              <div>test</div>
              <Tag $variant="info-strong">Avtalt med NAV</Tag>
            </ActivityCard>
          </ActivityColumn>
          <ActivityColumn title="Forslag">
            <ActivityCard title="Servitør">
              <div>test</div>
            </ActivityCard>
          </ActivityColumn>
          <ActivityColumn title="Forslag">
            <ActivityCard title="Servitør">
              <div>test</div>
            </ActivityCard>
            <ActivityCard title="Servitør">
              <div>test</div>
            </ActivityCard>
            <ActivityCard title="Servitør">
              <div>test</div>
            </ActivityCard>
          </ActivityColumn>
          <ActivityColumn title="Forslag">
            <ActivityCard title="Servitør">
              <div>test</div>
            </ActivityCard>
            <ActivityCard title="Servitør">
              <div>test</div>
            </ActivityCard>
          </ActivityColumn>
          <ActivityColumn title="Forslag">
            <ActivityCard title="Servitør">
              <div>test</div>
              <Tag $variant="info-strong">Avtalt med NAV</Tag>
              <Tag $variant="neutral-strong">Slettet</Tag>
            </ActivityCard>
          </ActivityColumn>
        </div>
      </Page>
    </Dekoratoren>
  );
};

export const Route = createFileRoute("/aktivitetsplan")({
  component: AktivitetsplanPage,
});

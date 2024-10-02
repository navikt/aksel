import { ReactNode, createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/dist/darkside/tokens";
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

const AktivitetsplanPage = () => {
  return (
    <Dekoratoren>
      <Page options={{ width: "medium", footer: "none" }}>
        <Header1>Aktivitetsplan</Header1>
        <div className="p-2 border border-black rounded-xl">card</div>
      </Page>
      <Page options={{ width: "xlarge" }}>
        <div className="flex gap-5 justify-center">
          <ActivityColumn title="Forslag">
            <ActivityCard title="Servitør">
              <div>test</div>
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
              <Tag $variant="info">Avtalt med NAV</Tag>
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

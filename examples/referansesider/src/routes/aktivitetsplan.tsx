import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import { Dekoratoren } from "../components/Dekoratoren";
import { Page } from "../components/Page";

const Header1 = styled.h1`
  font-size: 40px;
  font-weight: 600;
`;

export const Route = createFileRoute("/aktivitetsplan")({
  component: () => {
    return (
      <Dekoratoren>
        <Page options={{ width: "medium", footer: "none" }}>
          <Header1>Aktivitetsplan</Header1>
          <div className="p-2 border border-black rounded-xl">card</div>
        </Page>
        <Page options={{ width: "xlarge" }}>
          <Header1>Aktivitetsplan</Header1>
        </Page>
      </Dekoratoren>
    );
  },
});

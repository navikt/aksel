import { Link, createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/dist/darkside/tokens";
import { Page } from "../components/Page";
import { RouteMapper } from "../components/RouteMapper";

const ScCard = styled(Link)`
  padding: 1.5rem;
  display: block;
  border-radius: 12px;
  text-transform: capitalize;
  color: ${tokens.TextAccentStrong};
  font-weight: 550;
  font-size: 24px;
  border: 1px solid ${tokens.BorderAccentSubtle};
  background: ${tokens.BgAccent};

  &:hover {
    background: ${tokens.BgAccentHover};
    text-decoration: underline;
  }
`;

const Component = () => {
  return (
    <Page>
      <ul className="py-12 flex flex-col gap-4">
        <RouteMapper skipRoot>
          {(path, name) => (
            <li key={path}>
              <ScCard to={path}>{name}</ScCard>
            </li>
          )}
        </RouteMapper>
      </ul>
    </Page>
  );
};

export const Route = createFileRoute("/")({ component: Component });

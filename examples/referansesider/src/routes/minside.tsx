import { ReactNode, createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import {
  BellFillIcon,
  ChevronRightIcon,
  HeartIcon,
  PencilFillIcon,
} from "@navikt/aksel-icons";
import * as tokens from "@navikt/ds-tokens/dist/darkside/tokens";
import { Dekoratoren } from "../components/Dekoratoren";
import { Page } from "../components/Page";

const GrayPanel = styled.div`
  background-color: ${tokens.BgNeutral};
  margin-inline: calc(-1 * 50vw);
  padding-inline: 50vw;
`;

const Header2 = styled.h2`
  font-size: 32px;
  font-weight: 600;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const NotificationsPanel = styled.div`
  background-color: ${tokens.BgBrandThreeModerate};
  margin-top: calc(-1 * 44px);
  margin-bottom: 44px;

  svg {
    color: ${tokens.BgBrandThreeModerate};
  }

  #pencil {
    color: white;
  }
`;

let Card;
{
  const bg_map: { [key: string]: string } = {
    default: tokens.BgDefault,
    subtle: tokens.BgNeutral,
    info: tokens.BgInfo,
  };

  const ScCard = styled.div<{ $variant: "default" | "subtle" | "info" }>`
    border-radius: 8px;
    background-color: ${(prop) => bg_map[prop.$variant]};
    box-shadow: ${(prop) =>
      prop.$variant === "default"
        ? `rgba(0, 0, 0, 0.15) 0px 1px 3px 0px,
rgba(0, 0, 0, 0.2) 0px 0px 1px 0px;`
        : "none;"};
  `;

  Card = ({
    title,
    children,
    variant = "default",
  }: {
    title?: string;
    children: ReactNode;
    variant?: "default" | "subtle" | "info";
  }) => {
    return (
      <ScCard $variant={variant}>
        <div className="flex flex-col h-full justify-center">
          {title && (
            <span className="font-semibold text-xl border-b border-b-gray-300 px-5 pt-4 pb-2">
              {title}
            </span>
          )}
          <div> {children}</div>
        </div>
      </ScCard>
    );
  };
}

const Component = () => {
  return (
    <Dekoratoren>
      <Page options={{ width: "large" }}>
        <div className="flex flex-col">
          <div>
            <Header2>Hei, Navn Navnesen</Header2>
          </div>
          <GrayPanel className="mt-11">
            <NotificationsPanel className="dark rounded-xl flex justify-between p-2 text-white">
              <div className="flex justify-start m-2 gap-4">
                <div className="bg-orange-500 w-14 h-14 rounded-lg flex justify-center items-center">
                  <BellFillIcon className="size-6" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">Varsler</span>
                  <span>3 oppgaver og 6 beskjeder</span>
                </div>
              </div>
              <div className="flex justify-start m-2 gap-4">
                <div className="bg-blue-500 w-14 h-14 rounded-lg flex justify-center items-center">
                  <PencilFillIcon id="pencil" className="size-6" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">Utkast</span>
                  <span>Du har 2 påbegynte søknader</span>
                </div>
              </div>
              <div></div>
            </NotificationsPanel>
            <span>Din oversikt</span>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <Card title="Meldekort">
                <p className="m-5 text-gray-500">
                  Du har fått vedtak for en periode du ikke har sendt meldekort.
                </p>
                <p className="m-5">Du må sende 2 meldekort</p>
              </Card>
              <Card title="Meldekort">
                <p className="m-5 text-gray-500">
                  Du har fått vedtak for en periode du ikke har sendt meldekort.
                </p>
                <p className="m-5">Du må sende 2 meldekort</p>
              </Card>
              <Card>
                <div className="flex justify-between align-middle items-center h-full">
                  <div className="flex items-center">
                    <HeartIcon className="m-4" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-xl pt-1">
                        AAP (Arbeidsavklaringspenger)
                      </span>
                      <span>Oversikt over saken din</span>
                    </div>
                  </div>
                  <ChevronRightIcon className="mx-3 mt-1" />
                </div>
              </Card>
              <Card title="Dialogmøte med NAV">
                <p className="m-5 text-gray-500">
                  Du har fått vedtak for en periode du ikke har sendt meldekort.
                </p>
                <p className="m-5">Du må sende 2 meldekort</p>
              </Card>
              <Card title="Aktivitetsplan">
                <p className="m-5 text-gray-500">
                  Du har fått vedtak for en periode du ikke har sendt meldekort.
                </p>
                <p className="m-5">Du må sende 2 meldekort</p>
              </Card>
            </div>
          </GrayPanel>
          <Card variant="subtle">
            <p>test</p>
          </Card>
          <div>c</div>
          <Card variant="info">
            <p>test</p>
          </Card>
        </div>
      </Page>
    </Dekoratoren>
  );
};

export const Route = createFileRoute("/minside")({ component: Component });

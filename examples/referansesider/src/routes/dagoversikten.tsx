import { ReactNode, createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import {
  BaggageIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  FilesIcon,
  PersonCircleFillIcon,
  PersonIcon,
  PlateFillIcon,
} from "@navikt/aksel-icons";
import * as tokens from "@navikt/ds-tokens/dist/darkside/tokens";
import { Button } from "../components/Button";
import { Link } from "../components/Link";
import { Page } from "../components/Page";
import { Tag } from "../components/Tag";

let Breadcrumb: ReactNode;
{
  const ScDiv = styled.div`
    background-color: ${tokens.BgNeutral};
    padding-block: 8px;
    padding-inline: 16px;
  `;

  const ScCrumb = styled.div`
    &[data-directory="true"]::after {
      margin-inline: 20px;
      content: "/";
    }
  `;

  Breadcrumb = () => {
    return (
      <ScDiv className="flex">
        <ScCrumb className="flex items-center" data-directory="true">
          <PersonCircleFillIcon className="text-red-600 mb-0.5 mx-1" />
          <span>Mia Cathrine Svendsen (37 år)</span>
        </ScCrumb>
        <ScCrumb className="flex items-center" data-directory="true">
          <span>121084 34566</span>
          <FilesIcon className="mb-0.5 mx-1" />
        </ScCrumb>
        <ScCrumb className="flex items-center" data-directory="true">
          <span>Aktør-ID 12345678910113</span>
          <FilesIcon className="mb-0.5 mx-1" />
        </ScCrumb>
        <ScCrumb>Boenhet 999 (Ummo)</ScCrumb>
      </ScDiv>
    );
  };
}

const Timeline = () => {
  return (
    <div className="flex flex-col my-4">
      <div className="flex">
        <span>Nov 22</span>
        <span>Okt 22</span>
        <span>Sep 22</span>
        <span>Nov 22</span>
        <span>Aug 22</span>
        <span>Jun 22</span>
        <span>Mai 22</span>
        <span>Apr 22</span>
        <span>Feb 22</span>
        <span>Jan 22</span>
        <span>Des 21</span>
      </div>
      <div className="flex">
        <div className="flex">
          <BaggageIcon />
          <span>SYKEPLEIERHUSET AS</span>
        </div>
        <div className="flex bg-blue-200 grow">test</div>
      </div>
      <div className="flex justify-end">
        <ChevronLeftCircleIcon />
        <ChevronRightCircleIcon />
        <div className="flex">
          <span className="border-black border px-2 py-1">2 mnd</span>
          <span className="border-black border px-2 py-1">6 mnd</span>
          <span className="border-black border px-2 py-1 bg-black text-white">
            1 år
          </span>
          <span className="border-black border px-2 py-1">4 år</span>
        </div>
      </div>
      <h1>
        copy paste litt HTML/CSS fra rendered Timelinecomponent (+ tokens)
      </h1>
    </div>
  );
};

const ScSmallCaps = styled.span`
  color: ${tokens.TextSubtle};
  font-weight: 600;
  font-variant-caps: all-small-caps;
`;

const LeftSide = () => {
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Tag $variant="neutral">Forlengelse</Tag>
        <Tag $variant="info">Revurdering</Tag>
      </div>
      <div className="flex items-center gap-2">
        <CalendarIcon />
        <span>09.05.19 - 16.05.19</span>
      </div>
      <div className="flex items-center gap-2">
        <CalendarIcon />
        <span>09.05.19</span>
      </div>
      <div className="flex items-center gap-2">
        <PlateFillIcon className="text-red-600" />
        <span>09.05.19 (10 dager igjen)</span>
      </div>
      <div className="flex items-center gap-2">
        <BriefcaseIcon />
        <span>Sykepleierhuset AS</span>
        <ChevronDownIcon />
      </div>
      <div className="flex justify-between">
        <span>Månedsbeløp:</span>
        <span>10 000,00 kr</span>
      </div>
      <ScSmallCaps className="mt-4 text-lg">UTBETALINGSINFORMASJON</ScSmallCaps>
      <div className="flex justify-between">
        <span>Sykepengegrunnlag:</span>
        <span>240 123,00 kr</span>
      </div>
      <div className="flex justify-between">
        <span>Utbetalingsdager:</span>
        <span>3 dager</span>
      </div>
      <div className="flex justify-between mt-4 font-bold">
        <span>Beløp for perioden</span>
        <span>2 769,00 kr</span>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <BriefcaseIcon />
          <span>Sykepleierhuset AS</span>
        </div>
        <span>240 123,00 kr</span>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <PersonIcon />
          <span>Mia Cathrine...</span>
        </div>
        <span>-</span>
      </div>
      <Link className="my-4">Simulering</Link>
      <div className="flex gap-4">
        <Button variant="primary" size="small">
          Fatt vedtak
        </Button>
        <Button variant="secondary" size="small">
          Kan ikke behandles her
        </Button>
      </div>
    </div>
  );
};

const RightSide = () => {
  return <div>Historikk</div>;
};

const Center = () => {
  return <div>center</div>;
};

const DagoversiktPage = () => {
  return (
    <Page options={{ width: "xlarge" }}>
      <div>
        <Breadcrumb />
        <Timeline />
        <div className="flex border-1 border-gray-300">
          <div className="flex flex-col border border-gray-300 p-4">
            <LeftSide />
          </div>
          <div className="border grow border-gray-300">
            <Center />
          </div>
          <div className="border border-gray-300">
            <RightSide />
          </div>
        </div>
      </div>
    </Page>
  );
};

export const Route = createFileRoute("/dagoversikten")({
  component: DagoversiktPage,
});

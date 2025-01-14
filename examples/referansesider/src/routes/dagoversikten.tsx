import { ReactNode, createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import {
  BandageIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChevronDownIcon,
  ClockIcon,
  FilesIcon,
  FolderIcon,
  PencilLineIcon,
  PersonCircleFillIcon,
  PersonIcon,
  PersonPencilFillIcon,
  PersonPencilIcon,
  PlateFillIcon,
} from "@navikt/aksel-icons";
import { Link } from "@navikt/ds-react/Link";
import * as tokens from "@navikt/ds-tokens/darkside-js";
import { Button } from "../components/Button";
import { MiniTag } from "../components/MiniTag";
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
    <p>TODO: insert Timeline component when we have updated it to use tokens</p>
  );
};

const ScSmallCaps = styled.span<{ ["$font-weight"]: "normal" }>`
  color: ${tokens.TextSubtle};
  font-weight: ${(props) => (props["$font-weight"] === "normal" ? 400 : 600)};
  font-variant-caps: all-small-caps;
`;

const LeftSide = () => {
  return (
    <>
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
      <ScSmallCaps $font-weight="normal" className="mt-4 text-lg">
        UTBETALINGSINFORMASJON
      </ScSmallCaps>
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
      <Link href="#">Simulering</Link>
      <div className="flex gap-4">
        <Button variant="primary" size="small">
          Fatt vedtak
        </Button>
        <Button variant="secondary" size="small">
          Kan ikke behandles her
        </Button>
      </div>
    </>
  );
};

const ScKebabButtons = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 16px;
  gap: 24px;

  & .iconWrapper {
    padding: 8px;
    background-color: ${tokens.BgNeutral};
    border-radius: 9999px;
  }

  & .iconWrapper[data-active="true"] {
    background-color: ${tokens.BgAccentStrong};
    color: ${tokens.TextAccentContrast};
  }
`;

const ScTextSubtle = styled.span`
  color: ${tokens.TextSubtle};
`;

const ScBordered = styled.div`
  border-color: ${tokens.BorderSubtle};
`;

const RightSide = () => {
  return (
    <div className="flex h-full">
      <ScBordered className="flex flex-col h-full border-0 border-r p-4">
        <ScSmallCaps $font-weight="normal" className="text-xl">
          Historikk
        </ScSmallCaps>
        <ScBordered className="flex p-2 border-b gap-1">
          <MiniTag $variant="warning">IM</MiniTag>
          <div className="flex flex-col">
            <span>Inntektsmelding mottatt</span>
            <ScTextSubtle className="text-sm">19.11.2022 kl 12.05</ScTextSubtle>
          </div>
        </ScBordered>
        <ScBordered className="flex p-2 border-b gap-1">
          <MiniTag $variant="info">SØ</MiniTag>
          <div className="flex flex-col">
            <span>Søknad mottatt</span>
            <ScTextSubtle className="text-sm">19.11.2022 kl 12.05</ScTextSubtle>
          </div>
        </ScBordered>
      </ScBordered>
      <ScKebabButtons>
        <div className="iconWrapper" data-active="true">
          <ClockIcon />
        </div>
        <div className="iconWrapper">
          <FolderIcon />
        </div>
        <div className="iconWrapper">
          <PencilLineIcon />
        </div>
        <div className="iconWrapper">
          <PersonPencilIcon />
        </div>
      </ScKebabButtons>
    </div>
  );
};

const DummyRow = () => {
  return (
    <tr>
      <th>02.11.2022</th>
      <th>
        <div className="flex items-center gap-1">
          <BandageIcon />
          <span>Syk</span>
        </div>
      </th>
      <th>100%</th>
      <th>
        <MiniTag $variant="info">SØ</MiniTag>
      </th>
      <th>100%</th>
      <th>923,00 kr</th>
      <th>-</th>
      <th>123</th>
      <th></th>
    </tr>
  );
};

const DummyRowWeekend = () => {
  return (
    <tr className="weekend">
      <th>02.11.2022</th>
      <th>
        <span className="ml-4">Helg</span>
      </th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  );
};

let Center: ReactNode;
{
  const ScTable = styled.table`
    & * {
      font-weight: 400;
    }
    & .weekend {
      // CSS custom filter (fragment shader?) for diagonal repeating lines?
    }
  `;

  Center = () => {
    return (
      <div>
        <ScTable className="m-4">
          <thead>
            <tr>
              <th>Dato</th>
              <th>Dagtype</th>
              <th>Grad</th>
              <th>Kilde</th>
              <th>Total grad</th>
              <th>Refusjon</th>
              <th>Utbetaling</th>
              <th>Dager igjen</th>
              <th>Merknader</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>TOTAL</th>
              <th>2 dager</th>
              <th></th>
              <th></th>
              <th></th>
              <th>2 769,00 kr</th>
              <th>-</th>
              <th>123</th>
              <th></th>
            </tr>
            <tr>
              <th>24.10.2022</th>
              <th>Arbeid</th>
              <th></th>
              <th>
                <PersonPencilFillIcon />
              </th>
              <th></th>
              <th>-</th>
              <th>-</th>
              <th>126</th>
              <th></th>
            </tr>
            <DummyRow />
            <DummyRow />
            <DummyRow />
            <DummyRowWeekend />
            <DummyRowWeekend />
            <DummyRow />
            <DummyRow />
            <DummyRow />
            <DummyRow />
            <DummyRow />
            <DummyRowWeekend />
            <DummyRowWeekend />
            <DummyRow />
            <DummyRow />
            <DummyRow />
            <DummyRow />
            <DummyRow />
            <DummyRowWeekend />
            <DummyRowWeekend />
            <DummyRow />
            <DummyRow />
            <DummyRow />
            <DummyRow />
            <DummyRow />
            <DummyRowWeekend />
            <DummyRowWeekend />
            <DummyRow />
          </tbody>
        </ScTable>
      </div>
    );
  };
}

const DagoversiktPage = () => {
  return (
    <Page options={{ width: "xlarge" }}>
      <div>
        <Breadcrumb />
        <Timeline />
        <ScBordered className="flex border-1 border-gray-300">
          <ScBordered className="flex flex-col border p-4">
            <LeftSide />
          </ScBordered>
          <ScBordered className="border grow">
            <Center />
          </ScBordered>
          <ScBordered className="border">
            <RightSide />
          </ScBordered>
        </ScBordered>
      </div>
    </Page>
  );
};

export const Route = createFileRoute("/dagoversikten")({
  component: DagoversiktPage,
});

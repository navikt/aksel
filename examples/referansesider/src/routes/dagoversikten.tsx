import { createFileRoute } from "@tanstack/react-router";
import {
  BaggageIcon,
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  FilesIcon,
  PersonIcon,
} from "@navikt/aksel-icons";
import { Page } from "../components/Page";

const Breadcrumb = () => {
  return (
    <div className="flex">
      <div className="flex">
        <PersonIcon />
        <span>Mia Cathrine Svendsen (37 år)</span>
      </div>
      <div className="flex">
        <span>121084 34566</span>
        <FilesIcon />
      </div>
      <div className="flex">
        <span>Aktør-ID 12345678910113</span>
        <FilesIcon />
      </div>
      <span>Boenhet 999 (Ummo)</span>
    </div>
  );
};

const Timeline = () => {
  return (
    <div className="flex flex-col">
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
    </div>
  );
};

const DagoversiktPage = () => {
  return (
    <div>
      <Breadcrumb />
      <Timeline />
      <Page>
        <div></div>
      </Page>
    </div>
  );
};

export const Route = createFileRoute("/dagoversikten")({
  component: DagoversiktPage,
});

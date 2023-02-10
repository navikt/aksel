import {
  AmplitudeEvents,
  FigmaIcon,
  GithubIcon,
  isNew,
  logAmplitudeEvent,
  YarnIcon,
} from "@/components";
import meta from "@navikt/ds-icons/meta.json";
import { BodyLong, BodyShort, Heading, Link, Modal } from "@navikt/ds-react";
import { SuggestionBlock } from "components/website-modules/SuggestionBlock";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Filter, { FilterT } from "./Filter";
import { categorizeIcons, CategoryT, IconMetaT } from "./iconCategories";
import ModalContent from "./ModalContent";

const SkeletonElement = () => (
  <div className="vk-icon_button bg-surface-subtle h-32 w-48 shrink rounded" />
);

const ModalPlaceholder = () => (
  <div className="min-h-96 w-[600px] max-w-[90%]" />
);

const IconView = dynamic(() => import("./IconView"), {
  loading: () => (
    <div className="min-h-screen w-full pt-8">
      <div className="bg-surface-subtle mb-3 h-5 w-48 rounded-full" />
      <div className="grid content-start justify-start gap-x-4 gap-y-6 pb-8 [grid-template-columns:repeat(auto-fit,12rem)]">
        {[...Array(24)].map((_, y) => (
          <SkeletonElement key={y} />
        ))}
      </div>
    </div>
  ),
  ssr: false,
});

export const getTag = (name: string) => {
  switch (true) {
    case name.endsWith("Filled"):
      return "Filled";
    case name.endsWith("Outline"):
      return "Outline";
    default:
      return "Outline";
  }
};

const IconSearch = () => {
  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const router = useRouter();
  const [visibleIcons, setVisibleIcons] = useState<IconMetaT[]>([]);

  const setQuery = useCallback(
    (icon: string) => {
      const query = router.query;
      query.icon = icon;

      router.replace(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: true }
      );
    },
    [router]
  );

  const logIconClick = useCallback((icon: string) => {
    logAmplitudeEvent(AmplitudeEvents.ikonklikk, {
      ikon: icon,
    });
  }, []);

  const handleSelect = useCallback(
    (icon: string) => {
      setSelectedIcon(icon);
      setOpen(true);
      setQuery(icon);
      logIconClick(icon);
    },
    [logIconClick, setQuery]
  );

  const handlePageEntry = useCallback((icon: string) => {
    setSelectedIcon(icon);
    setOpen(true);
  }, []);

  useEffect(() => {
    Modal.setAppElement("#__next");
    setVisibleIcons(meta.filter((x) => "Outline" === getTag(x.name)));
  }, []);

  useEffect(() => {
    router.query.icon && handlePageEntry(router.query.icon as string);
  }, [handlePageEntry, router.query]);

  const handleClose = () => {
    setOpen(false);
    setSelectedIcon(null);

    const query = router.query;
    delete query["icon"];

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleFilterChange = async (filter: FilterT) => {
    if (filter.toggle === "" && filter.value === "") {
      setVisibleIcons(meta);
      return;
    }

    let metaIcons = [...meta];

    if (filter.toggle === "ny") {
      setVisibleIcons(metaIcons.filter((x) => isNew(x.created_at)));
      return;
    }

    metaIcons = metaIcons.filter(
      (x) => filter.toggle === getTag(x.name).toLowerCase()
    );

    if (filter.value && filter.value !== "") {
      metaIcons = metaIcons.filter(
        (x) =>
          x?.name.toLowerCase().includes(filter.value) ||
          x?.pageName.toLowerCase().includes(filter.value) ||
          x?.description.toLowerCase().includes(filter.value)
      );
    }

    setVisibleIcons([...metaIcons]);
  };

  const categories: CategoryT[] = categorizeIcons(visibleIcons);

  return (
    <div className="relative flex w-full max-w-full flex-col md:w-[1000px] md:max-w-[62vw]">
      <Links />
      <SuggestionBlock variant="ikoner" />
      <div className="flex w-full flex-wrap justify-between gap-x-8 gap-y-4">
        <Filter onFilterChange={handleFilterChange} />
      </div>
      <IconView categories={categories} handleSelect={handleSelect} />
      <Heading size="small" as="div" spacing>
        Fant du ikke ønsket ikon?
      </Heading>
      <BodyLong>
        Send inn forslag til navne-alias eller nye ikoner! Skriv til oss i
        footeren ⬇ eller bare send oss en melding på{" "}
        <Link
          href="https://nav-it.slack.com/archives/C7NE7A8UF"
          target="_blank"
        >
          #Aksel-designsystemet på Slack.
        </Link>
      </BodyLong>
      <Modal open={open} onClose={() => handleClose()}>
        <Modal.Content>
          {selectedIcon ? (
            <ModalContent icon={selectedIcon} />
          ) : (
            <ModalPlaceholder />
          )}
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default IconSearch;

function Links() {
  return (
    <BodyShort
      as="span"
      size="small"
      className="text-text-subtle mb-6 flex flex-wrap gap-4"
    >
      <>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://github.com/navikt/aksel/tree/main/%40navikt/icons"
          className="hover:text-text-default focus:text-text-on-inverted focus:shadow-focus flex items-center gap-1 underline hover:no-underline focus:bg-blue-800 focus:no-underline focus:outline-none"
          onClick={() =>
            logAmplitudeEvent("link", {
              kilde: "intro-lenker ikonside",
              til: "github",
            })
          }
        >
          <GithubIcon /> Github
        </a>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://yarnpkg.com/package/@navikt/ds-icons"
          className="hover:text-text-default focus:text-text-on-inverted focus:shadow-focus flex items-center gap-1 underline hover:no-underline focus:bg-blue-800 focus:no-underline focus:outline-none"
          onClick={() =>
            logAmplitudeEvent("link", {
              kilde: "intro-lenker ikonside",
              til: "yarn",
            })
          }
        >
          <YarnIcon />
          Yarn
        </a>
      </>

      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://www.figma.com/@nav_aksel"
        className="hover:text-text-default focus:text-text-on-inverted focus:shadow-focus flex items-center gap-1 underline hover:no-underline focus:bg-blue-800 focus:no-underline focus:outline-none"
        onClick={() =>
          logAmplitudeEvent("link", {
            kilde: "intro-lenker ikonside",
            til: "figma",
          })
        }
      >
        <FigmaIcon /> Figma
      </a>
    </BodyShort>
  );
}

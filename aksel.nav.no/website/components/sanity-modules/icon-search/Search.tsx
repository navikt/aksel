import { AmplitudeEvents, isNew, logAmplitudeEvent } from "@/components";
import meta from "@navikt/ds-icons/meta.json";
import { BodyLong, Heading, Link, Modal } from "@navikt/ds-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Filter, { FilterT } from "./Filter";
import { categorizeIcons, CategoryT, IconMetaT } from "./iconCategories";

const IconView = dynamic(() => import("./IconView"), {
  loading: () => <div className="min-h-screen w-full" />,
  ssr: false,
});

const ModalContent = dynamic(() => import("./ModalContent"), {
  loading: () => <div className="min-h-[90vw] w-[600px] max-w-[90%]" />,
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
          #designsystem slack.
        </Link>
      </BodyLong>
      <Modal open={open} onClose={() => handleClose()}>
        <Modal.Content>
          {selectedIcon && <ModalContent icon={selectedIcon} />}
        </Modal.Content>
      </Modal>
    </div>
  );
};
export default IconSearch;

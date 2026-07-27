import {
  ExclamationmarkTriangleFillIcon,
  MenuElipsisVerticalIcon,
} from "@navikt/aksel-icons";
import {
  ActionMenu,
  Button,
  HGrid,
  HStack,
  Tag,
  Tooltip,
} from "@navikt/ds-react";
import type { DataGrid } from "@navikt/ds-react/PREVIEW";

type CaseT = {
  caseId: string;
  caseType: "Vedtak" | "Journalføring" | "Behandling" | "Godkjent behandling";
  location: string;
  keywords: string[];
  priority: 0 | 1 | 2 | 3;
  sender: string;
  age: Date;
  status:
    | "Mottatt"
    | "Under behandling"
    | "Avventer opplysninger"
    | "Til godkjenning"
    | "Under kontroll";
  deadline: Date;
};

const now = Date.now();

function createDemoRows(count: number): CaseT[] {
  /* prettier-ignore */
  const names = ["Emma","Olivia","Nora","Sofie","Leah","Ella","Frida","Sofia","Ellinor","Astrid","Noah","Jakob","Lucas","Emil","Oskar","William","Elias","Isak","Oliver","Ludvig"];
  /* prettier-ignore */
  const locations = ["Oslo","Bergen","Trondheim","Stavanger","Bærum","Kristiansand","Drammen","Asker","Lillestrøm","Fredrikstad","Sandnes","Tromsø","Sandefjord","Nordre Follo","Sarpsborg","Tønsberg","Ålesund","Skien","Bodø","Moss","Lørenskog","Larvik","Indre Østfold","Arendal","Ullensaker","Karmøy","Øygarden","Haugesund","Porsgrunn","Ringsaker","Hamar","Molde","Halden","Ringerike","Gjøvik","Askøy","Alver","Sola","Kongsberg","Lillehammer","Lier","Eidsvoll","Horten","Færder","Holmestrand","Bjørnafjorden","Nittedal","Rana","Grimstad","Harstad","Stjørdal","Nes","Kristiansund","Steinkjer","Lindesnes","Sunnfjord","Ås","Elverum","Alta","Stange","Narvik","Klepp","Øvre Eiker","Levanger","Nesodden","Rælingen","Time","Hå","Vestby","Stord","Orkland","Aurskog","Kongsvinger","Melhus","Kinn","Nannestad","Voss","Frogn","Vennesla","Verdal","Eigersund","Namsos","Malvik","Senja","Østre Toten","Modum","Bamble","Strand","Gran","Vestre Toten","Vefsn","Hustadvika","Notodden","Kvinnherad","Gjesdal","Sogndal","Bømlo","Randaberg","Lillesand","Tysvær"];
  /* prettier-ignore */
  const keywordPool = ["Hørsel","Syn","Tale","Bevegelse","Kognisjon","Psykisk helse","Fysisk helse","Sosialt nettverk","Arbeid","Utdanning","Økonomi","Familie","Fritid","Transport","Tilgjengelighet","Teknologi","Kommunikasjon","Mat og ernæring","Søvn","Smertelindring"];
  /* prettier-ignore */
  const caseTypes = ["Vedtak","Journalføring","Behandling","Godkjent behandling"] as const;
  /* prettier-ignore */
  const statuses = ["Mottatt","Under behandling","Avventer opplysninger","Til godkjenning","Under kontroll"] as const;

  return Array.from({ length: count }, (_, index) => {
    const rng = seededRandomNumberGenerator(index + 1);

    const keywordCount = rng(4) + 1;
    const keywords = new Set<string>();
    while (keywords.size < keywordCount) {
      keywords.add(keywordPool[rng(keywordPool.length)]);
    }

    return {
      caseId: `${index + 1}`,
      caseType: caseTypes[rng(caseTypes.length)],
      location: locations[rng(locations.length)],
      keywords: Array.from(keywords),
      priority: ([0, 1, 2, 3] as const)[rng(4)],
      sender: names[rng(names.length)],
      age: new Date(now - index * daysInMs(1)),
      status: statuses[rng(statuses.length)],
      deadline: new Date(now - daysInMs(8) + (index % 50) * daysInMs(1)),
    };
  });
}

/* prettier-ignore */
function createDemoColumns({ withSorting = false }: { withSorting?: boolean; } = {}): DataGrid.Columns<CaseT> {
  return [
    {
      id: "caseId",
      header: "Id",
      bodyCell: ({ caseId }) => caseId.toString(),
      width: { autoResizeOnce: true },
      isRowHeader: true,
    },
    {
      id: "caseType",
      header: "Sakstype",
      bodyCell: ({ caseType }) => caseType,
      width: { defaultValue: 190 },
      isSortable: withSorting,
    },
    {
      id: "location",
      header: "Lokasjon",
      bodyCell: ({ location }) => location,
      width: { defaultValue: 130 },
      isSortable: withSorting,
    },
    {
      id: "keywords",
      header: "Nøkkelord",
      bodyCell: ({ keywords }) => keywords.join(", "),
    },
    {
      id: "priority",
      header: "Prioritet",
      bodyCell: PriorityTag,
      align: "center",
      width: { defaultValue: 100 },
      isSortable: withSorting,
    },
    {
      id: "sender",
      header: "Avsender",
      bodyCell: ({ sender }) => sender,
      isSortable: withSorting,
    },
    {
      id: "status",
      header: "Status",
      bodyCell: ({ status }) => status,
      isSortable: withSorting,
    },
    {
      id: "age",
      header: "Saksalder",
      bodyCell: ({ age }) =>
        `${Math.floor((Date.now() - age.getTime()) / daysInMs(1))}d`,
      align: "right",
      width: { defaultValue: 110 },
      isSortable: withSorting,
    },
    {
      id: "deadline",
      header: "Frist",
      bodyCell: DeadlineCell,
      align: "right",
      width: { defaultValue: 130 },
      isSortable: withSorting,
    },
    {
      id: "actions",
      header: "Handlinger",
      bodyCell: () => (
        <HStack gap="space-4" justify="center">
          <Button variant="tertiary" size="xsmall" data-color="neutral">
            Ta sak
          </Button>
          <ActionMenu>
            <ActionMenu.Trigger>
              <Button
                variant="tertiary"
                size="xsmall"
                data-color="neutral"
                title="Meny"
                icon={<MenuElipsisVerticalIcon aria-hidden />}
              />
            </ActionMenu.Trigger>
            <ActionMenu.Content>
              <ActionMenu.Item>Se detaljer</ActionMenu.Item>
              <ActionMenu.Item>Rediger sak</ActionMenu.Item>
              <ActionMenu.Item>Ta kontakt med avsender</ActionMenu.Item>
            </ActionMenu.Content>
          </ActionMenu>
        </HStack>
      ),
      align: "center",
      width: { autoResizeOnce: true },
    },
  ];
}

const PriorityNames = {
  3: "Kritisk",
  2: "Høy",
  1: "Normal",
  0: "Lav",
};

function PriorityTag({ priority }: { priority: CaseT["priority"] }) {
  if ([0, 1].includes(priority)) {
    return PriorityNames[priority];
  }

  return (
    <Tag
      data-color={priority === 3 ? "danger" : "warning"}
      variant="outline"
      size="small"
    >
      {PriorityNames[priority]}
    </Tag>
  );
}

function DeadlineCell({ deadline }: { deadline: CaseT["deadline"] }) {
  const isOverdue = deadline.getTime() < now;

  return (
    <HGrid
      columns={`1fr ${isOverdue ? "min-content" : ""}`}
      gap="space-4"
      align="center"
    >
      {isOverdue && (
        <Tooltip content="Fristen er ute">
          <ExclamationmarkTriangleFillIcon
            aria-hidden
            fontSize="1.25rem"
            color="var(--ax-text-warning-subtle)"
          />
        </Tooltip>
      )}
      <span>{deadline.toLocaleDateString("no")}</span>
    </HGrid>
  );
}

/** Park-Miller MCG seeded per row. Deterministic */
function seededRandomNumberGenerator(seed: number): (max: number) => number {
  let s = seed | 0;
  return (max: number) => {
    s = Math.imul(48271, s) | 0;
    return Math.abs(s) % max;
  };
}

function daysInMs(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

function generateDataGridDemo(options: { withSorting?: boolean } = {}) {
  return { columns: createDemoColumns(options), data: createDemoRows(100) };
}

export { generateDataGridDemo };

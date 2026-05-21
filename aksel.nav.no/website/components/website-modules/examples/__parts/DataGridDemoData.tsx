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
import { DataGrid } from "@navikt/ds-react/PREVIEW";

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

function generateDataGridDemo({
  withSorting = false,
  withNesting = false,
}: { withSorting?: boolean; withNesting?: boolean } = {}) {
  const columns: DataGrid.Columns<CaseT> = [
    {
      id: "caseId",
      header: "Id",
      bodyCell: ({ caseId }) => caseId.toString(),
      width: withNesting ? { defaultValue: 130 } : { autoResizeOnce: true },
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
        `${Math.floor((Date.now() - age.getTime()) / (1000 * 60 * 60 * 24))}d`,
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

  const data: CaseT[] = new Array(100).fill(null).map((_, index) => ({
    caseId: `${index + 1}`,
    caseType: (
      ["Vedtak", "Journalføring", "Behandling", "Godkjent behandling"] as const
    )[random(4)],
    location: getLocation(),
    keywords: getKeywords(),
    createdAt: new Date(Date.now() - index * 1000 * 60 * 60 * 24),
    priority: ([0, 1, 2, 3] as const)[random(4)],
    sender: getName(),
    age: new Date(Date.now() - index * 1000 * 60 * 60 * 24),
    status: (
      [
        "Mottatt",
        "Under behandling",
        "Avventer opplysninger",
        "Til godkjenning",
        "Under kontroll",
      ] as const
    )[random(5)],
    deadline: new Date(
      Date.now() - daysInMs(8) + (index % 50) * 1000 * 60 * 60 * 24,
    ),
  }));

  return {
    columns,
    data,
  };
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

const now = Date.now();

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

function random(max: number) {
  return Math.floor(Math.random() * max);
}

function daysInMs(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

function getName() {
  /* prettier-ignore */
  const names = ["Emma","Olivia","Nora","Sofie","Leah","Ella","Frida","Sofia","Ellinor","Astrid","Noah","Jakob","Lucas","Emil","Oskar","William","Elias","Isak","Oliver","Ludvi"];
  return names[random(names.length)];
}

function getLocation() {
  /* prettier-ignore */
  const locations = ["Oslo","Bergen","Trondheim","Stavanger","Bærum","Kristiansand","Drammen","Asker","Lillestrøm","Fredrikstad","Sandnes","Tromsø","Sandefjord","Nordre Follo","Sarpsborg","Tønsberg","Ålesund","Skien","Bodø","Moss","Lørenskog","Larvik","Indre Østfold","Arendal","Ullensaker","Karmøy","Øygarden","Haugesund","Porsgrunn","Ringsaker","Hamar","Molde","Halden","Ringerike","Gjøvik","Askøy","Alver","Sola","Kongsberg","Lillehammer","Lier","Eidsvoll","Horten","Færder","Holmestrand","Bjørnafjorden","Nittedal","Rana","Grimstad","Harstad","Stjørdal","Nes","Kristiansund","Steinkjer","Lindesnes","Sunnfjord","Ås","Elverum","Alta","Stange","Narvik","Klepp","Øvre Eiker","Levanger","Nesodden","Rælingen","Time","Hå","Vestby","Stord","Orkland","Aurskog","Kongsvinger","Melhus","Kinn","Nannestad","Voss","Frogn","Vennesla","Verdal","Eigersund","Namsos","Malvik","Senja","Østre Toten","Modum","Bamble","Strand","Gran","Vestre Toten","Vefsn","Hustadvika","Notodden","Kvinnherad","Gjesdal","Sogndal","Bømlo","Randaberg","Lillesand","Tysvær"];
  return locations[random(locations.length)];
}

function getKeywords() {
  /* prettier-ignore */
  const words = ["Hørsel","Syn","Tale","Bevegelse","Kognisjon","Psykisk helse","Fysisk helse","Sosialt nettverk","Arbeid","Utdanning","Økonomi","Familie","Fritid","Transport","Tilgjengelighet","Teknologi","Kommunikasjon","Mat og ernæring","Søvn","Smertelindring"];

  const count = random(4) + 1;
  const keywords = new Set<string>();

  while (keywords.size < count) {
    keywords.add(words[random(words.length)]);
  }

  return Array.from(keywords);
}

export { generateDataGridDemo };

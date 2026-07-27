import { VStack } from "@navikt/ds-react";
import { DataGrid } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack height="100vh" padding="space-16">
      <DataGrid
        columns={columns}
        data={projects}
        getRowId={(row) => row.id}
        selection={{ mode: "multiple" }}
      >
        <DataGrid.Table<ProjectRowT>
          subRows={{
            getRows: (row) => tasksByProject[row.id] ?? [],
          }}
        />
      </DataGrid>
    </VStack>
  );
};

type ProjectRowT = {
  id: string;
  title: string;
  assignee: string;
  status: "Ikke startet" | "Pågår" | "Ferdig" | "Blokkert";
  priority: "Høy" | "Normal" | "Lav";
  deadline: Date;
};

const columns: DataGrid.Columns<ProjectRowT> = [
  {
    id: "title",
    header: "Tittel",
    bodyCell: ({ title }) => title,
    isRowHeader: true,
    width: { defaultValue: 310 },
  },
  {
    id: "assignee",
    header: "Ansvarlig",
    bodyCell: ({ assignee }) => assignee,
    width: { defaultValue: 180 },
  },
  {
    id: "status",
    header: "Status",
    bodyCell: ({ status }) => status,
  },
  {
    id: "priority",
    header: "Prioritet",
    bodyCell: ({ priority }) => priority,
  },
  {
    id: "deadline",
    header: "Frist",
    bodyCell: ({ deadline }) => deadline.toLocaleDateString("no"),
    align: "right",
    width: { defaultValue: 120 },
  },
];

const projects: ProjectRowT[] = [
  {
    id: "proj-1",
    title: "Modernisering av sakssystem",
    assignee: "Emma Larsen",
    status: "Pågår",
    priority: "Høy",
    deadline: new Date("2026-06-30"),
  },
  {
    id: "proj-2",
    title: "Ny selvbetjeningsportal",
    assignee: "Noah Berg",
    status: "Ikke startet",
    priority: "Normal",
    deadline: new Date("2026-09-15"),
  },
  {
    id: "proj-3",
    title: "Integrasjon med Altinn",
    assignee: "Sofie Kristiansen",
    status: "Ferdig",
    priority: "Høy",
    deadline: new Date("2026-03-01"),
  },
  {
    id: "proj-4",
    title: "Tilgjengelighetsrevisjon",
    assignee: "Oliver Dahl",
    status: "Blokkert",
    priority: "Normal",
    deadline: new Date("2026-08-01"),
  },
];

const tasksByProject: Record<string, ProjectRowT[]> = {
  "proj-1": [
    {
      id: "proj-1-1",
      title: "Kravanalyse og dokumentasjon",
      assignee: "Emma Larsen",
      status: "Ferdig",
      priority: "Høy",
      deadline: new Date("2026-03-15"),
    },
    {
      id: "proj-1-2",
      title: "Backend-utvikling",
      assignee: "Lucas Johansen",
      status: "Pågår",
      priority: "Høy",
      deadline: new Date("2026-05-31"),
    },
    {
      id: "proj-1-3",
      title: "Brukertest og QA",
      assignee: "Olivia Hansen",
      status: "Ikke startet",
      priority: "Normal",
      deadline: new Date("2026-06-15"),
    },
    {
      id: "proj-1-4",
      title: "Produksjonssetting",
      assignee: "Emma Larsen",
      status: "Ikke startet",
      priority: "Høy",
      deadline: new Date("2026-06-30"),
    },
  ],
  "proj-2": [
    {
      id: "proj-2-1",
      title: "UX-design og prototyping",
      assignee: "Nora Strand",
      status: "Ikke startet",
      priority: "Normal",
      deadline: new Date("2026-07-01"),
    },
    {
      id: "proj-2-2",
      title: "Frontend-utvikling",
      assignee: "Jakob Moen",
      status: "Ikke startet",
      priority: "Normal",
      deadline: new Date("2026-08-15"),
    },
    {
      id: "proj-2-3",
      title: "Tilgjengelighetstesting",
      assignee: "Noah Berg",
      status: "Ikke startet",
      priority: "Lav",
      deadline: new Date("2026-09-01"),
    },
  ],
  "proj-3": [
    {
      id: "proj-3-1",
      title: "API-kartlegging",
      assignee: "Sofie Kristiansen",
      status: "Ferdig",
      priority: "Høy",
      deadline: new Date("2026-01-31"),
    },
    {
      id: "proj-3-2",
      title: "Implementasjon og testing",
      assignee: "Emil Vik",
      status: "Ferdig",
      priority: "Høy",
      deadline: new Date("2026-02-28"),
    },
    {
      id: "proj-3-3",
      title: "Dokumentasjon",
      assignee: "Sofie Kristiansen",
      status: "Ferdig",
      priority: "Lav",
      deadline: new Date("2026-03-01"),
    },
  ],
  "proj-4": [
    {
      id: "proj-4-1",
      title: "Tilgjengelighetserklæring",
      assignee: "Oliver Dahl",
      status: "Pågår",
      priority: "Normal",
      deadline: new Date("2026-06-01"),
    },
    {
      id: "proj-4-2",
      title: "Utbedring av funn",
      assignee: "Frida Bakke",
      status: "Blokkert",
      priority: "Normal",
      deadline: new Date("2026-07-15"),
    },
    {
      id: "proj-4-3",
      title: "Sluttrapport",
      assignee: "Oliver Dahl",
      status: "Ikke startet",
      priority: "Lav",
      deadline: new Date("2026-08-01"),
    },
  ],
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "fullscreen",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 12,
};

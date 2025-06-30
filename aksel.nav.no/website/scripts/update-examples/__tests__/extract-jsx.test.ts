import { expect, test } from "vitest";
import { extractJsx } from "../parts/extract-jsx";

test("extracts simple JSX from Example arrow function", async () => {
  const code = `
    const Example = () => {
      return <div>Hello world</div>;
    };
  `;
  const result = await extractJsx(code);
  expect(result?.replace(/\s/g, "")).toContain(
    "<div>Hello world</div>".replace(/\s/g, ""),
  );
});

test("extracts JSX fragment from Example function", async () => {
  const code = `
    const Example = function() {
      return (
        <>
          <span>One</span>
          <span>Two</span>
        </>
      );
    };
  `;
  const result = await extractJsx(code);
  expect(result?.replace(/\s/g, "")).toContain(
    "<><span>One</span><span>Two</span></>".replace(/\s/g, ""),
  );
});

test("extracts JSX fragment from implicit return Example function", async () => {
  const code = `const Example = () => <div>Hello world</div>;`;
  const result = await extractJsx(code);

  expect(result).not.toBeNull();
  expect(result?.replace(/\s/g, "")).toContain(
    "<div>Hello world</div>".replace(/\s/g, ""),
  );
});

test("returns null if Example has multiple returns", async () => {
  const code = `
    const Example = () => {
      if (true) return <div>One</div>;
      return <div>Two</div>;
    };
  `;
  const result = await extractJsx(code);
  expect(result).toBeNull();
});

test("returns null if Example is missing", async () => {
  const code = `
    const NotExample = () => {
      return <div>Should not extract</div>;
    };
  `;
  const result = await extractJsx(code);
  expect(result).toBeNull();
});

test("returns null if no JSX in return", async () => {
  const code = `
    const Example = () => {
      return 42;
    };
  `;
  const result = await extractJsx(code);
  expect(result).toBeNull();
});

test("formats output using prettier", async () => {
  const code = `
    const Example = () => {
      return <div>
      <span>foo</span>
      </div>;
    };
  `;
  const result = await extractJsx(code);
  expect(result).toMatch(/<div>\s+<span>foo<\/span>\s+<\/div>/);
});

test("formats complex example", async () => {
  const result = await extractJsx(complexExample());

  expect(result).not.toBeNull();
});

test("returns null on invalid code", async () => {
  const code = `
    const Example = () => {
      return <div>Unclosed
    };
  `;
  const result = await extractJsx(code, true);
  expect(result).toBeNull();
});

function complexExample() {
  return `import { useState } from "react";
  import { SortState, Table } from "@navikt/ds-react";
  import { withDsExample } from "@/web/examples/withDsExample";

  interface ScopedSortState extends SortState {
    orderBy: keyof (typeof data)[0];
  }

  const Example = () => {
    const [sort, setSort] = useState<ScopedSortState | undefined>();

    const handleSort = (sortKey: ScopedSortState["orderBy"]) => {
      setSort(
        sort && sortKey === sort.orderBy && sort.direction === "descending"
          ? undefined
          : {
              orderBy: sortKey,
              direction:
                sort && sortKey === sort.orderBy && sort.direction === "ascending"
                  ? "descending"
                  : "ascending",
            },
      );
    };

    function comparator<T>(a: T, b: T, orderBy: keyof T): number {
      if (b[orderBy] == null || b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }

    const sortedData = data.slice().sort((a, b) => {
      if (sort) {
        return sort.direction === "ascending"
          ? comparator(b, a, sort.orderBy)
          : comparator(a, b, sort.orderBy);
      }
      return 1;
    });

    return (
      <>
        <Table
          sort={sort}
          onSortChange={(sortKey) =>
            handleSort(sortKey as ScopedSortState["orderBy"])
          }
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader sortKey="name" sortable>
                Navn
              </Table.ColumnHeader>
              <Table.HeaderCell scope="col">Fødselsnr.</Table.HeaderCell>
              <Table.ColumnHeader sortKey="start" sortable>
                Start
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sortedData.map(({ name, fnr, start }, i) => {
              return (
                <Table.Row key={i + fnr}>
                  <Table.HeaderCell scope="row">{name}</Table.HeaderCell>
                  <Table.DataCell>{fnr}</Table.DataCell>
                  <Table.DataCell>{format(new Date(start))}</Table.DataCell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </>
    );
  };

  const format = (date: Date) => {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    return "" + y + "-" + m + "-" + d;
  };

  const data = [
    {
      name: "Jakobsen, Markus",
      fnr: "03129265463",
      start: "2020-04-28T19:12:14.358Z",
    },
    {
      name: "Halvorsen, Mari",
      fnr: "16063634134",
      start: "2022-01-29T09:51:19.833Z",
    },
    {
      name: "Christiansen, Mathias",
      fnr: "18124441438",
      start: "2021-06-04T20:57:29.159Z",
    },
    {
      name: "Fredriksen, Leah",
      fnr: "24089080180",
      start: "2015-08-31T15:47:36.293Z",
    },
    {
      name: "Evensen, Jonas",
      fnr: "18106248460",
      start: "2010-07-17T11:13:26.116Z",
    },
  ];

  // EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
  export default withDsExample(Example);

  /* Storybook story */
  export const Demo = {
    render: Example,
  };

  export const args = {
    index: 3,
  };
  `;
}

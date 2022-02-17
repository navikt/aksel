import React, { useState } from "react";
import { rest } from "msw";
import useSWR from "swr";
import people from "./people.json";
import { Table } from "../index";
import { Loader, Pagination, SortState } from "../..";

export default {
  title: "ds-react/table",
  component: Table,
};

const rowsPerPage = 10;

const queryString = (obj) =>
  Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .map((key) => key + "=" + obj[key])
    .join("&");

export const Async = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortState>();

  const { data } = useSWR(
    `/people?${queryString({
      page,
      sort: sort ? `${sort.orderBy}:${sort.direction}` : undefined,
    })}`,
    (url) => fetch(url).then((res) => res.json())
  );

  if (!data) {
    return <Loader size="2xlarge" />;
  }

  const { results: people, count } = data;

  const columns = [
    { key: "name", name: "Name", width: 154 },
    { key: "height", name: "Height", width: 108 },
    { key: "mass", name: "Mass", width: 95 },
    {
      key: "birth_year",
      name: "Birth year",
      value: (person) =>
        person.birth_year !== null ? `${person.birth_year}BBY` : undefined,
      width: 133,
    },
    { key: "eye_color", name: "Eye color", width: 127 },
    { key: "gender", name: "Gender", width: 113, sortable: false },
    { key: "hair_color", name: "Hair color", width: 132 },
    { key: "skin_color", name: "Skin color", width: 133 },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ overflow: "auto" }}>
        <Table style={{ width: "initial" }} sort={sort} onSortChange={setSort}>
          <Table.Header>
            <Table.Row>
              {columns.map(({ key, name, width, sortable = true }) => (
                <Table.ColumnHeader
                  style={{ width, minWidth: width, maxWidth: width }}
                  key={key}
                  sortable={sortable}
                  sortKey={key}
                >
                  {name}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {people.map((person) => (
              <Table.Row key={person.name}>
                {columns.map(({ key, width, value }) => (
                  <Table.DataCell
                    style={{
                      width,
                      minWidth: width,
                      maxWidth: width,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                    title={person[key]}
                    key={key}
                  >
                    {value ? value(person) : person[key]}
                  </Table.DataCell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <Pagination
        page={page}
        onPageChange={setPage}
        count={Math.ceil(count / rowsPerPage)}
      />
    </div>
  );
};

Async.parameters = {
  msw: {
    handlers: [
      rest.get("/people", (req, res, ctx) => {
        const comparator = (a, b, orderBy) => {
          if (b[orderBy] < a[orderBy]) {
            return -1;
          }
          if (b[orderBy] > a[orderBy]) {
            return 1;
          }
          return 0;
        };

        const page = Number(req.url.searchParams.get("page"));
        const sort = req.url.searchParams.get("sort");
        return res(
          ctx.delay(),
          ctx.json({
            count: people.length,
            results: people
              .slice()
              .sort((a, b) => {
                if (sort) {
                  const [orderBy, direction] = sort.split(":");
                  return direction === "ascending"
                    ? comparator(b, a, orderBy)
                    : comparator(a, b, orderBy);
                }
                return 1;
              })
              .slice((page - 1) * rowsPerPage, page * rowsPerPage),
          })
        );
      }),
    ],
  },
};

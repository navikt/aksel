import { SanityT } from "@/lib";
import { BodyShort, Detail, Table } from "@navikt/ds-react";
import cl from "classnames";
import Color from "color";

const ColorBox = ({
  prop,
  first,
  last,
}: {
  prop: SanityT.Schema.ds_color;
  first?: boolean;
  last?: boolean;
}): JSX.Element => {
  const color = Color(prop.color_value);
  if (prop.color_type === "global") {
    return (
      <div
        style={{ backgroundColor: color.hex() }}
        className={cl(
          "flex h-16 w-full min-w-[10rem] flex-col justify-center border-none px-4",
          {
            "text-text": !color.isDark(),
            "text-text-inverted": color.isDark(),
            "rounded-b": last,
            "rounded-t": first,
          }
        )}
      >
        <BodyShort>{prop.title}</BodyShort>
        <Detail size="small">{color.hex()}</Detail>
      </div>
    );
  }
  return (
    <div
      className={cl(
        "flex h-[66px] min-w-[10rem] flex-col justify-center rounded px-4",
        {
          "border border-divider": color.luminosity() > 0.8,
          "text-text-inverted": color.isDark(),
        }
      )}
      style={{ background: color.hex() }}
    >
      {prop.title}
    </div>
  );
};

export const GlobalTableRow = ({
  prop,
  first,
  last,
  ...rest
}: {
  prop: SanityT.Schema.ds_color;
  onClick: (c: any) => void;
  first?: boolean;
  last?: boolean;
}) => (
  <button
    {...rest}
    className="z-[1] max-w-text whitespace-nowrap text-left align-top first:rounded-t last:rounded-b focus:z-[2] focus:outline-none focus-visible:shadow-focus"
  >
    <ColorBox prop={prop} first={first} last={last} />
  </button>
);

export const SemanticTableRow = ({
  prop,
  ...rest
}: {
  prop: SanityT.Schema.ds_color;
  onClick: (c: any) => void;
}) => {
  return (
    <Table.Row
      tabIndex={0}
      {...rest}
      className="w-full text-medium hover:cursor-pointer focus:z-[1] focus:outline-none focus-visible:shadow-focus-inset"
    >
      <Table.DataCell>
        <ColorBox prop={prop} />
      </Table.DataCell>
      <Table.DataCell className="min-w-fit align-top">
        {prop.color_roles && (
          <ul>
            {prop.color_roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        )}
      </Table.DataCell>
    </Table.Row>
  );
};

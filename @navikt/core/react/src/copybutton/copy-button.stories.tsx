import React, { useState } from "react";
import { CopyButton } from ".";
import { Tooltip } from "../tooltip";
import { LinkIcon } from "@navikt/aksel-icons";

export default {
  title: "ds-react/CopyButton",
  component: CopyButton,
  argTypes: {
    size: {
      defaultValue: "medium",
      control: {
        type: "radio",
        options: ["xsmall", "small", "medium"],
      },
    },
  },
};

export const Default = {
  render: (args) => <CopyButton {...args} />,
  args: {
    size: "medium",
  },
};

export const Variants = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [active, setActive] = useState(false);
    return (
      <div className="colgap">
        <div className="rowgap">
          <CopyButton clipboardText="3.14" variant="tertiary" />
          <CopyButton clipboardText="3.14" variant="tertiary-neutral" />
          <CopyButton
            icon={<LinkIcon aria-hidden />}
            clipboardText="3.14"
            variant="tertiary"
          />
          <CopyButton
            icon={<LinkIcon aria-hidden />}
            clipboardText="3.14"
            variant="tertiary-neutral"
          />
        </div>

        <div>
          <CopyButton clipboardText="3.14" variant="tertiary" text="Kopier" />
          <CopyButton
            clipboardText="3.14"
            variant="tertiary-neutral"
            text="Kopier"
          />
        </div>
        <div>
          <CopyButton
            clipboardText="3.14"
            variant="tertiary"
            text="Kopier data fra XYZ"
            activeText="Kopierte XYZ!"
          />
          <CopyButton
            clipboardText="3.14"
            variant="tertiary-neutral"
            text="Kopier data fra XYZ"
            activeText="Kopierte XYZ!"
          />
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <CopyButton size="small" clipboardText="3.14" /> Kopier dette feltet
        </div>
        <div>
          <Tooltip
            content={active ? "Kopierte fødselsnummer" : "Kopier fødselsnummer"}
          >
            <CopyButton
              clipboardText="3.14"
              onActiveChange={(v) => setActive(v)}
            />
          </Tooltip>
        </div>
        <div>
          <CopyButton clipboardText="3.14" activeDuration={300} />
        </div>
      </div>
    );
  },
};

import { Star } from "@navikt/ds-icons";
import React from "react";
import { Button } from "./index";

export default {
  title: "ds-react/Button",
  component: Button,
  parameters: {
    chromatic: { delay: 600 },
  },
};

const variants: Array<"primary" | "secondary" | "tertiary" | "danger"> = [
  "primary",
  "secondary",
  "tertiary",
  "danger",
];

const varSwitch = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
  danger: "Danger",
};

export const Default = {
  render: (props) => {
    return (
      <Button
        variant={props.variant}
        size={props.size}
        loading={props.loading}
        icon={props.icon ? <Star /> : undefined}
        iconPosition={props.iconPosition}
      >
        {props.children}
      </Button>
    );
  },

  args: {
    icon: false,
    loading: false,
    iconPosition: "left",
    children: "Knapp",
    variant: "primary",
    size: "medium",
  },
  argTypes: {
    variant: {
      control: {
        type: "radio",
        options: ["primary", "secondary", "tertiary", "danger"],
      },
    },
    size: {
      control: {
        type: "radio",
        options: ["medium", "small", "xsmall"],
      },
    },
    iconPosition: {
      control: {
        type: "radio",
        options: ["left", "right"],
      },
    },
  },
};

export const Small = () => (
  <div className="rowgap">
    {variants.map((variant) => (
      <Button key={variant} variant={variant} size="small">
        {varSwitch[variant]}
      </Button>
    ))}
  </div>
);

export const XSmall = () => (
  <div className="rowgap">
    {variants.map((variant) => (
      <Button key={variant} variant={variant} size="xsmall">
        {varSwitch[variant]}
      </Button>
    ))}
  </div>
);

export const Link = () => (
  <div className="rowgap">
    {variants.map((variant) => (
      <Button key={variant} variant={variant} as="a" href="#thecakeisalie">
        {varSwitch[variant]}
      </Button>
    ))}
  </div>
);

export const Loading = {
  render: () => (
    <div className="colgap">
      <div className="rowgap">
        {variants.map((variant) => (
          <Button key={variant} variant={variant} loading>
            {varSwitch[variant]}
          </Button>
        ))}
      </div>
      <div className="rowgap">
        {variants.map((variant) => (
          <Button key={variant} variant={variant} loading size="small">
            {varSwitch[variant]}
          </Button>
        ))}
      </div>
      <div className="rowgap">
        {variants.map((variant) => (
          <Button key={variant} variant={variant} loading size="xsmall">
            {varSwitch[variant]}
          </Button>
        ))}
      </div>
    </div>
  ),

  args: { chromatic: { delay: 300 } },
};

export const Icon = () => (
  <div className="colgap">
    <div className="rowgap">
      {variants.map((variant) => (
        <Button
          key={variant}
          variant={variant}
          icon={<Star title="Stjerne" />}
        />
      ))}
    </div>
    <div className="rowgap">
      {variants.map((variant) => (
        <Button
          key={variant}
          variant={variant}
          size="small"
          icon={<Star title="Stjerne" />}
        />
      ))}
    </div>
    <div className="rowgap">
      {variants.map((variant) => (
        <Button
          key={variant}
          variant={variant}
          size="xsmall"
          icon={<Star title="Stjerne" />}
        />
      ))}
    </div>
  </div>
);

export const IconWText = () => (
  <div className="colgap">
    <div className="rowgap">
      {variants.map((variant, i) => (
        <Button
          key={variant}
          variant={variant}
          icon={<Star title="Stjerne" />}
          iconPosition={i % 2 ? "left" : "right"}
        >
          {varSwitch[variant]}
        </Button>
      ))}
    </div>
    <div className="rowgap">
      {variants.map((variant, i) => (
        <Button
          key={variant}
          variant={variant}
          size="small"
          icon={<Star title="Stjerne" />}
          iconPosition={i % 2 ? "left" : "right"}
        >
          {varSwitch[variant]}
        </Button>
      ))}
    </div>
    <div className="rowgap">
      {variants.map((variant, i) => (
        <Button
          key={variant}
          variant={variant}
          size="xsmall"
          icon={<Star title="Stjerne" />}
          iconPosition={i % 2 ? "left" : "right"}
        >
          {varSwitch[variant]}
        </Button>
      ))}
    </div>
  </div>
);

export const Disabled = () => (
  <div className="colgap">
    <div className="rowgap">
      {variants.map((variant) => (
        <Button key={variant} variant={variant} disabled>
          {varSwitch[variant]}
        </Button>
      ))}
    </div>
    <div className="rowgap">
      {variants.map((variant) => (
        <Button key={variant} variant={variant} disabled as="a" href="#">
          {varSwitch[variant]}
        </Button>
      ))}
    </div>
  </div>
);

export const LoadingWithAs = {
  render: () => (
    <div className="colgap">
      <div className="rowgap">
        {variants.map((variant) => (
          <Button key={variant} variant={variant} loading size="small">
            {varSwitch[variant]}
          </Button>
        ))}
      </div>
      <div className="rowgap">
        {variants.map((variant) => (
          <Button
            key={variant}
            variant={variant}
            loading
            size="small"
            as="a"
            href="#"
          >
            {varSwitch[variant]}
          </Button>
        ))}
      </div>
    </div>
  ),

  args: { chromatic: { delay: 300 } },
};

import { Star } from "@navikt/ds-icons";
import React from "react";
import { Button } from "./index";

export default {
  title: "ds-react/Button",
  component: Button,
  parameters: {
    chromatic: { delay: 300 },
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
        options: ["medium", "small"],
      },
    },
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

export const Default = (props) => {
  return (
    <Button variant={props.variant} size={props.size} loading={props.loading}>
      {props.icon ? <Star /> : null}
      {props.children}
      {props.icon ? <Star /> : null}
    </Button>
  );
};

Default.args = {
  icon: false,
  loading: false,
  children: "Knapp",
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

export const Loading = () => (
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
);

export const Icon = () => (
  <div className="colgap">
    <div className="rowgap">
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          <Star aria-hidden />
          <span className="navds-sr-only">Stjerne</span>
        </Button>
      ))}
    </div>
    <div className="rowgap">
      {variants.map((variant) => (
        <Button key={variant} variant={variant} size="small">
          <Star aria-hidden />
          <span className="navds-sr-only">Stjerne</span>
        </Button>
      ))}
    </div>
    <div className="rowgap">
      {variants.map((variant) => (
        <Button key={variant} variant={variant} size="xsmall">
          <Star aria-hidden />
          <span className="navds-sr-only">Stjerne</span>
        </Button>
      ))}
    </div>
  </div>
);

export const IconWText = () => (
  <div className="colgap">
    <div className="rowgap">
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          <Star aria-hidden />
          {varSwitch[variant]}
          <Star aria-hidden />
        </Button>
      ))}
    </div>
    <div className="rowgap">
      {variants.map((variant) => (
        <Button key={variant} variant={variant} size="small">
          <Star aria-hidden />
          {varSwitch[variant]}
          <Star aria-hidden />
        </Button>
      ))}
    </div>
    <div className="rowgap">
      {variants.map((variant) => (
        <Button key={variant} variant={variant} size="xsmall">
          <Star aria-hidden />
          {varSwitch[variant]}
          <Star aria-hidden />
        </Button>
      ))}
    </div>
  </div>
);

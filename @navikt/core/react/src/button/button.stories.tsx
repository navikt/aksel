import { StarIcon } from "@navikt/aksel-icons";
import React from "react";
import { Button } from "./index";

export default {
  title: "ds-react/Button",
  component: Button,
  parameters: {
    chromatic: { delay: 600 },
  },
};

const variants: Array<
  | "primary"
  | "secondary"
  | "tertiary"
  | "primary-neutral"
  | "secondary-neutral"
  | "tertiary-neutral"
  | "danger"
> = [
  "primary",
  "secondary",
  "tertiary",
  "danger",
  "primary-neutral",
  "secondary-neutral",
  "tertiary-neutral",
];

const varSwitch = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
  danger: "Danger",
  "primary-neutral": "Primary",
  "secondary-neutral": "Secondary",
  "tertiary-neutral": "Tertiary",
};

export const Default = {
  render: (props) => {
    return (
      <Button
        variant={props.variant}
        size={props.size}
        loading={props.loading}
        icon={props.icon ? <StarIcon /> : undefined}
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
        options: [
          "primary",
          "secondary",
          "tertiary",
          "danger",
          "primary-neutral",
          "secondary-neutral",
          "tertiary-neutral",
        ],
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
    <div className="colgap chromatic-ignore">
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

  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Icon = () => (
  <div className="colgap ">
    <div className="rowgap">
      {variants.map((variant) => (
        <Button
          key={variant}
          variant={variant}
          icon={<StarIcon title="Stjerne" />}
        />
      ))}
    </div>
    <div className="rowgap">
      {variants.map((variant) => (
        <Button
          key={variant}
          variant={variant}
          size="small"
          icon={<StarIcon title="Stjerne" />}
        />
      ))}
    </div>
    <div className="rowgap">
      {variants.map((variant) => (
        <Button
          key={variant}
          variant={variant}
          size="xsmall"
          icon={<StarIcon title="Stjerne" />}
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
          icon={<StarIcon title="Stjerne" />}
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
          icon={<StarIcon title="Stjerne" />}
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
          icon={<StarIcon title="Stjerne" />}
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
    <div className="colgap chromatic-ignore">
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

  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const RoleDemo = () => {
  const doSomething = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <Button
        onKeyUp={doSomething}
        onClick={() => null}
        as="a"
        href="https://nav.no"
        target="_blank"
      >
        Testknapp
      </Button>
    </div>
  );
};

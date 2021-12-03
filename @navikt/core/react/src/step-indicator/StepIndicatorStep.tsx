import * as React from "react";
import cn from "classnames";

import { omit } from "nav-frontend-js-utils";

const stegCls = (props) =>
  cn("stegindikator__steg", {
    "stegindikator__steg--labelled": props.visLabel,
  });

const innerCls = (props) =>
  cn("stegindikator__steg-inner", {
    "stegindikator__steg-inner--aktiv": props.aktiv,
    "stegindikator__steg-inner--ferdig": props.ferdig,
    "stegindikator__steg-inner--disabled": props.disabled,
    "stegindikator__steg-inner--interaktiv":
      typeof props.onClick === "function" && !props.aktiv,
  });

export interface StepIndicatorStepProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  label: string;
  index?: number;
  visLabel?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  aktiv?: boolean;
  ferdig?: boolean;
  disabled?: boolean;
}

function StepIndicatorStep(props: StepIndicatorStepProps) {
  function getInnerStep() {
    const labelTemplate = (
      <div className="stegindikator__steg-label">
        {props.label || props.children}
      </div>
    );
    const label = props.visLabel ? labelTemplate : undefined;
    const num = (props.index ?? 0) + 1;

    if (typeof props.onClick === "function" && !props.aktiv) {
      return (
        <button
          className={innerCls(props)}
          title={props.label}
          onClick={props.onClick}
          disabled={props.disabled}
        >
          <div className="stegindikator__steg-num">{num}</div>
          {label}
        </button>
      );
    }

    return (
      <div className={innerCls(props)} title={props.label}>
        <div className="stegindikator__steg-num">{num}</div>
        {label}
      </div>
    );
  }

  const domProps = omit(
    props,
    "label",
    "aktiv",
    "ferdig",
    "visLabel",
    "index",
    "disabled",
    "onClick"
  );

  return (
    <li
      className={stegCls(props)}
      {...domProps}
      aria-current={props.aktiv ? "step" : undefined}
    >
      {getInnerStep()}
    </li>
  );
}

export default StepIndicatorStep;

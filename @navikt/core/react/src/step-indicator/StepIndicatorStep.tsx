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
  index: number;
  visLabel?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  aktiv?: boolean;
  ferdig?: boolean;
  disabled?: boolean;
}

class StepIndicatorStep extends React.Component<StepIndicatorStepProps> {
  getInnerStep() {
    const labelTemplate = (
      <div className="stegindikator__steg-label">
        {this.props.label || this.props.children}
      </div>
    );
    const label = this.props.visLabel ? labelTemplate : undefined;
    const num = this.props.index + 1;

    if (typeof this.props.onClick === "function" && !this.props.aktiv) {
      return (
        <button
          className={innerCls(this.props)}
          title={this.props.label}
          onClick={this.props.onClick}
          disabled={this.props.disabled}
        >
          <div className="stegindikator__steg-num">{num}</div>
          {label}
        </button>
      );
    }

    return (
      <div className={innerCls(this.props)} title={this.props.label}>
        <div className="stegindikator__steg-num">{num}</div>
        {label}
      </div>
    );
  }

  render() {
    const domProps = omit(
      this.props,
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
        className={stegCls(this.props)}
        {...domProps}
        aria-current={this.props.aktiv ? "step" : undefined}
      >
        {this.getInnerStep()}
      </li>
    );
  }
}

export default StepIndicatorStep;

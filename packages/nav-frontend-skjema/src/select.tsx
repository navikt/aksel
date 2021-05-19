import * as PT from "prop-types";
import * as React from "react";
import classNames from "classnames";
import { guid } from "nav-frontend-js-utils";
import SkjemaelementFeilmelding from "./skjemaelement-feilmelding";
import {
  Label,
  SkjemaGruppeFeilContext,
  SkjemaGruppeFeilContextProps,
} from ".";
import "nav-frontend-skjema-style";

const cls = (className) => classNames("skjemaelement", className);
const inputCls = (harFeil) =>
  classNames("skjemaelement__input", {
    "skjemaelement__input--harFeil": harFeil,
  });
const selectCls = (bredde) => classNames("selectContainer", `input--${bredde}`);

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * En eller flere select options
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * ClassName
   */
  className?: string;
  /**
   * Bredden på select-boksen
   */
  bredde?: "fullbredde" | "xxl" | "xl" | "l" | "m" | "s" | "xs";
  /**
   * Label for select
   */
  label?: React.ReactNode;
  /**
   * Ekstrainformasjon under overskrift
   */
  description?: React.ReactNode;
  /**
   * Id for select, hvis id ikke er satt brukes en tilfeldig guid
   */
  id?: string;
  /**
   * Hvis skjemaet har feil sender man inn et objekt med en feilmelding
   */
  feil?: React.ReactNode | boolean;
  /**
   * Referanse til selve selectfeltet. Brukes for eksempel til å sette fokus
   */
  selectRef?: () => any;
  /**
   * -
   */
  disabled?: boolean;
  /**
   * -
   */
  selected?: string | number;
}

/**
 * Select
 */
class Select extends React.Component<SelectProps> {
  render() {
    const {
      children,
      bredde,
      disabled,
      className,
      label,
      description,
      id,
      feil,
      selectRef,
      ...other
    } = this.props;
    const inputId = id || guid();
    return (
      <SkjemaGruppeFeilContext.Consumer>
        {(context: SkjemaGruppeFeilContextProps) => {
          const feilmelding = context.feil || feil;
          const feilmeldingId = context.feilmeldingId || guid();
          const descriptionId = description ? guid() : undefined;

          return (
            <div className={cls(className)}>
              {label && <Label htmlFor={inputId}>{label}</Label>}
              {description && (
                <div className="skjemaelement__description" id={descriptionId}>
                  {description}
                </div>
              )}
              <div className={selectCls(bredde)}>
                <select
                  id={inputId}
                  className={inputCls(feil)}
                  ref={selectRef}
                  disabled={disabled}
                  aria-invalid={!!feilmelding}
                  aria-describedby={descriptionId}
                  aria-errormessage={feilmelding ? feilmeldingId : undefined}
                  {...other}
                >
                  {children}
                </select>
              </div>
              {!context.feil && !!feil && (
                <SkjemaelementFeilmelding id={feilmeldingId}>
                  {typeof feilmelding !== "boolean" && feilmelding}
                </SkjemaelementFeilmelding>
              )}
            </div>
          );
        }}
      </SkjemaGruppeFeilContext.Consumer>
    );
  }
}

(Select as React.ComponentClass).propTypes = {
  /**
   * En eller flere select options
   */
  children: PT.oneOfType([PT.arrayOf(PT.node), PT.node]).isRequired,
  /**
   * ClassName
   */
  className: PT.string,
  /**
   * Bredden på select-boksen
   */
  bredde: PT.oneOf(["fullbredde", "xxl", "xl", "l", "m", "s", "xs"]),
  /**
   * Label for select
   */
  label: PT.node,
  /**
   * Ekstrainformasjon under overskrift
   */
  description: PT.node,
  /**
   * Id for select, hvis id ikke er satt brukes en tilfeldig guid
   */
  id: PT.string,
  /**
   * Hvis skjemaet har feil sender man inn et objekt med en feilmelding
   */
  feil: PT.oneOfType([PT.node, PT.bool]),
  /**
   * Referanse til selve selectfeltet. Brukes for eksempel til å sette fokus
   */
  selectRef: PT.func,
  disabled: PT.bool,
};

(Select as React.ComponentClass).defaultProps = {
  className: undefined,
  id: undefined,
  bredde: "fullbredde",
  feil: undefined,
  selectRef: undefined,
  disabled: false,
};

export default Select;

import * as PT from "prop-types";
import * as React from "react";
import classNames from "classnames";
import "nav-frontend-typografi-style";

export const typeConfigMap = {
  sidetittel: {
    defaultTag: "h1",
    cls: (...args) => classNames("typo-sidetittel", ...args),
  },
  innholdstittel: {
    defaultTag: "h1",
    cls: (...args) => classNames("typo-innholdstittel", ...args),
  },
  systemtittel: {
    defaultTag: "h2",
    cls: (...args) => classNames("typo-systemtittel", ...args),
  },
  undertittel: {
    defaultTag: "h2",
    cls: (...args) => classNames("typo-undertittel", ...args),
  },
  ingress: {
    defaultTag: "p",
    cls: (...args) => classNames("typo-ingress", ...args),
  },
  element: {
    defaultTag: "p",
    cls: (...args) => classNames("typo-element", ...args),
  },
  feilmelding: {
    defaultTag: "p",
    cls: (...args) => classNames("typo-feilmelding", ...args),
  },
  normaltekst: {
    defaultTag: "p",
    cls: (...args) => classNames("typo-normal", ...args),
  },
  undertekstBold: {
    defaultTag: "p",
    cls: (...args) => classNames("typo-undertekst-bold", ...args),
  },
  undertekst: {
    defaultTag: "p",
    cls: (...args) => classNames("typo-undertekst", ...args),
  },
};

function getConfigForType(type) {
  const typeConfig = typeConfigMap[type];

  if (!typeConfig) {
    throw new Error(
      `Kunne ikke finne typeconfig for ${type}. Støttede typer er: ${JSON.stringify(
        Object.keys(typeConfigMap)
      )}`
    );
  }

  return typeConfig;
}

export interface TypografiProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Egendefinert innhold
   */
  children: React.ReactNode | React.ReactChild | React.ReactChildren;
  /**
   * Angi hvilken HTML-tag som skal brukes ('h1', 'h2', osv...)
   */
  tag?: string;
  /**
   * Egendefinert klassenavn
   */
  className?: string;
}

export interface TypografiBaseProps extends TypografiProps {
  /**
   * Ønsket typografi-type ('sidetittel', 'innholdstittel', osv...)
   */
  type: string;
}

class TypografiBase extends React.Component<TypografiBaseProps> {
  render() {
    const { type, tag, className, children, ...props } = this.props;
    const config = getConfigForType(type);
    const tagName = tag || config.defaultTag;

    const classnames = { className: config.cls(className) };

    return React.createElement(tagName, { ...props, ...classnames }, children);
  }
}

(TypografiBase as React.ComponentClass).propTypes = {
  type: PT.string.isRequired,
  tag: PT.string,
  className: PT.string,
  children: PT.node.isRequired,
};

(TypografiBase as React.ComponentClass).defaultProps = {
  className: undefined,
};

export default TypografiBase;

export { default as Sidetittel } from "./sidetittel";
export { default as Innholdstittel } from "./innholdstittel";
export { default as Systemtittel } from "./systemtittel";
export { default as Undertittel } from "./undertittel";
export { default as Ingress } from "./ingress";
export { default as Element } from "./element";
export { default as Feilmelding } from "./feilmelding";
export { default as Normaltekst } from "./normaltekst";
export { default as Undertekst } from "./undertekst";
export { default as UndertekstBold } from "./undertekst-bold";

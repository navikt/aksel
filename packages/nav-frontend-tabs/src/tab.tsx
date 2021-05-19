import * as React from "react";
import cn from "classnames";
import { omit } from "nav-frontend-js-utils";

const tabCls = (props) =>
  cn("nav-frontend-tabs__tab-inner", props.className, {
    "nav-frontend-tabs__tab-inner--aktiv": props.aktiv,
    "nav-frontend-tabs__tab-inner--interaktiv": !props.aktiv,
    "nav-frontend-tabs__tab-inner--disabled": props.disabled,
  });

export interface TabProps {
  /**
   * Innhold for label, kan være tekst eller HTML/JSX. Erstattes av `children` ved bruk av `<Tabs.Tab></Tabs.Tab>`
   */
  label?: React.ReactNode | React.ReactChild | React.ReactChildren;
  /**
   * Vise som aktiv tab, kan brukes hvis man benytter pure versjon av Tabs-komponenten
   */
  aktiv?: boolean;
  /**
   * Valgfri onClick callback
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Brukes av TabsPure for å fasilitere tastatur-kontroll
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  /**
   * Brukes av TabsPure for å fasilitere tastatur-kontroll
   */
  onFocus?: () => void;
  /**
   * Lar deg bestemme hvilket klikkbart HTML-element som brukes
   */
  linkCreator?: Function;
  /**
   * Gjør tab utilgjengelig
   */
  disabled?: boolean;
  /**
   * -
   */
  tabIndex?: number;
  /**
   * Brukes av PureTabs for fokus-management
   */
  linkRef?: Function;
}

class Tab extends React.Component<TabProps> {
  getLabel() {
    return (
      <div className="nav-frontend-tabs__tab-label">
        {this.props.label || this.props.children}
      </div>
    );
  }

  render() {
    const { linkCreator = (props) => <button {...props} /> } = this.props;
    const domProps = omit(
      this.props,
      "label",
      "aktiv",
      "disabled",
      "linkCreator",
      "children",
      "linkRef"
    );

    return (
      <li className="nav-frontend-tabs__tab-outer" role="presentation">
        {linkCreator({
          ...domProps,
          className: tabCls(this.props),
          role: "tab",
          "aria-selected": this.props.aktiv,
          children: this.getLabel(),
          ref: this.props.linkRef,
        })}
      </li>
    );
  }
}

export default Tab;

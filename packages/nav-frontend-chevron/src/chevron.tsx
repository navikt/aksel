import * as PT from "prop-types";
import * as React from "react";
import * as classNames from "classnames";
import "nav-frontend-chevron-style";

// export type ChevronType = 'høyre' | 'venstre' | 'ned' | 'opp';

const cls = (type?, stor?: boolean, className?: string) =>
  classNames(
    "nav-frontend-chevron chevronboks",
    className,
    {
      "chevron--stor": stor,
    },
    {
      "chevron--hoyre": type === "høyre",
      "chevron--venstre": type === "venstre",
      "chevron--ned": type === "ned",
      "chevron--opp": type === "opp",
    }
  );

/**
 * Basiskomponent for Chevron
 * For å få chevron i en spesifikk rettning bruk de rettningsspesifikke komponentente:
 * HoyreChevron, VenstreChevron, OppChevron, VenstreChevron.
 */

export interface NavFrontendChevronProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Bestemmer hvilken vei Chevron skal peke
   */
  type?: "høyre" | "venstre" | "ned" | "opp";
  /**
   * Sett denne proppen hvis chevron skal være stor
   */
  stor?: boolean;
  /**
   * Klassenavn for chevron
   */
  className?: string;
}
class NavFrontendChevron extends React.Component<NavFrontendChevronProps> {
  render() {
    const { type, stor, className, ...props } = this.props;
    return <span className={cls(type, stor, className)} {...props} />;
  }
}

(NavFrontendChevron as any).defaultProps = {
  type: "høyre",
  stor: false,
  className: "",
};

(NavFrontendChevron as any).propTypes = {
  /**
   * Bestemmer hvilken vei Chevron skal peke
   */
  type: PT.oneOf(["høyre", "venstre", "opp", "ned"]),
  /**
   * Sett denne proppen hvis chevron skal være stor
   */
  stor: PT.bool,
  /**
   * Klassenavn for chevron
   */
  className: PT.string,
};

export default NavFrontendChevron;

export { default as HoyreChevron } from "./hoyre-chevron";
export { default as VenstreChevron } from "./venstre-chevron";
export { default as OppChevron } from "./opp-chevron";
export { default as NedChevron } from "./ned-chevron";

import * as React from "react";
import * as cn from "classnames";
import Chevron from "nav-frontend-chevron";

export interface LesMerToggleProps {
  erApen: boolean;
  onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  lukkTekst: React.ReactNode;
  apneTekst: React.ReactNode;
}

class LesMerToggle extends React.Component<LesMerToggleProps> {
  render() {
    const { erApen, onClick, lukkTekst, apneTekst, ...other } = this.props;

    const btnClassName = cn("lesMerPanel__togglelink", {
      "lesMerPanel__togglelink--erApen": erApen,
    });

    return (
      <div className="lesMerPanel__toggle">
        <button
          type="button"
          aria-expanded={erApen}
          onClick={onClick}
          className={btnClassName}
          {...other}
        >
          <Chevron
            type={erApen ? "opp" : "ned"}
            className="lesMerPanel__toggleChevron"
          />
          <div className="lesMerPanel__toggleTekst">
            {erApen ? lukkTekst : apneTekst}
          </div>
        </button>
      </div>
    );
  }
}

export default LesMerToggle;

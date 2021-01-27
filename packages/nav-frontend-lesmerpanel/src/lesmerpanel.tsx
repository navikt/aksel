import * as React from "react";
import * as PT from "prop-types";
import "nav-frontend-lesmerpanel-style";
import { UnmountClosed } from "react-collapse";
import { guid, omit } from "nav-frontend-js-utils";
import * as classNames from "classnames";
import LesmerpanelToggle from "./lesmerpanelToggle";

export interface LesMerPanelBaseProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Hvorvidt panelet initielt er åpent
   */
  defaultApen?: boolean;
  /**
   * Funksjon som kalles når panelet åpnes
   */
  onOpen?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  /**
   * Funksjon som kalles når panelet lukkes
   */
  onClose?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  /**
   * Innhold som plasseres før "Åpne"
   */
  intro?: React.ReactNode;
  /**
   * Innhold som vises når man klikker på "Åpne"
   */
  children: React.ReactNode;
  /**
   * ID til panelet
   */
  id?: string;
  /**
   * Tekst som vises for å lukke panelet
   */
  lukkTekst: React.ReactNode;
  /**
   * Tekst som vises for å åpne panelet
   */
  apneTekst: React.ReactNode;
  /**
   * Egendefinert klassenavn
   */
  className?: string;
  /**
   * Hvis komponenten skal brukes på hvit bakgrunn kan denne brukes for å gi den en border
   */
  border?: boolean;
}

export interface LesMerPanelBaseState {
  erApen: boolean;
}

const lesMerPanelCls = (props) =>
  classNames("lesMerPanel", props.className, {
    "lesMerPanel--border": props.border,
  });

/**
 * Lesmerpanel
 */
class Lesmerpanel extends React.Component<
  LesMerPanelBaseProps,
  LesMerPanelBaseState
> {
  static defaultProps: Partial<LesMerPanelBaseProps> = {
    defaultApen: false,
    apneTekst: "Åpne",
    lukkTekst: "Lukk",
    onClose: () => {},
    onOpen: () => {},
  };

  constructor(props) {
    super(props);

    this.state = { erApen: props.defaultApen };
  }

  toggle = (e) => {
    e.preventDefault();
    this.setState({ erApen: !this.state.erApen });
    if (this.state.erApen) {
      this.props.onClose!(e);
    } else {
      this.props.onOpen!(e);
    }
  };

  render() {
    const {
      intro,
      children,
      apneTekst,
      lukkTekst,
      id = guid(),
      ...other
    } = this.props;
    const domProps = omit(
      other,
      "border",
      "onOpen",
      "onClose",
      "defaultApen",
      "className"
    );

    return (
      <div id={id} className={lesMerPanelCls(this.props)} {...domProps}>
        {intro && <div className="lesMerPanel__intro">{intro}</div>}
        <div className="lesMerPanel__merContainer">
          <UnmountClosed isOpened={this.state.erApen}>
            <div className="lesMerPanel__mer">{children}</div>
          </UnmountClosed>
        </div>
        <LesmerpanelToggle
          aria-controls={id}
          apneTekst={apneTekst}
          lukkTekst={lukkTekst}
          erApen={this.state.erApen}
          onClick={this.toggle}
        />
      </div>
    );
  }
}

(Lesmerpanel as any).propTypes = {
  /**
   * Hvorvidt panelet initielt er åpent
   */
  defaultApen: PT.bool,
  /**
   * Funksjon som kalles når panelet åpnes
   */
  onOpen: PT.func,
  /**
   * Funksjon som kalles når panelet lukkes
   */
  onClose: PT.func,
  /**
   * Innhold som plasseres før "Åpne"
   */
  intro: PT.node,
  /**
   * Innhold som vises når man klikker på "Åpne"
   */
  children: PT.node.isRequired,
  /**
   * ID til panelet
   */
  id: PT.string,
  /**
   * Tekst som vises for å lukke panelet
   */
  lukkTekst: PT.string.isRequired,
  /**
   * Tekst som vises for å åpne panelet
   */
  apneTekst: PT.string.isRequired,
  /**
   * Egendefinert klassenavn
   */
  className: PT.string,
  /**
   * Hvis komponenten skal brukes på hvit bakgrunn kan denne brukes for å gi den en border
   */
  border: PT.bool,
};

export default Lesmerpanel;

import * as React from "react";
import classnames from "classnames";
import { guid, keyCodes } from "nav-frontend-js-utils";
import Ikon from "nav-frontend-ikoner-assets";
import Popover, {
  PopoverOrientering,
  PopoverProps,
} from "nav-frontend-popover";

import "nav-frontend-hjelpetekst-style";

export interface HjelpetekstProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Egendefinert klassenavn.
   */
  className?: string;
  /**
   * Tekst som vises med mouseover og leses av skjermlesere.
   */
  tittel?: string;
  /**
   * Bestemmer posisjon på Popover i forhold til Hjelpetekst-knappen.
   * Videreformidles til intern Popover-instans.
   */
  type?: PopoverOrientering;
  /**
   * Popover props som videreformidles til intern instans av Popover.
   */
  popoverProps?: PopoverProps;
}

export interface State {
  ankerEl?: HTMLButtonElement;
}

class Hjelpetekst extends React.Component<HjelpetekstProps, State> {
  static defaultProps: Partial<HjelpetekstProps> = {
    type: PopoverOrientering.Over,
    tittel: "Hjelp",
  };

  private knappRef = React.createRef<HTMLButtonElement>();

  private popoverId: string;

  constructor(props) {
    super(props);

    this.state = {
      ankerEl: undefined,
    };

    this.popoverId = guid();
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  }

  handleKeydown = (e) => {
    if (!this.state.ankerEl) return;
    if (e.keyCode === keyCodes.esc) this.knappRef.current!.focus();
  };

  togglePopover = (e?: React.SyntheticEvent<HTMLButtonElement>) => {
    if (e && !this.state.ankerEl) {
      this.setState({ ankerEl: e.currentTarget });
    } else {
      this.setState({ ankerEl: undefined });
    }
  };

  render() {
    const {
      children,
      className,
      popoverProps,
      type,
      tittel,
      ...rest
    } = this.props;

    return (
      <div className={classnames("hjelpetekst", className)}>
        <button
          type="button"
          className="hjelpetekst__apneknapp"
          onClick={this.togglePopover}
          title={tittel}
          aria-expanded={this.state.ankerEl !== undefined}
          aria-controls={this.popoverId}
          aria-haspopup="dialog"
          ref={this.knappRef}
          {...rest}
        >
          <Ikon kind="help-circle" className="hjelpetekst__ikon" />
          <span className="sr-only">{tittel}</span>
        </button>
        <Popover
          id={this.popoverId}
          ankerEl={this.state.ankerEl}
          onRequestClose={this.togglePopover}
          orientering={type}
          role="tooltip"
          {...popoverProps}
        >
          <div className="hjelpetekst__innhold">{this.props.children}</div>
        </Popover>
      </div>
    );
  }
}

export default Hjelpetekst;

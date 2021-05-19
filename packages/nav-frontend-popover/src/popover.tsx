import * as React from "react";
import * as ReactDOM from "react-dom";
import classnames from "classnames";

import {
  EventThrottler,
  keyCodes,
  getViewportDimensions,
  getScrollParents,
} from "nav-frontend-js-utils";

import PopoverBase, {
  PopoverBaseProps,
  PopoverPosisjonShape,
  PopoverOrientering,
} from "./popover-base";

const cls = (state, className) =>
  classnames("popover--controlled", className, {
    "popover--hidden": !state.apen,
  });

export interface PopoverProps extends PopoverBaseProps {
  /**
   * Elementet som popover er forankret til. Dette elementet blir brukt til å posisjonere popover.
   */
  ankerEl?: HTMLElement;
  /**
   * Egedefinert styling
   */
  className?: string;
  /**
   * Callback når popover åpnes.
   */
  onOpen?: () => void;
  /**
   * Callback når popover ber om å lukkes.
   */
  onRequestClose: () => void;
  /**
   * Avstand til anker element i pixler. Default er `16px` (`1rem`) med pil, eller `0` uten pil.
   */
  avstandTilAnker?: number;
  /**
   * Bestemmer om Popover automatisk skal få fokus når den vises.
   */
  autoFokus?: boolean;
}

interface PopoverState {
  apen: boolean;
  posisjon?: PopoverPosisjonShape;
}

class Popover extends React.Component<PopoverProps, PopoverState> {
  static defaultProps: Partial<PopoverProps> = {
    autoFokus: true,
  };

  private popoverRef = React.createRef<HTMLDivElement>();

  private popoverEl;

  private cachedMeasurements;

  private listenToScrollOn;

  private scrollParents: (HTMLElement | Window)[] = [];

  constructor(props) {
    super(props);

    this.state = {
      apen: this.props.ankerEl !== undefined,
    };
  }

  componentDidMount() {
    window.addEventListener("click", this.handleClick);
    window.addEventListener("keydown", this.handleKeydown);
    this.popoverEl = this.popoverRef.current;
    this.scrollParents = getScrollParents(this.popoverEl);
    this.scrollParents.forEach((scrollParent) =>
      scrollParent.addEventListener("scroll", this.handleScroll)
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.ankerEl && this.props.ankerEl) {
      this.setState({ apen: true });
    } else if (prevProps.ankerEl && !this.props.ankerEl) {
      this.setState({ apen: false });
    }

    if (this.state.apen && !prevState.apen) {
      this.updatePosition(this.props);
      if (this.props.autoFokus) this.popoverEl.focus();
    }
  }

  // eslint-disable-next-line camelcase
  componentWillUnmount() {
    window.removeEventListener("click", this.handleClick);
    window.removeEventListener("keydown", this.handleKeydown);
    this.scrollParents.forEach((scrollParent) =>
      scrollParent.removeEventListener("scroll", this.handleScroll)
    );
  }

  handleScroll = () => {
    if (!this.state.apen) return;
    this.updatePosition(this.props);
  };

  handleResize = () => {
    if (!this.state.apen) return;
    this.cachedMeasurements = this.popoverEl.getBoundingClientRect();
    this.updatePosition(this.props);
  };

  handleKeydown = (e) => {
    if (!this.state.apen) return;
    if (e.keyCode === keyCodes.esc) this.props.onRequestClose();
    if (e.keyCode === keyCodes.tab) this.checkFocus();
  };

  handleClick = (e) => {
    if (
      this.state.apen &&
      !ReactDOM.findDOMNode(this.props.ankerEl)?.contains(e.target)
    ) {
      this.props.onRequestClose();
    }
  };

  updatePosition = (props) => {
    const posisjon = this.calculatePosition(props);
    this.setState({ posisjon });
  };

  getPosition = () => {
    if (!this.state.apen || !this.state.posisjon) return;
    // eslint-disable-next-line consistent-return
    return {
      left: this.state.posisjon!.left,
      top: this.state.posisjon!.top,
      pilLeft: this.state.posisjon!.pilLeft,
    };
  };

  checkFocus = () => {
    window.setTimeout(() => {
      const focusElement = document.activeElement;
      if (
        focusElement === this.popoverEl ||
        focusElement === this.props.ankerEl ||
        (this.popoverEl.contains && this.popoverEl.contains(focusElement))
      ) {
        return;
      }
      this.props.onRequestClose();
    }, 0); // tslint:disable-line:align
  };

  calculatePosition = (props) => {
    const popoverOffset = this.popoverEl.getBoundingClientRect();
    const ankerOffset = props.ankerEl.getBoundingClientRect();
    let avstandTilAnker = props.utenPil ? 0 : 12;

    if (typeof props.avstandTilAnker !== "undefined") {
      avstandTilAnker = props.avstandTilAnker;
    }

    let left;
    let top;

    switch (props.orientering) {
      case PopoverOrientering.OverHoyre:
        left = ankerOffset.left + ankerOffset.width - popoverOffset.width;
        top = ankerOffset.top - avstandTilAnker - popoverOffset.height;
        break;
      case PopoverOrientering.OverVenstre:
        left = ankerOffset.left;
        top = ankerOffset.top - avstandTilAnker - popoverOffset.height;
        break;
      case PopoverOrientering.Venstre:
        left = ankerOffset.left - popoverOffset.width - avstandTilAnker;
        top =
          ankerOffset.top + ankerOffset.height / 2 - popoverOffset.height / 2;
        break;
      case PopoverOrientering.Hoyre:
        left = ankerOffset.left + ankerOffset.width + avstandTilAnker;
        top =
          ankerOffset.top + ankerOffset.height / 2 - popoverOffset.height / 2;
        break;
      case PopoverOrientering.UnderHoyre:
        left = ankerOffset.left + ankerOffset.width - popoverOffset.width;
        top = ankerOffset.top + ankerOffset.height + avstandTilAnker;
        break;
      case PopoverOrientering.UnderVenstre:
        left = ankerOffset.left;
        top = ankerOffset.top + ankerOffset.height + avstandTilAnker;
        break;
      case PopoverOrientering.Under:
        left =
          ankerOffset.left + ankerOffset.width / 2 - popoverOffset.width / 2;
        top = ankerOffset.top + ankerOffset.height + avstandTilAnker;
        break;
      default:
        // PopoverOrientering.Over
        left =
          ankerOffset.left + ankerOffset.width / 2 - popoverOffset.width / 2;
        top = ankerOffset.top - avstandTilAnker - popoverOffset.height;
        break;
    }

    const viewPortDimensions = getViewportDimensions();

    left = Math.max(0, left);
    left = Math.min(
      Math.abs(left),
      Math.abs(viewPortDimensions.w - popoverOffset.width)
    );

    const pilLeft = ankerOffset.left + ankerOffset.width / 2 - left - 1;

    return { left, top, pilLeft };
  };

  render() {
    const {
      children,
      ankerEl,
      onRequestClose,
      avstandTilAnker,
      autoFokus,
      className,
      ...rest
    } = this.props;
    const position = this.getPosition();
    return (
      <EventThrottler event="resize" callback={this.handleResize} delay={100}>
        <PopoverBase
          className={cls(this.state, className)}
          innerRef={this.popoverRef}
          posisjon={position}
          tabIndex={0}
          {...rest}
        >
          {children}
        </PopoverBase>
      </EventThrottler>
    );
  }
}

export default Popover;
export { default as PopoverBase } from "./popover-base";
export { PopoverOrientering } from "./popover-base";

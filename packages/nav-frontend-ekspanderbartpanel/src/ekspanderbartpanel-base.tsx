import * as React from "react";
import classnames from "classnames";
import {
  UnmountClosed,
  Collapse,
  CollapseProps,
  CollapseCallbackArgs,
} from "react-collapse";
import "nav-frontend-ekspanderbartpanel-style";
import { guid, keyCodes } from "nav-frontend-js-utils";

const cls = (props) =>
  classnames("ekspanderbartPanel", props.className, {
    "ekspanderbartPanel--lukket": !props.apen,
    "ekspanderbartPanel--apen": props.apen,
    "ekspanderbartPanel--border": props.border,
  });

export interface EkspanderbartpanelBaseProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Egendefinert klassenavn
   */
  className?: string;
  /**
   * Skal komponenten være 'default' åpen
   */
  apen?: boolean;
  /**
   * Callback funksjon for når knappen blir klikket på
   */
  onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  /**
   * Tittel/label-tekst
   */
  tittel: React.ReactNode;
  /**
   * Hvis komponenten skal brukes på hvit bakgrunn bør den ha en border.
   */
  border?: boolean;
  /**
   * Props til intern instans av react-collapse
   */
  collapseProps?: Omit<CollapseProps, "children" | "isOpened">;
  /**
   * Dersom innholdet skal rendres men ikke vises, når panelet er lukket
   */
  renderContentWhenClosed?: boolean;
}

class EkspanderbartpanelBase extends React.PureComponent<
  EkspanderbartpanelBaseProps,
  {}
> {
  private buttonId: string;

  private contentId: string;

  private isCloseAnimation: boolean = false;

  static defaultProps: Partial<EkspanderbartpanelBaseProps> = {
    border: true,
  };

  constructor(props: EkspanderbartpanelBaseProps) {
    super(props);
    this.buttonId = this.props.id || guid();
    this.contentId = guid();
  }

  componentDidUpdate(prevProps) {
    if (!this.props.apen && prevProps.apen) {
      this.isCloseAnimation = true;
    }
  }

  onRestProxy = (args: CollapseCallbackArgs) => {
    this.isCloseAnimation = false;

    const { collapseProps } = this.props;
    if (collapseProps && collapseProps.onRest) {
      collapseProps.onRest(args);
    }
  };

  handleKeyDown = (event) => {
    if (event.keyCode === keyCodes.tab && this.isCloseAnimation) {
      event.preventDefault();
    }
  };

  render() {
    const {
      className,
      children,
      apen,
      tittel,
      onClick,
      collapseProps,
      border,
      renderContentWhenClosed,
      ...rest
    } = this.props;

    const CollapseComponent = renderContentWhenClosed
      ? Collapse
      : UnmountClosed;

    return (
      <div className={cls(this.props)}>
        <button
          id={this.buttonId}
          className="ekspanderbartPanel__hode"
          onKeyDown={this.handleKeyDown}
          onClick={onClick}
          aria-expanded={apen}
          aria-controls={this.contentId}
          type="button"
          {...rest}
        >
          <div className="ekspanderbartPanel__flex-wrapper">
            <span className="ekspanderbartPanel__tittel">{tittel}</span>
            <span className="ekspanderbartPanel__indikator" />
          </div>
        </button>
        <div role="region" id={this.contentId} aria-labelledby={this.buttonId}>
          <CollapseComponent
            isOpened={!!apen}
            onRest={this.onRestProxy}
            {...collapseProps}
          >
            <div className="ekspanderbartPanel__innhold">{children}</div>
          </CollapseComponent>
        </div>
      </div>
    );
  }
}

export default EkspanderbartpanelBase;

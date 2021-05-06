import * as React from "react";
import * as cn from "classnames";

import { omit } from "nav-frontend-js-utils";
import StegindikatorSteg, {
  StegindikatorStegProps,
} from "./stegindikator-steg";

import "nav-frontend-stegindikator-style";

const cls = (state) =>
  cn("stegindikator", {
    "stegindikator--kompakt": state.kompakt,
  });

export interface StegindikatorProps {
  /**
   * Array av steg, se `stegindikator-steg.tsx`. Merk at steg også kan defineres som children av typen
   * <Stegindikator.Steg />.
   */
  steg?: StegindikatorStegProps[];
  /**
   * Vise/skjule steg label
   */
  visLabel: boolean;
  /**
   * Kompakt versjon som krever mye mindre plass
   */
  kompakt: boolean;
  /**
   * Optional aktivt steg override. Kan brukes hvis det f.eks. er flere stegindikatorer på en side, hvor alle skal
   * oppdateres hvis den ene endrer seg.
   */
  aktivtSteg?: number;
  /**
   * Valgfri callback som kjøres når state endrer seg etter click
   */
  onChange?: (index: number) => void;
  /**
   * Valgfri callback som kjøres før `onChange`. Kan avbryte kall til `onChange` hvis den returnerer `false`
   */
  onBeforeChange?: (index: number) => boolean;
  /**
   * Komponenten vil auto-justere seg selv avhengig av tilgjengelig konteiner-bredde, lytter på window `resize` event
   */
  autoResponsiv: boolean;
}

export interface StegindikatorState {
  aktivtSteg: number;
  visLabel: boolean;
  kompakt: boolean;
}

class Stegindikator extends React.Component<
  StegindikatorProps,
  StegindikatorState
> {
  static Steg = StegindikatorSteg;

  static defaultProps: Partial<StegindikatorProps> = {
    steg: [],
    visLabel: false,
    kompakt: false,
    autoResponsiv: false,
  };

  private list!: HTMLOListElement;

  constructor(props: StegindikatorProps) {
    super(props);

    let initialAktivtSteg;
    if (this.props.aktivtSteg !== undefined) {
      initialAktivtSteg = this.props.aktivtSteg;
    } else {
      initialAktivtSteg = this.getDefaultActiveStegIndex();
    }

    this.state = {
      aktivtSteg: initialAktivtSteg,
      visLabel: props.visLabel,
      kompakt: props.kompakt,
    };
  }

  componentDidMount() {
    if (this.props.autoResponsiv) {
      window.addEventListener("resize", this.adjustSize);
      this.adjustSize();
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: StegindikatorProps) {
    if (!this.props.autoResponsiv && nextProps.autoResponsiv) {
      window.addEventListener("resize", this.adjustSize);
    }

    if (nextProps.autoResponsiv) {
      this.setState({
        visLabel: this.canShowLabel() ? nextProps.visLabel : false,
        kompakt: nextProps.kompakt || !this.canBeNormal(),
      });
    } else {
      this.setState({
        visLabel: nextProps.visLabel,
        kompakt: nextProps.kompakt,
      });
    }

    if (
      nextProps.aktivtSteg !== undefined &&
      nextProps.aktivtSteg !== this.state.aktivtSteg
    ) {
      this.setState({
        aktivtSteg: nextProps.aktivtSteg,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.adjustSize);
  }

  getDefaultActiveStegIndex() {
    let index;
    if (this.props.children) {
      React.Children.forEach(this.props.children, (child, i) => {
        if (React.isValidElement(child)) {
          const clone = React.cloneElement(child as React.ReactElement<any>);
          if (clone.props.aktiv) {
            index = i;
          }
        }
      });
    } else {
      index = this.props.steg!.findIndex((steg) => !!steg.aktiv);
    }
    return index !== -1 ? index : 0;
  }

  getNumSteg() {
    if (this.props.children) {
      return React.Children.toArray(this.props.children).filter((child) =>
        React.isValidElement(child)
      ).length;
    }
    return this.props.steg!.length;
  }

  getDimensions() {
    const numSteg = this.getNumSteg();
    const remSize = parseFloat(
      String(getComputedStyle(document.documentElement).fontSize)
    );
    const margin = remSize * 1.25;
    const marginTotal = margin * numSteg - margin;
    const visLabelWidth = remSize * 10 * numSteg + marginTotal;
    const normalWidth = remSize * 2 * numSteg + marginTotal;

    return {
      visLabelWidth,
      normalWidth,
      container: this.list!.getBoundingClientRect().width,
    };
  }

  handleClick = (e, index) => {
    e.preventDefault();
    if (!this.props.onBeforeChange || this.props.onBeforeChange(index)) {
      this.setState({
        aktivtSteg: index,
      });
      // tslint:disable-next-line:no-unused-expression
      if (typeof this.props.onChange === "function")
        this.props.onChange(index)!;
    }
  };

  canShowLabel = () => {
    const dim = this.getDimensions();
    return dim.container >= dim.visLabelWidth && this.props.visLabel;
  };

  canBeNormal = () => {
    const dim = this.getDimensions();
    return dim.container >= dim.normalWidth && !this.props.kompakt;
  };

  adjustSize = () => {
    if (!this.list) return;

    this.setState({
      visLabel: this.canShowLabel(),
      kompakt: !this.canBeNormal(),
    });
  };

  renderSteg() {
    // eslint-disable-next-line max-len
    const onClick = (i) =>
      typeof this.props.onChange === "function"
        ? (e) => this.handleClick(e, i)
        : undefined;

    if (this.props.children) {
      return React.Children.map(this.props.children, (child, i) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            index: child.props.index || i,
            aktiv: i === this.state.aktivtSteg,
            ferdig: child.props.ferdig || i < this.state.aktivtSteg,
            onClick: !child.props.disabled ? onClick(i) : undefined,
            visLabel: this.state.visLabel,
          });
        }
        return child;
      });
    }

    return this.props.steg!.map((steg, i) => {
      const stegDomProps = omit(
        steg,
        "label",
        "aktiv",
        "ferdig",
        "visLabel",
        "index",
        "onClick"
      );

      const ferdig = steg.ferdig || i < this.state.aktivtSteg;
      const aktiv = i === this.state.aktivtSteg;

      return (
        <StegindikatorSteg
          index={i}
          label={steg.label}
          visLabel={this.state.visLabel}
          key={`${steg.label.split(" ").join("")}`}
          aktiv={aktiv}
          ferdig={ferdig}
          onClick={!steg.disabled ? onClick(i) : undefined}
          {...stegDomProps}
        />
      );
    });
  }

  render() {
    const domProps = omit(
      this.props,
      "steg",
      "children",
      "visLabel",
      "kompakt",
      "onChange",
      "onBeforeChange",
      "autoResponsiv",
      "aktivtSteg"
    );

    return (
      <div className={cls(this.state)} {...domProps}>
        <ol
          className="stegindikator__liste"
          ref={(list: HTMLOListElement) => {
            this.list = list;
          }}
        >
          {this.renderSteg()}
        </ol>
      </div>
    );
  }
}

export default Stegindikator;

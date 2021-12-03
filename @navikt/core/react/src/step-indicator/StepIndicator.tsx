import * as React from "react";
import cn from "classnames";

import { omit } from "nav-frontend-js-utils";

import "nav-frontend-stegindikator-style";

const cls = (kompakt) =>
  cn("stegindikator", {
    "stegindikator--kompakt": kompakt,
  });

export interface StepIndicatorProps {
  children: React.ReactNode;
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

// static defaultProps: Partial<StepIndicatorProps> = {
StepIndicator.defaultProps = {
  visLabel: false,
  kompakt: false,
  autoResponsiv: false,
};

function StepIndicator(props: StepIndicatorProps) {
  // static Steg = StepIndicatorStep;

  let list!: HTMLOListElement;

  const getDefaultActiveStegIndex = () => {
    let index;
    React.Children.forEach(props.children, (child, i) => {
      if (React.isValidElement(child)) {
        const clone = React.cloneElement(child as React.ReactElement<any>);
        if (clone.props.aktiv) {
          index = i;
        }
      }
    });
    return index !== -1 ? index : 0;
  };

  let initialAktivtSteg;
  if (props.aktivtSteg !== undefined) {
    initialAktivtSteg = props.aktivtSteg;
  } else {
    initialAktivtSteg = getDefaultActiveStegIndex();
  }

  const [aktivtSteg, setAktivtSteg] = React.useState(initialAktivtSteg);
  const [visLabel, setVisLabel] = React.useState(props.visLabel);
  const [kompakt, setVisKompakt] = React.useState(props.kompakt);

  //replace componentDidMount and componentWillUnmount
  React.useEffect(() => {
    if (props.autoResponsiv) {
      window.addEventListener("resize", adjustSize);
      adjustSize();
    }
    return () => {
      window.removeEventListener("resize", adjustSize);
    };
  });

  // eslint-disable-next-line camelcase
  //replace with getDerivedStateFromProps
  const UNSAFE_componentWillReceiveProps = (nextProps: StepIndicatorProps) => {
    if (!props.autoResponsiv && nextProps.autoResponsiv) {
      window.addEventListener("resize", adjustSize);
    }

    if (nextProps.autoResponsiv) {
      setVisLabel(canShowLabel() ? nextProps.visLabel : false);
      setVisKompakt(nextProps.kompakt || !canBeNormal());
    } else {
      setVisLabel(nextProps.visLabel);
      setVisKompakt(nextProps.kompakt);
    }

    if (
      nextProps.aktivtSteg !== undefined &&
      nextProps.aktivtSteg !== aktivtSteg
    ) {
      setAktivtSteg(nextProps.aktivtSteg);
    }
  };

  const getNumSteg = () => {
    return React.Children.toArray(props.children).filter((child) =>
      React.isValidElement(child)
    ).length;
  };

  const getDimensions = () => {
    const numSteg = getNumSteg();
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
      container: list!.getBoundingClientRect().width,
    };
  };

  const handleClick = (e, index) => {
    e.preventDefault();
    if (!props.onBeforeChange || props.onBeforeChange(index)) {
      setAktivtSteg(index);
      // tslint:disable-next-line:no-unused-expression
      if (typeof props.onChange === "function") props.onChange(index)!;
    }
  };

  const canShowLabel = () => {
    const dim = getDimensions();
    return dim.container >= dim.visLabelWidth && props.visLabel;
  };

  const canBeNormal = () => {
    const dim = getDimensions();
    return dim.container >= dim.normalWidth && !props.kompakt;
  };

  const adjustSize = () => {
    if (!list) return;

    setVisLabel(canShowLabel());
    setVisKompakt(!canBeNormal());
  };

  const renderSteg = () => {
    // eslint-disable-next-line max-len
    const onClick = (i) =>
      typeof props.onChange === "function"
        ? (e) => handleClick(e, i)
        : undefined;

    return React.Children.map(props.children, (child, i) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<any>, {
          index: child.props.index || i,
          aktiv: i === aktivtSteg,
          ferdig: child.props.ferdig || i < aktivtSteg,
          onClick: !child.props.disabled ? onClick(i) : undefined,
          visLabel: visLabel,
        });
      }
      return child;
    });
  };

  const domProps = omit(
    props,
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
    <div className={cls(kompakt)} {...domProps}>
      <ol
        className="stegindikator__liste"
        ref={(list: HTMLOListElement) => {
          list = list;
        }}
      >
        {renderSteg()}
      </ol>
    </div>
  );
}

export default StepIndicator;

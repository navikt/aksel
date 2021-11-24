// import React, { forwardRef } from "react";

// export interface StepIndicatorProps
//   extends React.HTMLAttributes<HTMLDivElement> {}

// const StepIndicator = forwardRef<HTMLDivElement, StepIndicatorProps>(() => (
//   <div>test</div>
// ));

// export default StepIndicator;

import * as React from "react";
import cn from "classnames";

import { omit } from "nav-frontend-js-utils";
import StepIndicatorStep, { StepIndicatorStepProps } from "./StepIndicatorStep";

import "nav-frontend-stegindikator-style";
import { useState } from "@storybook/addons";

const cls = (state) =>
  cn("stegindikator", {
    "stegindikator--kompakt": state.kompakt,
  });

export interface StepIndicatorProps {
  /**
   * Array av steg, se `stegindikator-steg.tsx`. Merk at steg også kan defineres som children av typen
   * <StepIndicator.Steg />.
   */
  steg?: StepIndicatorStepProps[];
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

export interface StepIndicatorState {
  aktivtSteg: number;
  visLabel: boolean;
  kompakt: boolean;
}

function StepIndicator(props: StepIndicatorProps & StepIndicatorState) {
  // static Steg = StepIndicatorStep;

  // static defaultProps: Partial<StepIndicatorProps> = {
  //   steg: [],
  //   visLabel: false,
  //   kompakt: false,
  //   autoResponsiv: false,
  // };

  let list!: HTMLOListElement;

  //   constructor(props: StepIndicatorProps) {
  //     super(props);

  //     let initialAktivtSteg;
  //     if (props.aktivtSteg !== undefined) {
  //       initialAktivtSteg = props.aktivtSteg;
  //     } else {
  //       initialAktivtSteg = getDefaultActiveStegIndex();
  //     }

  //     state = {
  //       aktivtSteg: initialAktivtSteg,
  //       visLabel: props.visLabel,
  //       kompakt: props.kompakt,
  //     };
  //   }

  let initialAktivtSteg;
  if (props.aktivtSteg !== undefined) {
    initialAktivtSteg = props.aktivtSteg;
  } else {
    initialAktivtSteg = getDefaultActiveStegIndex();
  }

  const [aktivtSteg, setAktivtSteg] = React.useState(initialAktivtSteg);
  const [visLabel, setVisLabel] = useState(props.visLabel);
  const [visKompakt, setVisKompakt] = useState(props.kompakt);

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

  const getDefaultActiveStegIndex = () => {
    let index;
    if (props.children) {
      React.Children.forEach(props.children, (child, i) => {
        if (React.isValidElement(child)) {
          const clone = React.cloneElement(child as React.ReactElement<any>);
          if (clone.props.aktiv) {
            index = i;
          }
        }
      });
    } else {
      index = props.steg!.findIndex((steg) => !!steg.aktiv);
    }
    return index !== -1 ? index : 0;
  };

  const getNumSteg = () => {
    if (props.children) {
      return React.Children.toArray(props.children).filter((child) =>
        React.isValidElement(child)
      ).length;
    }
    return props.steg!.length;
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

    if (props.children) {
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
    }

    return props.steg!.map((steg, i) => {
      const stegDomProps = omit(
        steg,
        "label",
        "aktiv",
        "ferdig",
        "visLabel",
        "index",
        "onClick"
      );

      const ferdig = steg.ferdig || i < aktivtSteg;
      const aktiv = i === aktivtSteg;

      return (
        <StepIndicatorStep
          index={i}
          label={steg.label}
          visLabel={visLabel}
          key={`${steg.label.split(" ").join("")}`}
          aktiv={aktiv}
          ferdig={ferdig}
          onClick={!steg.disabled ? onClick(i) : undefined}
          {...stegDomProps}
        />
      );
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
    <div className={cls(state)} {...domProps}>
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

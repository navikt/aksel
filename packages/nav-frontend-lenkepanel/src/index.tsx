import * as PT from "prop-types";
import * as React from "react";
import Typografi from "nav-frontend-typografi";
import "nav-frontend-lenkepanel-style";
import LenkepanelBase, { LenkepanelBaseProps } from "./Lenkepanel-base";

export interface LenkepanelProps extends LenkepanelBaseProps {
  /**
   * Typografitype
   */
  tittelProps: string;
}

class Lenkepanel extends React.PureComponent<LenkepanelProps> {
  render() {
    const {
      children,
      tittelProps = "undertittel",
      ...renderProps
    } = this.props;
    const headingConfig = { type: tittelProps, tag: "span" };
    // eslint-disable-next-line max-len
    const heading = (
      <Typografi
        key="heading"
        {...headingConfig}
        className="lenkepanel__heading"
      >
        {children}
      </Typografi>
    );

    return <LenkepanelBase {...renderProps}>{heading}</LenkepanelBase>;
  }
}

(Lenkepanel as React.ComponentClass).propTypes = {
  /**
   * Klassenavn
   */
  className: PT.string,
  /**
   * Lenke (denne sendes som prop til linkCreator)
   */
  href: PT.string.isRequired,
  /**
   * Tekstinnhold for lenkepanel
   */
  children: PT.oneOfType([PT.arrayOf(PT.node), PT.node]).isRequired,
  /**
   * Typografitype
   */
  tittelProps: PT.string,
  /**
   * Funksjon som brukes for å lage lenken. her kan du spessifisere din egen hvis du f.eks. bruker React Router
   */
  linkCreator: PT.func,
};

(Lenkepanel as React.ComponentClass).defaultProps = {
  className: undefined,
  tittelProps: "undertittel",
  linkCreator: (props) => <a {...props} />,
};

export default Lenkepanel;
export { default as LenkepanelBase } from "./Lenkepanel-base";

import React from "react";
import classnames from "classnames";

import { Hamburgerknapp } from "nav-frontend-ikonknapper";

import "./styles.less";

class MobileNavToggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shadow: false,
    };

    window.addEventListener("scroll", () => this.checkScroll());
  }

  checkScroll = () => {
    if (window.scrollY > 60) {
      this.setState({
        shadow: true,
      });
    } else {
      this.setState({
        shadow: false,
      });
    }
  };

  render() {
    const { innerRef, ...rest } = this.props;
    return (
      <Hamburgerknapp
        className={classnames("mobile-nav-toggle", {
          "mobile-nav-toggle--with-shadow": this.state.shadow,
        })}
        ref={innerRef}
        {...rest}
      >
        <span className="sr-only">Åpne meny</span>
      </Hamburgerknapp>
    );
  }
}

export default MobileNavToggle;

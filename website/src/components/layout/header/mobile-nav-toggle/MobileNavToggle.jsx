import React from "react";
import { Hamburgerknapp } from "nav-frontend-ikonknapper";
import "./styles.less";

const MobileNavToggle = ({ ...props }) => {
  const { innerRef, ...rest } = props;
  return (
    <Hamburgerknapp className="mobile-nav-toggle" ref={innerRef} {...rest}>
      <span className="sr-only">Åpne meny</span>
    </Hamburgerknapp>
  );
};

export default MobileNavToggle;

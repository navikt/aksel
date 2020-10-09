import React from "react";
import { Link } from "gatsby";
import classnames from "classnames";

class MobileNavMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
    };
  }

  toggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    return (
      <li className={classnames({ open: this.props.open })}>
        <Link to={this.props.route.path}>{this.props.route.title}</Link>
        {this.props.route.routes && [this.props.children]}
      </li>
    );
  }
}

export default MobileNavMenuItem;

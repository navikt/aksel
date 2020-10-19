import React from "react";
import classnames from "classnames";
import Color from "color";

import "./styles.less";

const cls = (col) =>
  classnames({
    "color-sample": true,
    light: col.isLight(),
  });

class ColorSample extends React.Component {
  handleClick = () => {
    if (typeof this.props.onClick === "function") {
      this.props.onClick({ name: this.props.name, color: this.color });
    }
  };

  render() {
    this.color = Color(this.props.color);
    return (
      <button
        className={cls(this.color)}
        style={{ background: this.color.hex(), borderColor: this.color.hex() }}
        type="button"
        onClick={this.handleClick}
      >
        <span>{this.props.name}</span>
        <span>{this.color.hex()}</span>
      </button>
    );
  }
}

export default ColorSample;

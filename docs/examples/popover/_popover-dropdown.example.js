/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Menyknapp } from "nav-frontend-ikonknapper";
import { guid } from "nav-frontend-js-utils";
// eslint-disable-next-line
import Popover from "nav-frontend-popover";

export default class PopoverDropdownEksempel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anker: undefined,
    };

    this.buttonId = guid();
    this.popoverId = guid();
  }

  togglePopover = (anker) => {
    this.setState({ anker: this.state.anker ? undefined : anker });
  };

  render() {
    return (
      <div>
        <Menyknapp
          id={this.buttonId}
          onClick={(e) => this.togglePopover(e.currentTarget)}
          aria-expanded={this.state.anker !== undefined}
          aria-controls={this.popoverId}
          aria-haspopup="menu"
        >
          <span>Dropdown meny</span>
        </Menyknapp>
        <Popover
          id={this.popoverId}
          ankerEl={this.state.anker}
          onRequestClose={() => this.setState({ anker: undefined })}
          orientering="under"
          autoFokus={false}
          tabIndex={-1}
          utenPil
        >
          <ul
            className="menu"
            role="menu"
            style={{ minWidth: 190 }}
            aria-labelledby={this.buttonId}
          >
            <li>
              <a
                role="menuitem"
                className="lenke"
                href="#"
                ref={(node) => node && node.focus()}
              >
                Et valg
              </a>
            </li>
            <li>
              <a role="menuitem" className="lenke" href="#">
                Et annet valg
              </a>
            </li>
            <li>
              <a role="menuitem" className="lenke" href="#">
                Et tredje valg
              </a>
            </li>
            <li>
              <a role="menuitem" className="lenke" href="#">
                Et fjerde valg
              </a>
            </li>
          </ul>
        </Popover>
      </div>
    );
  }
}

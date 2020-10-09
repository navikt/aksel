import React from "react";

import { Undertittel } from "nav-frontend-typografi";

import "./styles.less";

class TableOfContents extends React.Component {
  constructor(props) {
    super(props);
    this.tree = [];
    this.buildTree();
  }

  buildTree = () => {
    let prevHeadline;

    this.props.headlines.forEach((headline) => {
      const nextHeadline = headline;
      if (prevHeadline) {
        if (nextHeadline.type > prevHeadline.type) {
          nextHeadline.parent = prevHeadline;
        } else if (nextHeadline.type === prevHeadline.type) {
          nextHeadline.parent = prevHeadline.parent;
        } else {
          while (
            prevHeadline.parent &&
            prevHeadline.parent.type &&
            prevHeadline.parent.type >= nextHeadline.type
          ) {
            prevHeadline = prevHeadline.parent;
          }
          nextHeadline.parent = prevHeadline.parent;
        }
      }

      prevHeadline = nextHeadline;

      this.tree.push(nextHeadline);
    });
  };

  findHeadlineChildren = (headline) =>
    this.props.headlines.filter((hl) => hl.parent === headline);

  renderTOCList = (headlines) => (
    <ol>{headlines.map((headline) => this.renderTOCItem(headline))}</ol>
  );

  renderTOCItem = (headline) => {
    const children = this.findHeadlineChildren(headline);

    return (
      <li key={headline.id}>
        <a href={`#${headline.id}`}>{headline.title}</a>
        {children && this.renderTOCList(children)}
      </li>
    );
  };

  render() {
    const rootItems = this.findHeadlineChildren(undefined);
    if (!this.tree.length || this.tree.length < 2) return null;
    console.log(this.props);
    return (
      <nav className="table-of-contents" aria-label="Innholdsfortegnelse">
        <Undertittel>Innhold:</Undertittel>
        {this.renderTOCList(rootItems)}
      </nav>
    );
  }
}

export default TableOfContents;

import * as React from "react";
import * as cn from "classnames";
import { guid, omit, keyCodes } from "nav-frontend-js-utils";

import Tab, { TabProps } from "./tab";

const tabsCls = (props) =>
  cn("nav-frontend-tabs", props.className, {
    "nav-frontend-tabs--kompakt": props.kompakt,
  });

export interface TabsPureProps {
  /**
   * Array av tabs, se `tab.tsx`
   */
  tabs?: TabProps[];
  /**
   * Rendre mindre, sekundær versjon
   */
  kompakt?: boolean;
  /**
   * Bestemmer om piltaster skal auto-switche aktiv tab eller om de bare flytter fokus
   */
  arrowKeysAutoSwitchTabs?: boolean;
  /**
   * Valgfri callback som kjøres når state endrer seg etter click
   */
  onChange?: (event: React.SyntheticEvent<EventTarget>, index: number) => void;
}

class TabsPure extends React.PureComponent<TabsPureProps> {
  static Tab = Tab;

  aktivIndex: number;
  focusIndex: number;
  linkRefs: any[];

  constructor(props) {
    super(props);
    this.aktivIndex = 0;
    this.focusIndex = 0;
    this.linkRefs = [];
  }

  static defaultProps: Partial<TabsPureProps> = {
    kompakt: false,
    arrowKeysAutoSwitchTabs: true,
  };

  getNumTabs() {
    if (this.props.children) return React.Children.count(this.props.children);
    return this.props.tabs ? this.props.tabs.length : 0;
  }

  handleKeyDown = (e) => {
    let newIndex;
    const modifier = !this.props.arrowKeysAutoSwitchTabs
      ? this.focusIndex
      : this.aktivIndex;
    const keyCode = e.keyCode || e.which;
    switch (keyCode) {
      case keyCodes.right:
        newIndex = modifier < this.getNumTabs() - 1 ? modifier + 1 : 0;
        break;
      case keyCodes.left:
        newIndex = modifier > 0 ? modifier - 1 : this.getNumTabs() - 1;
        break;
      default:
        break;
    }

    if (newIndex === undefined) return;

    if (!this.props.arrowKeysAutoSwitchTabs) {
      this.linkRefs[newIndex].focus();
    } else if (typeof this.props.onChange === "function")
      this.props.onChange(e, newIndex);
  };

  handleClick = (e, index, customClickHandler) => {
    e.preventDefault();
    if (typeof this.props.onChange === "function")
      this.props.onChange(e, index);
    if (typeof customClickHandler === "function") customClickHandler(e, index);
  };

  renderTabs() {
    if (this.props.children) {
      return React.Children.map(this.props.children, (child, i) => {
        if (React.isValidElement(child)) {
          const { aktiv } = child.props;

          if (aktiv) this.aktivIndex = i;

          return React.cloneElement(child as React.ReactElement<any>, {
            onClick: (e) => this.handleClick(e, i, child.props.onClick),
            onKeyDown: (e) => this.handleKeyDown(e),
            linkRef: (button) => (this.linkRefs[i] = button),
            onFocus: () => (this.focusIndex = i),
          });
        }
        return null;
      });
    }

    if (this.props.tabs) {
      return this.props.tabs.map((tab, i) => {
        if (tab.aktiv) this.aktivIndex = i;
        return (
          <Tab
            key={guid()}
            onClick={(e) => this.handleClick(e, i, tab.onClick)}
            onKeyDown={(e) => this.handleKeyDown(e)}
            linkRef={(button) => (this.linkRefs[i] = button)}
            onFocus={() => (this.focusIndex = i)}
            {...tab}
          />
        );
      });
    }
    return null;
  }

  render() {
    const domProps = omit(
      this.props,
      "children",
      "className",
      "tabs",
      "kompakt",
      "arrowKeysAutoSwitchTabs"
    );

    return (
      <div className={tabsCls(this.props)} {...domProps}>
        <ul className="nav-frontend-tabs__tab-list" role="tablist">
          {this.renderTabs()}
        </ul>
      </div>
    );
  }
}

export default TabsPure;

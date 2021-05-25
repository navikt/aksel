import * as React from "react";
import { guid, omit } from "nav-frontend-js-utils";

import Tab from "./tab";
import TabsPure, { TabsPureProps } from "./tabs-pure";

import "nav-frontend-tabs-style";

export interface TabsProps extends TabsPureProps {
  /**
   * Påkrevd callback for når state endrer seg etter klikk
   */
  onChange: (event: React.SyntheticEvent<EventTarget>, index: number) => void;
  /**
   * Default aktiv tab index
   */
  defaultAktiv?: number;
}

export interface TabsState {
  aktivTab: number;
}

class Tabs extends React.Component<TabsProps, TabsState> {
  static Tab = Tab;

  private pure!: TabsPure;

  static defaultProps: Partial<TabsProps> = {
    kompakt: false,
    defaultAktiv: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      aktivTab: props.defaultAktiv,
    };
  }

  setActiveTab(e, index) {
    this.setState({ aktivTab: index }, () => {
      this.pure.linkRefs[index].focus();
    });
    this.props.onChange(e, index);
  }

  renderTabs() {
    if (this.props.children) {
      return React.Children.map(this.props.children, (child, i) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            aktiv: i === this.state.aktivTab,
          });
        }
        return child;
      });
    }

    if (this.props.tabs) {
      return this.props.tabs.map((tab, i) => (
        <Tab key={guid()} aktiv={i === this.state.aktivTab} {...tab} />
      ));
    }
    return null;
  }

  render() {
    const domProps = omit(
      this.props,
      "tabs",
      "onChange",
      "defaultAktiv",
      "ref"
    );

    return (
      <TabsPure
        ref={(pure: TabsPure) => (this.pure = pure)}
        onChange={(e, index) => this.setActiveTab(e, index)}
        {...domProps}
      >
        {this.renderTabs()}
      </TabsPure>
    );
  }
}

export default Tabs;
export { default as TabsPure } from "./tabs-pure";

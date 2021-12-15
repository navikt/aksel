import * as React from "react";
import "nav-frontend-ekspanderbartpanel-style";
import EkspanderbartpanelBase, {
  EkspanderbartpanelBaseProps,
} from "./ekspanderbartpanel-base";

export interface EkspanderbartpanelState {
  apen: boolean;
}

class Ekspanderbartpanel extends React.Component<
  EkspanderbartpanelBaseProps,
  EkspanderbartpanelState
> {
  constructor(props) {
    super(props);

    this.state = {
      apen: this.props.apen!,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.apen !== undefined && this.props.apen !== prevProps.apen) {
      this.setState({ apen: this.props.apen });
    }
  }

  handleClick(event: React.SyntheticEvent<HTMLButtonElement>): void {
    event.preventDefault();
    this.setState({ apen: !this.state.apen });
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  render() {
    return (
      <EkspanderbartpanelBase
        {...this.props}
        apen={this.state.apen}
        onClick={this.handleClick}
      />
    );
  }
}

export default Ekspanderbartpanel;
export { default as EkspanderbartpanelBase } from "./ekspanderbartpanel-base";

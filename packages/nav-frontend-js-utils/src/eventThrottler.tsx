import * as PT from "prop-types";
import * as React from "react";
import throttle from "lodash.throttle";

export interface EventThrottlerProps {
  children: React.ReactNode | React.ReactChild | React.ReactChildren;
  callback: () => void;
  delay?: number;
  event: "resize";
}

export class EventThrottler extends React.Component<EventThrottlerProps> {
  private throttled!: () => void;

  componentDidMount() {
    this.throttled = throttle(this.props.callback, this.props.delay, {
      leading: false,
    });
    window.addEventListener(this.props.event, this.throttled);
  }

  componentWillUnmount() {
    if (this.throttled) {
      window.removeEventListener(this.props.event, this.throttled);
    }
  }

  render() {
    return this.props.children;
  }
}

(EventThrottler as React.ComponentClass).propTypes = {
  children: PT.oneOfType([PT.arrayOf(PT.node), PT.node]).isRequired,
  callback: PT.func.isRequired,
  delay: PT.number,
  event: PT.oneOf(["resize"]).isRequired,
};

(EventThrottler as React.ComponentClass).defaultProps = {
  callback: () => {},
  delay: 0,
};

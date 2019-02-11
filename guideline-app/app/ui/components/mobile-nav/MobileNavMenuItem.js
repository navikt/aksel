import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

class MobileNavMenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open
        };
    }

    toggle = (e, flag) => {
        // if (flag && this.state.open) return;
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        return (
            <li className={classnames({ open: this.props.open })}>
                <NavLink
                    exact
                    to={this.props.route.path}
                >
                    {this.props.route.title}
                </NavLink>
                {
                    this.props.route.routes && [
                        this.props.children
                    ]
                }
            </li>
        );
    }
}

export default MobileNavMenuItem;

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';
// eslint-disable-next-line import/no-unresolved, import/extensions
import { Normaltekst } from './../../../../../packages/node_modules/nav-frontend-typografi';
import Lukknapp from './../../../../../packages/node_modules/nav-frontend-lukknapp';
import ExpandableList from './../expandable-list/ExpandableList';
import routeConfig from './../../../utils/routing/routes.config';
import NAVLogo from '../nav-logo/nav-logo';

import './styles.less';

const cls = (props, state) => cn({
    leftNavigation: true,
    'leftNavigation--show': props.show,
    'leftNavigation--hide': state.hide
});

class LeftNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hide: false };
        window.addEventListener('click', (e) => this.handleClick(e));
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.show && !this.timer) {
            this.timer = window.setTimeout(() => this.setState({ hide: true }), 200);
        } else if (this.state.hide) {
            this.timer = undefined;
            this.setState({ hide: false });
        }
    }

    handleClick = (e) => {
        if (this.props.show) {
            const limit = document.getElementById('app');
            const btn = document.getElementById('mobileMenuToggleButton');
            let node = e.target;
            while (node !== this.container && node !== limit && node !== btn) {
                node = node.parentNode;
            }
            if (node !== this.container && node !== btn) {
                this.props.toggle();
            }
        }
    }

    render() {
        return (
            <div
                className={cls(this.props, this.state)}
                ref={(node) => { this.container = node; }}
                id={this.props.id}
                aria-label={'Hovedmeny'}
            >
                <Lukknapp onClick={this.props.toggle} aria-controls={this.props.id} />
                <a className="leftNavigation__logoSection" href="https://navikt.github.io/nav-frontend-moduler/#/">
                    <NAVLogo />
                    <Normaltekst>NAV Designsystem</Normaltekst>
                </a>
                <div className="leftNavigation__expandableListWrapper">
                    <ExpandableList items={routeConfig} />
                </div>
            </div>
        );
    }
}

LeftNavigation.propTypes = {
    show: PT.bool,
    toggle: PT.func.isRequired,
    id: PT.string.isRequired
};

LeftNavigation.defaultProps = {
    show: false
};

export default LeftNavigation;

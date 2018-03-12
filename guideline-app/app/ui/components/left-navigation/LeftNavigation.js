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

const cls = (props) => cn({
    leftNavigation: true,
    'leftNavigation--show': props.show,
    'leftNavigation--hide': !props.show
});

class LeftNavigation extends React.Component {
    constructor(props) {
        super(props);
        window.addEventListener('click', (e) => this.handleClick(e));
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
            <div className={cls(this.props)} ref={(node) => { this.container = node; }}>
                <Lukknapp onClick={this.props.toggle} />
                <a className="leftNavigation__logoSection" href="https://navikt.github.io/nav-frontend-moduler/#/">
                    <NAVLogo />
                    <Normaltekst>NAV Designsystem</Normaltekst>
                    <hr className="line" />
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
    toggle: PT.func.isRequired
};

LeftNavigation.defaultProps = {
    show: false
};

export default LeftNavigation;

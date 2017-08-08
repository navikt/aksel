import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { EtikettLiten } from './../../../../../packages/node_modules/nav-frontend-typografi';

import './styles.less';

export class Tabbar extends Component {

    componentWillMount() {
        this.state = {
            activeItem: this.getDefaultActiveItem()
        };
    }

    getDefaultActiveItem() {
        return this.props.items.find((element) => (element.defaultActive));
    }

    itemIsActive(item) {
        return this.state.activeItem === item;
    }

    changeActiveItem(item) {
        this.setState({ activeItem: item });
    }

    onActiveItemChange(item) {
        this.changeActiveItem(item);
        this.props.onActiveItemChange(item);
    }

    renderTabbarItems() {
        return this.props.items.map((item, index) => (
            <TabbarItem
                key={ index }
                active={ this.itemIsActive(item) }
                tabbarItemClicked={ () => this.onActiveItemChange(item) }
                { ... item }
            />
        ));
    }

    render() {
        return (
            <div className="tabbar">
                { this.renderTabbarItems() }
            </div>
        )
    }

}

Tabbar.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onActiveItemChange: PropTypes.func.isRequired
};

const TabbarItem = (props) => {
    const classList = () => {
        let clazz = 'tabbar__item';
        return props.active ? clazz + ' tabbar__item--active' : clazz;
    };

    return (
        <div className={ classList() } onClick={ () => { props.tabbarItemClicked()} }>
            <EtikettLiten>{ props.label }</EtikettLiten>
        </div>
    )
};

TabbarItem.propTypes = {
    label: PropTypes.string.isRequired
};
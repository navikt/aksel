import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { EtikettLiten } from './../../../../../packages/node_modules/nav-frontend-typografi';

import './styles.less';

class Tabbar extends Component {

    componentWillMount() {
        this.state = {
            activeItem: this.getDefaultActiveItem()
        };
    }

    onActiveItemChange(item) {
        this.changeActiveItem(item);
        this.props.onActiveItemChange(item);
    }

    getDefaultActiveItem() {
        return this.props.items.find((element) => (element.defaultActive));
    }

    changeActiveItem(item) {
        this.setState({ activeItem: item });
    }

    itemIsActive(item) {
        return this.state.activeItem === item;
    }

    renderTabbarItems() {
        return this.props.items.map((item, index) => (
            <TabbarItem
                key={index} // eslint-disable-line react/no-array-index-key
                active={this.itemIsActive(item)}
                tabbarItemClicked={() => this.onActiveItemChange(item)}
                {... item}
            />
        ));
    }

    render() {
        return (
            <div className="tabbar">
                { this.renderTabbarItems() }
            </div>
        );
    }

}

Tabbar.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onActiveItemChange: PropTypes.func.isRequired
};

export default Tabbar;

const TabbarItem = (props) => {
    const classList = () => {
        const clazz = 'tabbar__item';
        return props.active ? `${clazz} tabbar__item--active` : clazz;
    };

    return (
        <div
            className={classList()}
            onClick={() => { props.tabbarItemClicked(); }}
            role="button"
            tabIndex={0}
        >
            <EtikettLiten>{ props.label }</EtikettLiten>
        </div>
    );
};

TabbarItem.propTypes = {
    label: PropTypes.string.isRequired,
    tabbarItemClicked: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
};
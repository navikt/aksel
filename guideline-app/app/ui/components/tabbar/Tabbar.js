import React, { Component } from 'react';

import { EtikettLiten } from './../../../../../packages/node_modules/nav-frontend-typografi';

import './styles.less';

// todo: Probably needs a rewrite
export class Tabbar extends Component {

    componentWillMount() {
        this.state = {
            activeIndex: this.props.activeIndex || -1
        };
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.activeIndex = nextState.activeIndex > -1 ? nextState.activeIndex : nextProps.activeIndex || -1;
    }

    changeActiveTabbarItemIndex(itemIndex) {
        this.setState({
            activeIndex: itemIndex
        });
    }

    tabbarItemIsActive(item, index) {
        if (this.state.activeIndex > -1) {
            return index === this.state.activeIndex;
        }
        return item.defaultActive;
    }

    renderTabbarItems() {
        return this.props.items.map((item, index) => (
            <TabbarItem
                index={ index }
                key={ index }
                active={ this.tabbarItemIsActive(item, index) }
                tabbarItemClicked={
                    () => {
                        this.changeActiveTabbarItemIndex(item, index);
                        this.props.activeItemChange(item);
                    }
                }
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

const TabbarItem = (props) => {
    const classList = () => {
        let clazzes = 'tabbar__item';

        if (props.active) {
            return clazzes + ' tabbar__item--active';
        }

        return clazzes;
    };

    return (
        <div className={ classList() } onClick={ () => { props.tabbarItemClicked()} }>
            <EtikettLiten>{ props.label }</EtikettLiten>
        </div>
    )
};
/**
 * Usage:
 *
 * menuItems = [
 *  { title: 'Foo', linkTo: '/foo', routes: [ { // same } ] }
 *  ... and so on.
 * ]
 *
 * <ExpandableList items={ menuItems } />
 * */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.less';

export default class ExpandableList extends Component {
    componentWillMount() {
        this.state = { activeChildIndex: -1 };
    }

    expandableListItemClicked(item) {
        this.setState({
            activeChildIndex: this.props.items.indexOf(item)
        });
    }

    renderList() {
        const items = this.props.items.map((item, index) => {
            item.active = (this.state.activeChildIndex === index); // eslint-disable-line no-param-reassign
            return (
                <ExpandableListItem
                    item={item}
                    key={index} // eslint-disable-line react/no-array-index-key
                    onItemClicked={(itemClicked) => this.expandableListItemClicked(itemClicked)}
                />
            );
        });

        return (<ul className="expandableList">{ items }</ul>);
    }

    render() {
        return (<div className="expandableListWrapper">{ this.renderList() }</div>);
    }
}

class ExpandableListItem extends Component { // eslint-disable-line react/no-multi-comp

    componentWillMount() {
        this.item = this.props.item;
    }

    getClassList() {
        if (this.item.active === true) {
            return 'expandableList__item--active';
        }
        return 'expandableList__item';
    }

    hasChildren() {
        const children = this.item.routes;
        return children && Array.isArray(children) && children.length > 0;
    }

    renderChildren() {
        if (this.hasChildren(this.item) && this.item.active === true) {
            return (
                <ExpandableList
                    items={this.item.routes}
                />
            );
        }
        return undefined;
    }

    render() {
        const item = this.item;

        return (
            <li className={this.getClassList()} key={item.title}>
                <Link
                    className="link"
                    to={item.path || '#'}
                    onClick={() => { this.props.onItemClicked(item); }}
                >
                    { item.title }
                </Link>

                { this.renderChildren() }
            </li>
        );
    }

}

ExpandableList.propTypes = {
    items: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
};


ExpandableListItem.propTypes = {
    item: PropTypes.shape({}).isRequired,
    onItemClicked: PropTypes.func.isRequired
};

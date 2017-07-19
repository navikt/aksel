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

import './styles.less'

export class ExpandableList extends Component {
    componentWillMount() {
      this.state = { activeChildIndex: -1 };
    }

    expandableListItemClicked (item,b) {
      this.setState({
          activeChildIndex: this.props.items.indexOf(item)
      })
    }

    renderList () {
        const items = this.props.items.map((item, index) => {
            item.active = (this.state.activeChildIndex === index);
            return (
                <ExpandableListItem
                    item={ item }
                    key={ index }
                    onItemClicked={ (item) => this.expandableListItemClicked(item) }
                />
            );
        });

        return (<ul className="expandableList">{ items }</ul>);
    };

    render () {
      return (<div className="expandableListWrapper">{ this.renderList() }</div>);
    }
}

class ExpandableListItem extends Component {

    componentWillMount() {
        this.item = this.props.item;
    }

    getClassList () {
        if (this.item.active === true) {
            return 'expandableList__item--active';
        }
        return 'expandableList__item';
    }

    hasChildren () {
        const children = this.item.routes;
        return children && Array.isArray(children) && children.length > 0;
    };

    renderChildren() {
        if (this.hasChildren(this.item) && this.item.active === true) {
            return (
                <ExpandableList
                    items={ this.item.routes }
                />
            )
        }
    }

    render () {
        const item = this.item;

        return (
            <li className={ this.getClassList() } key={ item.title }>
              <Link
                  className="link"
                  to={ item.path || '#' }
                  onClick={ () => { this.props.onItemClicked(item) } }>
                  { item.title }
              </Link>

                { this.renderChildren() }
            </li>
        );
    }

}

ExpandableList.propTypes = {
    items: PropTypes.array.isRequired
};

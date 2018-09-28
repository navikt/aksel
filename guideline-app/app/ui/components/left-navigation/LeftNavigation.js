import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import ExpandableList from './../expandable-list/ExpandableList';
import routeConfig from './../../../utils/routing/routes.config';

// eslint-disable-next-line import/no-unresolved, import/extensions
import { Normaltekst } from './../../../../../packages/node_modules/nav-frontend-typografi';

import './styles.less';

class LeftNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemIndex: -1
        }
    }

    componentWillMount() {
        const hash = window.location.hash;
        const hashParts = hash.split('/');

        this.route = routeConfig.find((route, index) => route.path.indexOf(hashParts[1]) > -1);

        console.log(this.route);
    }

    render() {
        return (
            <aside className="leftNavigation">
                <h2>{this.route.title}</h2>
                <ul>
                    { 
                        this.route.routes.map((item, index) => 
                            (
                                <li key={index}>
                                    <Link
                                        className={cn({'active': index === this.state.activeItemIndex})} 
                                        to={item.path || '#'}
                                        onClick={() => this.setState({activeItemIndex: index})}
                                    >
                                        { item.title }
                                    </Link>
                                </li>
                            )
                        )
                    }
                </ul>
            </aside>
        );
    }
}

export default LeftNavigation;

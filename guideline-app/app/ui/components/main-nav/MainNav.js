import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import routeConfig from './../../../utils/routing/routes.config';

import './styles.less';

class MainNav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeItemIndex: 0
        };
    }

    componentWillMount() {
        const hash = window.location.hash;
        const hashParts = hash.split('/');
        const activeIndex = routeConfig.findIndex((route, index) => route.path.indexOf(hashParts[1]) > -1);
        
        this.setState({
            activeItemIndex: activeIndex
        });
    }

    render() {
        return (
            <nav className="mainNav">
                <div className="mainNav__wrapper">
                    <ul>
                        {
                            routeConfig.map((item, index) => 
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
                    <ul>
                        <li><a href="#">Github</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default MainNav;
import React from 'react';
import classnames from 'classnames';

import './styles.less';

class MobileNavToggle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shadow: false
        };

        window.addEventListener('scroll', () => this.checkScroll());
    }

    checkScroll = () => {
        if (window.scrollY > 60) {
            this.setState({
                shadow: true
            });
        } else {
            this.setState({
                shadow: false
            });
        }
    }

    render() {
        return (
            <button
                className={classnames('mobile-nav-toggle', { 'mobile-nav-toggle--with-shadow': this.state.shadow })}
                {...this.props}
            >
                <span className="mobile-nav-toggle__hamburger-icon">
                    Åpne meny
                </span>
            </button>
        );
    }
}

export default MobileNavToggle;

import React from 'react';
import classnames from 'classnames';

import './styles.less';

const overflowCls = (state) => classnames('overflow-detector', {
    'overflow-detector--shadow-left': state.overflowLeft,
    'overflow-detector--shadow-right': state.overflowRight
});

class OverflowDetector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            overflowLeft: false,
            overflowRight: false
        };

        window.addEventListener('resize', this.checkOverflow);
    }

    componentDidMount() {
        this.checkOverflow();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkOverflow);
    }

    checkOverflow = () => {
        let overflowLeft = false;
        let overflowRight = false;

        if (this.scroller.offsetWidth < this.inner.offsetWidth) {
            if (this.scroller.scrollLeft !== 0) {
                overflowLeft = true;
            }
            if ((this.scroller.scrollLeft + this.scroller.offsetWidth) < this.inner.offsetWidth) {
                overflowRight = true;
            }
        }

        this.setState({
            overflowLeft,
            overflowRight
        }, () => console.log('check scroll', this.state));
    }

    render() {
        return (
            <div className={overflowCls(this.state)}>
                <div
                    className="overflow-detector__scroller"
                    onScroll={this.checkOverflow}
                    ref={(scroller) => this.scroller = scroller}
                >
                    <div
                        className="overflow-detector__inner"
                        ref={(inner) => this.inner = inner}
                    >
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default OverflowDetector;

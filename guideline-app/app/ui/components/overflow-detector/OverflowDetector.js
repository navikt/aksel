import React from 'react';

class OverflowDetector extends React.Component {
    constructor(props){
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

        if (this.wrapper.offsetWidth < this.table.offsetWidth) {
            if (this.wrapper.scrollLeft !== 0) {
                overflowLeft = true;
            }
            if ((this.wrapper.scrollLeft + this.wrapper.offsetWidth) < this.table.offsetWidth) {
                overflowRight = true;
            }
        }

        this.setState({
            overflowLeft,
            overflowRight
        });
    }

    render(){
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default OverflowDetector;
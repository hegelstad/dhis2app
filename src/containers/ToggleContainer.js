import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleMode } from '../actions/actions';
import ToggleComponent from '../components/ToggleComponent';

class ToggleContainer extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <ToggleComponent
                isToggled={this.props.isToggled}
                onToggleButton={this.props.toggleMode}
            />
        );
    }
}

// Example to show the power of ES6.
// const mapStateToProps = (state) => {
//     return { applicationMode: state.applicationMode };
// }
const mapStateToProps = ({isToggled}) => {
    return {
        isToggled
    }
}

export default connect(
    mapStateToProps,
    { toggleMode }
)(ToggleContainer);

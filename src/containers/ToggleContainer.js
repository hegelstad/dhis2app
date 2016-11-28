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

const mapStateToProps = ({isToggled}) => {
    return {
        isToggled
    }
}

export default connect(
    mapStateToProps,
    { toggleMode } // Shorthand notation.
)(ToggleContainer);

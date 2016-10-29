import React, { Component, PropTypes } from 'react';

export default class WelcomeComponent extends Component {
    constructor(...args) {
        super(...args);

        this.onClearClick = this.onClearClick.bind(this);
    }

    // Sets the state of isShowingWelcomeScreen to false in App.js
    onClearClick(event) {
        event.preventDefault();
        this.props.onClear();
    }

    render() {
        return (
            <div className="welcome">
                <p>Select a region, chiefdom or clinic on the left hand menu to start.</p>
                <p>You will then be given possible duplicates within your selection.</p>

                <button id="clear" onClick={this.onClearClick}>Continue</button>
            </div>
        );
    }
}

WelcomeComponent.propTypes = {
    onClear: PropTypes.func.isRequired
};

import React, { Component, PropTypes } from 'react';

export default class WelcomeComponent extends Component {
    constructor(...args) {
        super(...args);


        this.onClearClick = this.onClearClick.bind(this);
    }

    onSubmitClick(event) {
        event.preventDefault();
        this.props.onClear();
    }

    render() {
        return (
            <div className="welcome">
                <div>
                    <button id="clear" onClick={this.onClearClick}>Continue</button>
                </div>
            </div>
        );
    }
}

WelcomeComponent.propTypes = {
    onClear: PropTypes.func.isRequired,
};

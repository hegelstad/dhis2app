import React, { Component, PropTypes } from 'react';

class SingletonComponent extends Component {
    constructor(...args) {
        super(...args);
    }

    render() {
        if (this.props.cursor == null) { // Show a placeholder if the cursor of treebeard is not set
            return <div className="welcome">placeholder</div>;
        } else {
            return (
                <div>
                    <div className="welcome">
                        <p>name: {this.props.cursor.name}</p>
                        <p>id: {this.props.cursor.id}</p>
                   </div>
                </div>
            );
        }
    }

}

export default SingletonComponent;

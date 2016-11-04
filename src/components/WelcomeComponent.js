import React, { Component, PropTypes } from 'react';
import ReactTable from 'react-table'

const data = [{
    name: 'Tanner Linsley',
    age: 26,
    friend: {
        name: 'Jason Maurer',
        age: 23
    }
},{
    name: 'Banner Dansley',
    age: 19,
    friend: {
        name: 'Jason Mraz',
        age: 30
    }
}]

const columns = [{
  header: 'Name',
  accessor: 'name' // String-based value accessors !
}, {
  header: 'Age',
  accessor: 'age',
  // render: props => <span className='number'>props.value</span> // Custom cell components!
}, {
  header: 'Friend Name',
  accessor: 'age' // Custom value accessors!
}, {
  header: 'Friend Age',
  //header: props => <span>Friend Age</span>, // Custom header components!
  accessor: 'friend.age'
}]

class WelcomeComponent extends Component {
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
                <ReactTable
                    data={data}
                    columns={columns}
                    minRows={0}
                />
                <button id="clear" onClick={this.onClearClick}>Continue</button>
            </div>
        );
    }
}

WelcomeComponent.propTypes = {
    onClear: PropTypes.func.isRequired
};

export default WelcomeComponent;

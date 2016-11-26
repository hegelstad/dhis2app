import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { mockdata } from './TEIContainer.mockdata';
import { fakeAsyncCall } from '../utils/TEI';
import AccordionInstance from '../components/Accordion';

class TEIComponent extends Component {
    constructor(...args) {
        super(...args);
    }

    render() {
        if (!mockdata) {
            return <div className="loading">Loading data...</div>;
        }

        return (
            <div>
                <h4>Duplicates found:</h4>

                <AccordionInstance input={mockdata}/>

                <div>name: {this.props.cursor.name}</div>
                <div>id: {this.props.cursor.id}</div>
                <br />
            </div>
        );
    }
}

// Shorthand notation
export default connect(
    state => ({
        cursor: state.tree.cursor,
        //data
    })
)(TEIComponent);

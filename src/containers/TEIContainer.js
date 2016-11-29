import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Actions
import { loadAndSetTEIS } from '../actions/actions';
// Components
import ReactTable from 'react-table';
import AccordionList from '../components/Accordion';
import { mockdata } from './TEIContainer.mockdata';

class TEIContainer extends Component {
    constructor(...args) {
        super(...args);
    }

    render() {
        const columns = [
            {
                header: 'Name',
                accessor: 'value'
            },
            {
                header: 'Tracked Entity Instance',
                accessor: 'trackedEntityInstance'
            },
            {
                header: 'Weight',
                accessor: 'weight'
            },
            {
                header: 'Height',
                accessor: 'height'
            },
            {
                header: 'Duplicate?',
                render: props =>
                        <span>
                            <input
                                type="checkbox"
                                //checked={this.state.data[props.index].checked}
                                onChange={() => { // Binds function to this
                                    }
                                }
                            />
                        </span>
            }
        ]

        if (!mockdata || !this.props.cursor) {
            return <div className="loading">Please select a chiefdom or clinic in the list to the left to begin.</div>;
        }

        return (
            <div>
                <p>Duplicates found:</p>
                <AccordionList input={mockdata}
                                columns={columns}/>
                <div>name: {this.props.cursor.name}</div>
                <div>id: {this.props.cursor.id}</div>
                <br/>
            </div>
        );
    }
}

// Shorthand notation.
export default connect(
    state => ({
        cursor: state.tree.cursor,
        //data
    }),
    { loadAndSetTEIS }
)(TEIContainer);

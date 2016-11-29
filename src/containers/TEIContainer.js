import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Actions
import { loadAndSetTEIS } from '../actions/actions';
// Components
import ReactTable from 'react-table';
import AccordionList from '../components/Accordion';
import { mockdata } from './TEIContainer.mockdata';
import { teiDuplicateFinder } from '../utils/TEI';

class TEIContainer extends Component {
    constructor(...args) {
        super(...args);

    }



    render() {
        console.log(this.props.TeiData);
        const columns = [
            {
                header: 'First name',
                accessor: 'Firstname'
            },
            {
                header: "Last name",
                accessor: 'Lastname'
            },
            {
                header: 'Tracked Entity Instance',
                accessor: 'trackedEntityInstance'
            },
            {
                header: 'Weight',
                accessor: 'Weightinkg'
            },
            {
                header: 'Height',
                accessor: 'Heightincm'
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

        if (this.props.TeiData.length == 0 || !this.props.cursor) {
            return <div className="loading">Please select a chiefdom or clinic in the list to the left to begin.</div>;
        } else{
            var test = teiDuplicateFinder(this.props.TeiData);
        return (
            <div>
                <p>Duplicates found:</p>
                <AccordionList input={test}
                                columns={columns}/>
                <div>name: {this.props.cursor.name}</div>
                <div>id: {this.props.cursor.id}</div>
                <br/>
            </div>
        );
        }

    }
}

// Shorthand notation.
export default connect(
       
    state => ({
        cursor: state.tree.cursor,
        TeiData: state.tei
    }),
    { loadAndSetTEIS }
)(TEIContainer);

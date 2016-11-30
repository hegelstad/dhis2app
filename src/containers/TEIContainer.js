import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Actions
import { performSearch } from '../actions/actions';
// Components
import ReactTable from 'react-table';
import AccordionList from '../components/AccordionList';
import ThresholdDropdown from '../components/ThresholdDropdown';
import { Button } from 'react-bootstrap';
import { columns } from '../components/Columns';
import { mockdata } from './TEIContainer.mockdata';


class TEIContainer extends Component {
    constructor(...args) {
        super(...args);
    }

    render() {
        if (!this.props.cursor || // Show a message if no selected node.
            this.props.cursor.level === 1 || // if level 1 is selected.
            this.props.cursor.level === 2) { // if level 2 is selected.
            return <div className="loading">Please select a chiefdom or clinic in the list to the left to begin.</div>;
        } else {
            return (
                <div>
                    <div><ThresholdDropdown onSelect={() => this.props} /> <br/></div>
                    <div className="flex-row-container">
                        <Button bsStyle="warning" disabled={this.props.searching} onClick={() => this.props.performSearch("Basic", this.props.cursor.id)} className="margin-right">Basic Search</Button>
                        <Button bsStyle="danger" disabled={this.props.searching} onClick={() => this.props.performSearch("Deep", this.props.cursor.id)}>Deep Search</Button>
                        <div className="current-region-selected">Current region: {this.props.cursor.name}</div>
                    </div>
                    { this.props.searching ? <div>Searching...</div> : <br/>}
                    { this.props.duplicates // Show accordionList with duplicates when there are duplicates.
                        ? <div><AccordionList
                              input={this.props.duplicates}
                              columns={columns}
                          />
                          <div><Button bsStyle="info" >Export</Button></div></div>
                        : <div>
                              <br />
                              <p>Basic search: matches first and last names with a moderate threshold.</p>
                              <p>Deep search: will search within the matches of a basic search for matches of more advanced attributes: National Identifier, TB number and Maiden name.</p>
                              <p>Deep search is highly likely to find true duplicates.</p>
                          </div>
                    }
                   
                </div>
            );
        }
    }
}

// Shorthand notation.
export default connect(
    state => ({
        cursor: state.tree.cursor,
        searching: state.tei.searching,
        duplicates: state.tei.duplicates
    }),
    { performSearch }
)(TEIContainer);

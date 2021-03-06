import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Actions
import { performSearch,
         exportDuplicates } from '../actions/actions';
// Components
import ReactTable from 'react-table';
import AccordionList from '../components/AccordionList';
import Slider from 'react-input-range';
import { Button } from 'react-bootstrap';
import { columns } from '../components/Columns';
import { mockdata } from './TEIContainer.mockdata';


class TEIContainer extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            threshold: 0.4 // Seems to be a sweet spot. Good default.
        };
    }

    render() {
        if (!this.props.cursor || // Show a message if no selected node.
            this.props.cursor.level === 1 || // if level 1 is selected.
            this.props.cursor.level === 2) { // if level 2 is selected.
            return <div className="loading">Please select a chiefdom or clinic in the list to the left to begin.</div>;
        } else {
            return (
                <div>
                    <div className="flex-row-container">
                        <Button bsStyle="warning" disabled={this.props.searching} onClick={() => this.props.performSearch("Basic", this.props.cursor.id, this.state.threshold)} className="margin-right">Basic Search</Button>
                        <Button bsStyle="danger" disabled={this.props.searching} onClick={() => this.props.performSearch("Deep", this.props.cursor.id, this.state.threshold)}>Deep Search</Button>
                        <div className="current-region-selected">Threshold: </div>
                        <div className="current-region-selected slider">
                            <Slider
                                minValue={0}
                                maxValue={0.6}
                                step={0.1}
                                value={this.state.threshold}
                                onChange={(component, value) => this.setState({threshold: Math.round(value * 10)/10})}
                            />
                        </div>
                        <div className="current-region-selected">Region: {this.props.cursor.name}</div>
                    </div>
                    { this.props.searching ? <div>Searching...</div> : <br/>}
                    { this.props.duplicates // Show accordionList with duplicates when there are duplicates.
                        ? <div>
                            <AccordionList
                              input={this.props.duplicates}
                              columns={columns}/>
                            <br/>
                            <Button bsStyle="info" onClick={this.props.exportDuplicates}>Export</Button>
                          </div>
                        : <div>
                              <h3>Welcome to the TEI duplicate finder!</h3>
                              <p><b>Basic search</b>: matches tracked entity instances based on their first- and last name.</p>
                              <p><b>Deep search</b>: will search within the matches of a basic search for matches of more advanced attributes: National Identifier,
                              TB number and Maiden name. Deep search is highly likely to find true duplicates if there are any.</p>
                              <br/>
                              <p><b>Threshold</b>: Adjusts the threshold for the <b>basic</b> search. 0 is a perfect match, 1 matches with everything.</p>
                              <br />
                              <br />
                              <p>Please take some time to identify the matches you believe to be true duplicates and mark them in the table provided.
                                When you are finished, press the <b>export</b> button to export the TEIS to a json file. </p>
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
    { performSearch, exportDuplicates }
)(TEIContainer);

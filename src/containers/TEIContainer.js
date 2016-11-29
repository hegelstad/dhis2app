import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Actions
import { loadAndSetTEIS } from '../actions/actions';
// Components
import ReactTable from 'react-table';
import AccordionList from '../components/Accordion';
import { mockdata } from './TEIContainer.mockdata';
import { teiDuplicateFinder } from '../utils/TEI';
import { Button } from 'react-bootstrap';
import { Columns } from '../components/Columns';

class TEIContainer extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            showAccordion: false,
            deepSearch: false,
        };

        this.showAccordion = this.showAccordion.bind(this);
        this.deepSearch = this.deepSearch.bind(this);
    }

    showAccordion() {
        this.state.showAccordion = true;
        this.state.deepSearch = false;
    }
    
    deepSearch() {
        this.state.showAccordion = true;
        this.state.deepSearch = true;
    }

    render() {
        

        if (this.props.TeiData.length == 0 || !this.props.cursor) {
            return <div className="loading">Please select a chiefdom or clinic in the list to the left to begin.</div>;
        } else{
        return (
            <div>
                <h3> Current region: {this.props.cursor.name} </h3>
                <Button  bsStyle="warning" onClick={this.showAccordion}> Basic Search </Button>
                <Button bsStyle="danger" onClick={this.deepSearch}> Deep Search</Button>
                <br />
                {this.state.showAccordion ?
                    <div>
                        <br />
                        <AccordionList input={teiDuplicateFinder(this.props.TeiData, this.state.deepSearch)}
                                        columns={Columns}/>
                    </div> :
                    <div>
                        <br /> 
                        <p> Basic search: matches first and last names with a moderate threshold. </p>
                        <p> Deep search: will search within the matches of a basic search for matches of more advanced attributes: National Identifier, 
                            TB number and Maiden name.</p>
                        <p> Deep search is highly likely to find true duplicates</p>
                    </div>}
                
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

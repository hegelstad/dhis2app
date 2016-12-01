import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Actions
import {
    loadSingletonDataElements,
    loadSingletonEvents,
    setStartDate,
    setEndDate
} from '../actions/actions';
// Components
import DatePicker from 'react-datepicker';
import AccordionList from '../components/AccordionList';
import moment from 'moment';
import { duplicates, makeColumns } from '../utils/singletons.js';

class SingletonContainer extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            startDate: moment().subtract(5, 'years'),
            endDate: moment(),
            showAccordion: false
        }

        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.showAccordion = this.showAccordion.bind(this);
    }

    componentDidMount() {
        this.props.loadSingletonDataElements();
        this.props.setStartDate(moment().subtract(5, 'years'));
        this.props.setEndDate(moment());
    }

    showAccordion() {
        this.state.showAccordion = true;
    }

    handleStartDate(date) {
        this.setState({
            startDate: date
        });
        this.props.setStartDate(date);
    }

    handleEndDate(date) {
        this.setState({
            endDate: date
        });
        this.props.setEndDate(date);
    }

    onSelect(event) {
        this.props.setProgramCursor(this.props.program.data[event]);
    }
    // by clicking on the button extract duplicates and show them
    submitSearch() {
        this.props.loadSingletonEvents( // Load singleton-related data if valid node level.
            this.props.cursor.id, // id of selected node in the tree.
            this.props.startDate, // startdate to include in search.
            this.props.endDate); // enddate to include in search.
        this.showAccordion();
    }


    render() {
        if (!this.props.cursor) { // Show a placeholder if the cursor of treebeard is not set
            return <div className="loading">Please select a clinic in the list to the left to begin.</div>;
        } else {
            if (!(this.props.cursor.level === 4)) {
                return <div className="loading">Please select a clinic in the list to the left to begin.</div>;
            } else {
                return (
                    <div>
                        <div className="flex-row-container">
                            <div className="margin-right">
                                StartDate:
                                <DatePicker
                                    dateFormat="DD/MM/YYYY"
                                    selected={this.state.startDate}
                                    onChange={this.handleStartDate}
                                    />
                            </div>
                            <div className="margin-right">
                                EndDate:
                                <DatePicker
                                    dateFormat="DD/MM/YYYY"
                                    selected={this.state.endDate}
                                    onChange={this.handleEndDate}
                                    />
                            </div>
                            <button onClick={this.submitSearch}>Submit</button>
                        </div>
                        {this.state.showAccordion
                            ?
                            <div>
                                <br />
                                <AccordionList
                                    input={duplicates(this.props.events, this.props.dataElements)}
                                    columns={makeColumns(duplicates(this.props.events, this.props.dataElements))}
                                    />
                            </div>
                            :
                            <div>
                                <br />
                                <p> Select start and end date. </p>

                            </div>
                        }

                    </div>);
            }
        }
    }
}


// Shorthand notation.
export default connect(
    state => ({
        cursor: state.tree.cursor,
        startDate: state.singleton.startDate,
        endDate: state.singleton.endDate,
        dataElements: state.singleton.dataElements,
        events: state.singleton.events,
    }),
    {
        loadSingletonDataElements,
        loadSingletonEvents,
        setStartDate,
        setEndDate,
        duplicates
    }
)(SingletonContainer);

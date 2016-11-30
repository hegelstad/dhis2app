import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Actions
import {
    loadProgramData,
    setProgramCursor,
    loadSingletonDataElements,
    loadSingletonEvents,
    setStartDate,
    setEndDate
} from '../actions/actions';
// Components
import DatePicker from 'react-datepicker';
import ProgramDropdownList from '../components/ProgramDropdownList';
import AccordionList from '../components/Accordion';
import moment from 'moment';
import { events } from './SingletonContainer.mockdata';
import { duplicates, convertData, convertSingleton } from '../utils/singletons.js';
import { Columns } from '../components/Columns';
import { mockdata } from './SingletonContainer.mockdata';

class SingletonContainer extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            startDate: moment().subtract(5, 'years'),
            endDate: moment(),
            showAccordion: false,
        }

        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.showAccordion = this.showAccordion.bind(this);
    }

    componentDidMount() {
        this.props.loadProgramData();
        this.props.loadSingletonDataElements();
        this.props.setStartDate(moment().subtract(5, 'years'));
        this.props.setEndDate(moment());
        // this.convertData(events); move to redux
    }

    showAccordion() {
        this.setState({
            showAccordion: true,
        });
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

    submitSearch() {
        var singleton =  
            {
                orgUnit: "EJoI3HArJ2W",
                program: "eBAyeGv0exc",
                event: "FnbbxhVchAM",
                dataValues: [
                    {
                        dataElement: "vV9UWAZohSf",
                        value: "86"
                    },
                    {
                        dataElement: "K6uUAvq500H",
                        value: "A000"
                    },
                    {
                        dataElement: "fWIAEtYVEGk",
                        value: "MODABSC"
                    },
                    {
                        dataElement: "msodh3rEMJa",
                        value: "2014-11-24"
                    },
                    {
                        dataElement: "eMyVanycQSC",
                        value: "2014-11-03"
                    },
                    {
                        dataElement: "oZg33kd9taw",
                        value: "Male"
                    },
                    {
                        dataElement: "qrur9Dvnyt5",
                        value: "23"
                    },
                    {
                        dataElement: "GieVkTxp4HH",
                        value: "169"
                    }
                ]
            };

        this.props.loadSingletonEvents( // Load singleton-related data if valid node level.
            this.props.cursor.id, // id of selected node in the tree.
            this.props.program.cursor.id, // id of selected program.
            this.props.startDate, // startdate to include in search.
            this.props.endDate); // enddate to include in search.
        // console.log(this.props.events);
        // console.log("dupl:", duplicates(this.props.events, this.props.dataElements));
        console.log(singleton);
        convertSingleton(singleton, this.props.dataElements);


    }


    render() {
        let disabledButton = (this.props.program.cursor.displayName === "");

        if (!this.props.cursor) { // Show a placeholder if the cursor of treebeard is not set
            return <div className="loading">Please select a clinic in the list to the left to begin.</div>;
        } else {
            if (!(this.props.cursor.level === 4)) {
                return <div className="loading">Please select a clinic in the list to the left to begin.</div>;
            } else {
                return (
                    <div>
                        <div className="flex-row-container">
                            <div className="datepicker">
                                StartDate:
                                <DatePicker
                                    dateFormat="DD/MM/YYYY"
                                    selected={this.state.startDate}
                                    onChange={this.handleStartDate}
                                    />
                            </div>
                            <div className="datepicker">
                                EndDate:
                                <DatePicker
                                    dateFormat="DD/MM/YYYY"
                                    selected={this.state.endDate}
                                    onChange={this.handleEndDate}
                                    />
                            </div>
                            <button onClick={this.submitSearch}>Submit</button>
                        </div>
                    </div>);
            }
        }
    }
}


// Shorthand notation.
export default connect(
    state => ({
        cursor: state.tree.cursor,
        program: state.program,
        startDate: state.singleton.startDate,
        endDate: state.singleton.endDate,
        dataElements: state.singleton.dataElements,
        events: state.singleton.events,
    }),
    {
        loadProgramData,
        setProgramCursor,
        loadSingletonDataElements,
        loadSingletonEvents,
        setStartDate,
        setEndDate,
        duplicates
    }
)(SingletonContainer);

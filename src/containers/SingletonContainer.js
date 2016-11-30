import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Actions
import { loadProgramData,
         setProgramCursor,
         loadSingletonDataElements,
         loadSingletonEvents,
         setStartDate,
         setEndDate } from '../actions/actions';
// Components
import DatePicker from 'react-datepicker';
import ProgramDropdownList from '../components/ProgramDropdownList';
import AccordionList from '../components/AccordionList';
import moment from 'moment';
import { events } from './SingletonContainer.mockdata';

class SingletonContainer extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            startDate: moment(),
            endDate: moment()
        }

        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    componentDidMount() {
        this.props.loadProgramData();
        this.props.loadSingletonDataElements();
        this.props.setStartDate(moment());
        this.props.setEndDate(moment());
        // this.convertData(events); move to redux
    }

    //TODO: move this to redux
    findDataElement(dataElements, criteria) {
        for (let i = 0; i < dataElements.length; i++){
            if(dataElements[i].value == criteria)
                return dataElements[i].label;
        }
        return null;
    }

    //TODO: move this to redux
    // the "correct" code is commented, because of the null dataElements
    convertData(singletons) {
        for(let i = 0; i < singletons.length; i++){
            var dataValues = singletons[i].dataValues;
            for(let j = 0; j < dataValues.length; j++){
                // console.log(this.state.dataElements);
                // var dataElementName = this.findDataElement(this.state.dataElements, dataValues[j].dataElement);
                // value = datavalues[j].value;
                // // var obj = {
                // //     [dataElementName]: value,
                // // }
                // console.log(dataElementName, value);
            }
        }
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
        this.props.loadSingletonEvents( // Load singleton-related data if valid node level.
            this.props.cursor.id, // id of selected node in the tree.
            this.props.program.cursor.id, // id of selected program.
            this.props.startDate, // startdate to include in search.
            this.props.endDate); // enddate to include in search.
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
                        <p>Select a program in which you'd like to search for duplicates.</p>
                        <div className="flex-row-container">
                            <ProgramDropdownList
                                title={"Programs"}
                                list={this.props.program.data}
                                i={0}
                                onSelect={this.onSelect} />
                            <div className="program-selected">Program: {this.props.program.cursor.displayName}</div>
                        </div>

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
                            <button onClick={this.submitSearch} disabled={disabledButton}>Submit</button>
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
        endDate: state.singleton.endDate
    }),
    { loadProgramData,
      setProgramCursor,
      loadSingletonDataElements,
      loadSingletonEvents,
      setStartDate,
      setEndDate }
)(SingletonContainer);

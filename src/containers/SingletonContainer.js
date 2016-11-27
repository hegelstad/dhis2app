import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadProgramData, loadSingletonDataElements, loadSingletonEvents } from '../actions/actions';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ProgramDropdownList from '../components/ProgramDropdownList';
import AccordionInstance from '../components/Accordion';
import { events } from './SingletonContainer.mockdata';

class SingletonContainer extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            program: "",
            programId: "",
            startDate: moment(),
            endDate: moment(),
            events: null,
            canRun: false,
            dataElements: null,
            checkedDataElements: null,
            currentDataElement: "wap68IYzTXr",
        }
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount(){
        this.props.loadProgramData();
        this.props.loadSingletonDataElements();
        // this.convertData(events);
    }

    findDataElement(dataElements, criteria) {
        for (let i = 0; i < dataElements.length; i++){
            if(dataElements[i].value == criteria)
                return dataElements[i].label;
        }
        return null;
    }

    // the "correct" code is commented, because of the null dataElements
    convertData(singletons){
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

    formatDate(moment){
        var date = "";
        date += moment.get('year') + '-' ;
        var m = moment.get('month') + 1;
        date += m + '-' + moment.get('date');
        return date;
    }

    handleStartDate(date) {
        this.setState({
            startDate: date
        });
    }

    handleEndDate(date) {
        this.setState({
            endDate: date
        });
    }

    onSelect(event) {
        this.setState({
            program: this.props.programData[event].displayName,
            programId: this.props.programData[event].id
        });
    }

    clicked() {
        if(this.props.cursor.level == 4 && this.state.programId != null){
            this.props.loadSingletonEvents(
                this.props.cursor.id,
                this.state.programId,
                this.formatDate(this.state.startDate),
                this.formatDate(this.state.endDate));
            this.setState({
                canRun: true,
            });
            console.log(this.state.canRun);
            console.log(this.state.events);
        } else {
            this.setState({
                canRun: false
            });
        }
    }

    render() {
        if (!this.props.cursor) { // Show a placeholder if the cursor of treebeard is not set
            return <div className="welcome">Please select a clinic in the list to the left to begin.</div>;
        // else if (this.state.dataElements == null){

        // }
        } else {
            return (
                <div>
                    <div className="welcome">
                        <p>name: {this.props.cursor.name}</p>
                        <p>id: {this.props.cursor.id}</p>
                   </div>

                    <ProgramDropdownList
                        title={"Programs"}
                        list={this.props.programData}
                        i={0}
                        onSelect={this.onSelect}
                    />
                    <br />
                    <br />
                    <div className="selectedProgram">
                        <div>Program: {this.state.program}</div>
                        <div>Program: {this.state.programId}</div>

                    </div>
                    <div className="startDate">
                        StartDate:
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleStartDate.bind(this)}
                        />
                    </div>

                    <div className="endDate">
                        EndDate:
                        <DatePicker
                            selected={this.state.endDate}
                            onChange={this.handleEndDate.bind(this)}
                        />
                    </div>
                    <div>
                        Level: {this.props.cursor.level}
                    </div>

                    <div>
                        <button onClick={this.clicked.bind(this)}>Find duplicates</button>
                    </div>
                </div>

            );
        }
    }
}

// Shorthand notation.
export default connect(
    state => ({
        cursor: state.tree.cursor,
        programData: state.programData
    }),
    { loadProgramData, loadSingletonDataElements, loadSingletonEvents }
)(SingletonContainer);

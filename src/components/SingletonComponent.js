import React, { Component, PropTypes } from 'react';
import ProgramDropdownList from './ProgramDropdownList';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { loadEvents, loadDataElements } from '../api';
import { extractSingletons, duplicates } from '../utils/singletons.js';
import AccordionInstance from './Accordion';
import { events } from './SingletonComponentTestData.js'
class SingletonComponent extends Component {
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
// DOESN'T WORK - convert data gets dataElements as null - redux will probably fix this
    componentDidMount(){
        this.loadDE();
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

    loadDE(){
        loadDataElements()
            .then(de => {
                this.setState({
                    dataElements: de
                });
            })
    } 

    loadSingletons(orgUnitID, programID, startDate, endDate){
        loadEvents(orgUnitID, programID, startDate, endDate)
            .then(events => {
                this.setState({
                    events: extractSingletons(events),
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isError: true,
                    errorMessage: "Failed to fetch events"
                 });
            });
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

    getData(cursor) {
        // If fakeAsyncCall returns when this component is unmounted, an error is thrown.
        // Solutions, cancel promise when unmounting, use redux or move state and call to App component.
        //https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
        fakeAsyncCall(cursor.id)
            .then(data => {
                this.saveData(data);
            })
            .catch(nodata => {
                this.saveData(nodata);
            });
    }

    
    saveData(data) {
        this.setState({
            isComponentHydrating: false,
            id: data
        });
    }

    clicked(){
        if(this.props.level == 4 && this.state.programId != null){
            this.loadSingletons(this.props.cursor.id, this.state.programId, this.formatDate(this.state.startDate), 
                this.formatDate(this.state.endDate));
            this.setState({
                canRun: true,
            });
            console.log(this.state.canRun);
            console.log(this.state.events);
            console.log(duplicates(this.state.events));
            
        } else {
            this.setState({
                canRun: false,
            });
        }

    }


    render() {
       var Button = require('react-button');
        if (this.props.cursor == null) { // Show a placeholder if the cursor of treebeard is not set
            return <div className="welcome">placeholder</div>;
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
                        Level: {this.props.level}
                    </div>
                    
                    <div>
                        <Button onClick={this.clicked.bind(this)} >Find duplicates</Button>
                    </div>
                </div>
                
            );
        }
    }

}



export default SingletonComponent;

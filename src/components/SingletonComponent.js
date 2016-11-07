import React, { Component, PropTypes } from 'react';
import {renderDropdown} from './DropdownComponent';


class SingletonComponent extends Component {
    constructor(...args){
        super(...args); 
        this.state = {
            Program: "",
            ProgramId: ""
        }
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(evt) {
        console.log(evt);
        
        this.setState({
            Program: this.props.data[evt].displayName,
            ProgramId: this.props.data[evt].id
        });
        
    }

    render() {
        if (this.props.cursor == null) { // Show a placeholder if the cursor of treebeard is not set
            return <div className="welcome">placeholder</div>;
        } else {
            return (
            <div>

                    <div className="welcome">
                        <p></p>

                        <p>name: {this.props.cursor.name}</p>
                        <p>id: {this.props.cursor.id}</p>

                        <p></p>
                    </div>
                    
                    <div>
                        <div className="welcome">
                            { renderDropdown({title: "Programs", list: this.props.data, i: 0, handleSelect: this.handleSelect})}
                        </div>

                        <p> </p>

                        <div className="selectedProgram">
                            <p>Program: {this.state.Program} </p>
                            <p>Program: {this.state.ProgramId} </p>
                        </div>
                    </div>
                </div>

            );
        }
    }

}



export default SingletonComponent;
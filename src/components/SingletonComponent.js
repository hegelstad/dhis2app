import React from 'react';
import {renderDropdown} from './DropdownComponent';
import { loadPrograms } from '../api';


var test =  [
        {name: "Nikolai"},
        {name: "Eirik"},
        {name: "Milena"}
    ];



const SingletonComponent = ({cursor, data}) => {
    console.log(data);
    if (cursor == null) { // Show a placeholder if the cursor of treebeard is not set
        return <div className="welcome">placeholder</div>;
    } else {
        return (
           <div>
                <div className="welcome">
                    { renderDropdown({title: "Programs", list: data, i: 0})}
                </div>

                <div className="welcome">
                    <p></p>
                    <p>name: {cursor.name}</p>
                    <p>id: {cursor.id}</p>
                </div>
            </div>

        );
    }
}

export default SingletonComponent;

import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

/* Component, a simple drop down list for all the programs. */
const ProgramDropdownList = ({title, list, i, onSelect}) => {

    var items = [];
    for (var j = 1; j < list.length + 1; j++) {
            var item = list[j-1];
            items.push(<MenuItem eventKey={j-1} key={j}>{item.displayName} </MenuItem>);
    }

    return (
        <DropdownButton bsStyle={"info"} title={title} key={i} id={`dropdown-basic-${i}`} onSelect={onSelect}>
            {items}
        </DropdownButton>
    );
}

export default ProgramDropdownList;

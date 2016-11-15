import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const ProgramDropdownList = ({title, list, i, onSelect}) => {

    var items = [];
    for (var j = 1; j < list.length + 1; j++) {
            var item = list[j-1];
            items.push(<MenuItem eventKey={j-1} key={j}>{item.displayName} </MenuItem>);
    }

    return (
        <DropdownButton bsStyle={"danger"} title={title} key={i} id={`dropdown-basic-${i}`} onSelect={onSelect}>
            {items}
        </DropdownButton>
    );
}

export default ProgramDropdownList;

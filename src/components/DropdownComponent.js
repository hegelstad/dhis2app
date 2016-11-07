import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';



export function renderDropdown({title, list, i, handleSelect}) {
    
    var items = [];
    for (var j = 1; j < list.length + 1; j++) {
            var item = list[j-1];
            items.push(<MenuItem eventKey={j-1} key={j}>{item.displayName} </MenuItem>);
        }

    return (
        <DropdownButton bsStyle={"danger"} title={title} key={i} id={`dropdown-basic-${i}`} onSelect={handleSelect}>
            {items}
        </DropdownButton>
    );
}




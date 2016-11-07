import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';


export function renderDropdown({title, list, i}) {
    var items = [];
    for (var j = 1; j < list.length + 1; j++) {
            var item = list[j-1];
            items.push(<MenuItem key={j}>{item.displayName}</MenuItem>);
        }

    return (
        <DropdownButton bsStyle={"danger"} title={title} key={i} id={`dropdown-basic-${i}`}>
            {items}
        </DropdownButton>
    );
}


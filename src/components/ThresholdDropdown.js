import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

/* Function for displaying a simple DropdownButton for the threshold
    values the basic search function will utilize.*/

export default function ThresholdDropdown({ onSelect }) {
    var items = []
    for (let i = 0; i < 11; i++) {
        items.push(<MenuItem eventKey={i/10.0} key={i+666}>{i/10}</MenuItem>)
    }

    return (
        <DropdownButton bsStyle="info" bsSize="small" title="Threshold" key={666} id={`split-button-basic-${666}`} onSelect={onSelect}>
            {items}
        </DropdownButton>
    );
}

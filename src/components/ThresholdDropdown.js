import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';


const BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];

export default function ThresholdDropdown({ onSelect }) {
    var items = []
    for (let i = 0; i < 6; i++) {
        items.push(<MenuItem eventKey={i+666} key={i+666}>{i/10}</MenuItem>)
    }

    return (
        <DropdownButton bsStyle="info" title="Threshold" key={666} id={`split-button-basic-${666}`} onSelect={onSelect}>
            {items}
        </DropdownButton>
    );
}

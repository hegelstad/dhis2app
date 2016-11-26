import React from 'react';
import { Accordion, Panel, Table, Well, Button } from 'react-bootstrap';
import ReactTable from 'react-table';

/* Component, accordion with a table. Each accordion displays a table of duplicates.
    for intance:
        - Anna Jones -
            | name          | id |  Weight..
            | Anna Joens    |  0 |  ...
            | Anna Jones    |  1 |  ...     */

export default function AccordionInstance({ input }) {

   /* Functions takes a nested list as input, returns an accordion objects with
        panels for each of the sublists (sets of duplicates).
        TODO: Need to change columns when we get the real data.*/
    const columns = [
        {
            header: 'Name',
            accessor: 'value'
        },
        {
            header: 'Tracked Entity Instance',
            accessor: 'trackedEntityInstance'
        },
        {
            header: 'Weight',
            accessor: 'weight'
        },
        {
            header: 'Height',
            accessor: 'height'
        }

    ]
    var panelList = []
    var colorList = ["info", "success", "warning", "danger"] // Just because we can #gaypride
    var c = 0;
    var counter = 1000

    for (let inputNum = 0; inputNum < input.length; inputNum++) {
        var data = input[inputNum];
        var len = data.length;

        var items = <ReactTable
            key={counter++}
            data={data}
            columns={columns}
            minRows={2}
            pageSize={5}
            pageSizeOptions={[2, 5, 10]}
            />


        panelList.push(<Panel bsStyle={colorList[c++]} header={<span><Button bsSize="small">{len}</Button> {data[0].value}</span>} key={counter++} eventKey={counter++}> {items} </Panel>)
    }

    return (
        <Accordion>
            {panelList}
        </Accordion>);
}

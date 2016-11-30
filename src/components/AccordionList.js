import React from 'react';
import { Accordion, Panel, Table, Button } from 'react-bootstrap';
import ReactTable from 'react-table';

/* Component, accordion with a table. Each accordion displays a table of duplicates.
    for intance:
        - Anna Jones -
            | name          | id |  Weight..
            | Anna Joens    |  0 |  ...
            | Anna Jones    |  1 |  ...     */

const AccordionList = ({ input, columns }) => {

   /* Functions takes a nested list as input, returns an accordion objects with
        panels for each of the sublists (sets of duplicates).
        TODO: Need to change columns when we get the real data.*/

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
            pageSizeOptions={[5, 10]}
            />


        panelList.push(<Panel bsStyle={colorList[0]} header={<span><Button bsSize="small" className="margin-right">{len}</Button>{`${data[0].Firstname} ${data[0].Lastname}`}</span>} key={counter++} eventKey={counter++}> {items} </Panel>)
    }

    if (panelList.length < 1){
        return (
             <Accordion>
                <Panel bsStyle={colorList[0]} header="No Duplicates Found!" key={counter++} eventKey={counter++}> </Panel>
             </Accordion>
        )
    } else {
        return (
        <Accordion>
            {panelList}
        </Accordion>);
    }
}

export default AccordionList;

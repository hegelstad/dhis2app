import React from 'react';
import { Accordion,
         Panel,
         Table,
         Button } from 'react-bootstrap';
import ReactTable from 'react-table';

/* Component, accordion with a table. Each accordion displays a table of duplicates.
    for intance:
        - Anna Jones -
            | name          | id |  Weight..
            | Anna Joens    |  0 |  ...
            | Anna Jones    |  1 |  ...     */

const AccordionList = ({ input, columns }) => {

   /* Functions takes a nested list as input, returns an accordion objects with
        panels for each of the sublists (sets of duplicates). If the input is empty, it
        will return an empty accordion with the title "No Duplicates Found!". */

    var panelList = []
    var colorList = ["info", "success", "warning", "danger"] // multiple react-bootstrap default colors/themes.
    var c = 0;
    var counter = 1000

    for (let inputNum = 0, nColumns = 0; inputNum < input.length; inputNum++) {
        var data = input[inputNum];
        var len = data.length;
        var col = columns[nColumns]; // for multiple different columns

        /* Here we're adding the react-table inside each accordion.*/
        var items = <ReactTable
            key={counter++}
            data={data}
            columns={col}
            minRows={2}
            pageSize={5}
            pageSizeOptions={[5, 10, 20]}
            />

        /* Titles of each panel, if singleton event we need a predefined name. */
        var name = `${data[0].Firstname} ${data[0].Lastname}`

        if (name == "undefined undefined") {
            name = 'Singleton set #' + c++;
        }

        panelList.push(<Panel bsStyle={colorList[0]} header={<span><Button bsSize="small" className="margin-right">{len}</Button>{name}</span>} key={counter++} eventKey={counter++}> {items} </Panel>)
        if (nColumns != columns.length - 1) {
            nColumns++;
        }
    }

    if (panelList.length < 1){
        return (
             <Accordion>
                <Panel bsStyle={colorList[0]} header="No Duplicates Found!" key={counter++} eventKey={counter++}> </Panel>
             </Accordion>
        );
    } else {
        return (
            <Accordion>
                {panelList}
            </Accordion>
        );
    }
}

export default AccordionList;

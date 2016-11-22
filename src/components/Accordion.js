import React from 'react';
import { Accordion, Panel, Table, Well } from 'react-bootstrap';
import ReactTable from 'react-table';


const AccordionInstance = ({ input }) => {

    
    const columns = [
        {
            header: 'displayName',
            accessor: 'displayName'
        }, 
        {
            header: 'Name',
            accessor: 'value'
        },
        {
            header: "TEI Id",
            accessor: "trackedEntityInstance"
        }
    ]
    var items= []
    for (let elem = 0; elem < input.length; elem++) {

        items.push(<ReactTable
                        data={input[elem]}
                        columns={columns}
                        minRows={2}
                        pageSize={5}
                        pageSizeOptions={[2, 5, 10]} // The available page size options
                    />)
    }

    return(
        <Accordion >
            <Panel bsStyle="success" header="SE HER NIKOLAI" key={1234} eventKey={1234}> {items} </Panel>
        </Accordion>);
}

export default AccordionInstance;
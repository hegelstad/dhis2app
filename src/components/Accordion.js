import React from 'react';
import { Accordion, Panel } from 'react-bootstrap';


const AccordionInstance = ({ title }) => {
                console.log(title);

                var items = []
                var counter = 100;
                for (let i = 0; i < title.length; i++) {
                    var inner = []

                    for (let key in title[i]) {
                        inner.push(<p key={counter++}> {key}: {(title[i])[key]} </p>);
                    }

                    items.push(<Panel bsStyle="success" header={title[i].value} key={i} eventKey={i}> {inner} </Panel>);
                }

                return(
                    <Accordion >
                        {items}
                    </Accordion>);
            }

export default AccordionInstance;
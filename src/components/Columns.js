import React from 'react';
import { connect } from 'react-redux';

/* These are the colums our table of duplicates will use in the 
    TEI component of the application. The react-table will search for elements
    in the object with the accessor and places these in the column of header.
    
    Suggested improvements: Let user select categories to display in the table. 
        Would give the user a bit more freedom, but at the same time K.I.S.S.
        the information shown should be sufficient to decide if two entities are duplicates.*/


export const columns = [[
    {
        header: 'Duplicate?',
        render: props =>
            <span>
                <input
                    type="checkbox"
                    onChange={(val) => { console.log(val) } } // Binds function to this
                    />
            </span>
    },
    {
        header: 'First name',
        accessor: 'Firstname'
    },
    {
        header: "Last name",
        accessor: 'Lastname'
    },
    {
        header: 'Gender',
        accessor: 'Gender'
    },
    {
        header: 'Weight',
        accessor: 'Weightinkg'
    },
    {
        header: 'Height',
        accessor: 'Heightincm'
    },
    {
        header: 'Maiden name',
        accessor: 'Mothermaidenname'
    },
    {
        header: 'Phone number',
        accessor: 'Phonenumber'
    },
    {
        header: 'Address',
        accessor: 'Address'
    },
    {
        header: 'Email',
        accessor: 'Email'
    },
    {
        header: 'National ID',
        accessor: 'Nationalidentifier'
    },
    {
        header: 'TB number',
        accessor: 'TBnumber'
    }
]]

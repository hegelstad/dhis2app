import React from 'react';

export const Columns = [
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
            },
            {
                header: 'Duplicate?',
                render: props =>
                        <span>
                            <input
                                type="checkbox"
                                onChange={() => { // Binds function to this
                                    }
                                }
                            />
                        </span>
            }
        ]
     
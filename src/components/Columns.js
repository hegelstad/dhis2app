import React from 'react';
import { connect } from 'react-redux';

export const columns = [
            {
                header: 'Duplicate?',
                render: props =>
                        <span>
                            <input
                                type="checkbox"
                                onChange={(val) => {console.log(val)}} // Binds function to this
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
        ]

import React from 'react';

const MergeComponent = ({cursor}) => {
    if (cursor == null) { // Show a placeholder if the cursor of treebeard is not set
        return <div className="welcome">placeholder</div>;
    } else {
        return (
            <div className="welcome">
                <p>name: {cursor.name}</p>
                <p>id: {cursor.id}</p>
            </div>
        );
    }
}

export default MergeComponent;

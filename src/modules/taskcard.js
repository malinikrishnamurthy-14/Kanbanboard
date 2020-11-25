import React from 'react';
import css from '../App.css';

class TaskCard extends React.Component {
    render() {
        return (
            <div className="taskcard-content" draggable="true" onDrag="ondrag()">
                <div className="title"> Task Name</div>
                <hr></hr>
                <div className="description"> Task Description</div>
            </div>
        )
    }

    ondrag() {
        alert("drag");
    }
}

export default TaskCard;
import React, { useContext, } from 'react';
import { PomodoroContext } from '../PomodoroContext';

const StatusBar = (props) => {
    const { addTask } = useContext(PomodoroContext)
    return (

        <div className="ag-status-name-value">

            <button onClick={() => addTask()}>Add Task</button>
        </div>
    );

};

export default StatusBar;
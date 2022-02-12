import { memo } from 'react';

const TaskDetailsComponent = memo((props) => {

    const { pomodoroType, theme, task } = props;

    const isPomodoroTask = pomodoroType === "pomodoro";

    const emoji = isPomodoroTask ? '📌' : '🕺';

    return (<div className='task-container' >
        <div
            style={{
                color: theme.background,
                fontSize: 20,
            }}>

            <span style={{
                fontSize: 30,
                paddingRight: '5px'
            }}>
                {emoji}
            </span>
            {isPomodoroTask ?
                <span >
                    <span
                        style={{
                            fontWeight: 'bold',
                            fontSize: 24
                        }}
                    >
                        {task ? "Working on" : "Time to work!"}
                    </span>
                    {task && (<div
                    >
                        {task}
                    </div>)}
                </span> :
                <span
                    style={{
                        fontWeight: 'bold',
                        fontSize: 24
                    }}>Time for a break!</span>}
        </div>
    </div >)
});

export default TaskDetailsComponent;
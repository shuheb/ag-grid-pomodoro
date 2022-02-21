import { memo } from 'react';

const TaskDetailsComponent = memo((props) => {

    const { pomodoroType, theme, task } = props;

    const isPomodoroTypeSelected = pomodoroType === "pomodoro";

    const emoji = isPomodoroTypeSelected ? '📌' : '🕺';

    return (<div className='task-container' >
        <span style={{
            fontSize: 30,
            paddingRight: '5px'
        }}>
            {emoji}
        </span>
        <span style={{ color: theme.background, fontWeight: 'bold', fontSize: 24 }}>
            {isPomodoroTypeSelected ?
                <>
                    {task ? "Working on" : "Time to focus!"}
                    {task && (<div style={{ fontWeight: 'normal', fontSize: 20 }}>{task}</div>)}
                </>
                :
                "Time for a break!"
            }
        </span>
    </div >)
});

export default TaskDetailsComponent;
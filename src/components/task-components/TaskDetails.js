import { memo } from 'react';

const TaskDetails = memo((props) => {
    const { pomodoroType, theme, task } = props;
    const isPomodoroTypeSelected = pomodoroType === "pomodoro";
    const emoji = isPomodoroTypeSelected ? '📌' : '🕺';

    return (<div className="task-container">
        <span>{emoji}</span>
        <span style={{ color: theme.background }}>
            {isPomodoroTypeSelected ? <> {task ? "Working on" : "Time to focus!"} {task && (<div style={{ fontWeight: 'normal', fontSize: 20 }}>{task}</div>)}</> : "Time for a break!"}
        </span>
    </div >)
});

export default TaskDetails;
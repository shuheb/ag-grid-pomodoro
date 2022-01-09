import { memo, useContext } from 'react';
import { PomodoroContext } from '../PomodoroContext';

const PomodoroActionComponent = memo((props) => {
    console.log('PomodoroActionComponent')
    const { toggleTimer, startTimer, stopTimer } = useContext(PomodoroContext);
    const type = props.node.data.type;
    const timerStarted = props.node.data.timerStarted;

    const classNameExpression = type === "pomodoro" ? "p-button red" : type === "short_break" ? "p-button green" : "p-button blue";
    return (
        <div className="btn-container">
            <button className={classNameExpression}
                onClick={() => timerStarted ? stopTimer({ id: props.node.data.id, timerStarted }) : startTimer({ id: props.node.data.id, timerStarted })}>
                {timerStarted ? 'STOP' : 'START'}
            </button>
        </div>
    )
});


export default PomodoroActionComponent;
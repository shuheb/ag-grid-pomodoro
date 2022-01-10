import { memo, useContext } from 'react';
import { PomodoroContext } from '../PomodoroContext';
import { ThemeContext } from '../ThemeContext';

const ActionComponent = memo((props) => {
    console.log('ActionComponent')
    const { startTimer, stopTimer } = useContext(PomodoroContext);
    const themes = useContext(ThemeContext);
    const type = props.node.data.type;
    const { background } = themes[type]
    const timerStarted = props.node.data.timerStarted;
    return (
        <div className="btn-container" >
            <button className="p-button" style={{color: background}}
                onClick={() => timerStarted ? stopTimer({ id: props.node.data.id, timerStarted }) : startTimer({ id: props.node.data.id, timerStarted })}>
                {timerStarted ? 'STOP' : 'START'}
            </button>
        </div>
    )
});


export default ActionComponent;
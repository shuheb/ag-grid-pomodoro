import { memo, useContext } from 'react';
import { PomodoroContext } from '../../PomodoroContext';
import ActionComponent from '../ActionComponent';

const ActionCellRenderer = memo((props) => {
    // console.log('ActionCellRenderer')
    const { startTimer, stopTimer, currentRow, rowData } = useContext(PomodoroContext);
    const { themes } = props;
    // const type = props.node.data.type;
    const type = 'pomodoro'
    const { background } = themes[type]
    const { timerStarted, id, timeLeft, completed, } = props.node.data;
    return (
        <ActionComponent
            timerStarted={timerStarted}
            id={id}
            node={props.node}
            rowData={rowData}
            completed={completed}
            background={background}
            startTimer={startTimer}
            stopTimer={stopTimer}
            currentRow={currentRow}
            timeLeft={timeLeft}
        />
    )
});

export default ActionCellRenderer;
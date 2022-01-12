import { memo, useContext } from 'react';
import { PomodoroContext } from '../../PomodoroContext';
import ActionComponent from '../ActionComponent';

const ActionCellRenderer = memo((props) => {
    // console.log('ActionCellRenderer')
    const { startTimer, stopTimer, currentRow} = useContext(PomodoroContext);
    const { themes } = props;
    const type = props.node.data.type;
    const { background } = themes[type]
    const { timerStarted, id, timeLeft } = props.node.data;
    return (
        <ActionComponent timerStarted={timerStarted} id={id} background={background} startTimer={startTimer} stopTimer={stopTimer} currentRow={currentRow} timeLeft={timeLeft} />
    )
});

export default ActionCellRenderer;
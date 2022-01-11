import { memo, useContext } from 'react';
import { PomodoroContext } from '../PomodoroContext';
import { ThemeContext } from '../ThemeContext';
import ActionComponent from './ActionComponent';

const ActionCellRenderer = memo((props) => {
    // console.log('ActionCellRenderer')
    const { startTimer, stopTimer } = useContext(PomodoroContext);
    const themes = useContext(ThemeContext);
    const type = props.node.data.type;
    const { background } = themes[type]
    const {timerStarted, id } = props.node.data;
    return (
       <ActionComponent timerStarted={timerStarted} id={id} background={background} startTimer={startTimer} stopTimer={stopTimer} />
    )
});

export default ActionCellRenderer;
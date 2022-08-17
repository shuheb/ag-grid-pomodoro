import { Button } from '@mui/material';
import { memo, useContext } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { serialiseDate } from '../../utils/date';
import { PomodoroContext } from '../../context/PomodoroContext';

const EndTime = memo((props) => {
    const { pomodoroType, buttonColor, timerStarted, setTimerStarted, id, timeLeft, seconds } = props;
    const { dispatch } = useContext(PomodoroContext);

    const endTime = new Date();
    const endTimeDelta = pomodoroType === "pomodoro" ? timeLeft ? timeLeft : 1500 : pomodoroType === "short_break" ? 300 : 900;
    endTime.setMinutes(endTime.getMinutes() + Math.round(endTimeDelta / 60));
    const endTimeString = serialiseDate(endTime);

    const onClickHandler = () => {
        if (id !== -1) {
            timerStarted ?
                dispatch({ type: 'stopped_timer', id, timeLeft: seconds }) :
                dispatch({ type: 'started_timer', id })
        }
        setTimerStarted(!timerStarted);
    };

    return (<div className='end-timer-container'>
        <Button disableElevation sx={{ color: buttonColor }} onClick={onClickHandler} variant="contained" startIcon={timerStarted ? <StopIcon fontSize='medium' /> : <PlayArrowIcon fontSize='medium' />}>
            {timerStarted ? "STOP" : "START"}
        </Button>
        <span>end time<span>{endTimeString}</span></span>
    </div>)
});

export default EndTime;
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

    return (<div style={{ display: 'flex', paddingLeft: '15px' }}>
        <Button disableElevation
            sx={{
                backgroundColor: 'white',
                color: buttonColor,
                fontWeight: 'bold',
                '&:hover': {
                    backgroundColor: '#00000014',
                    color: 'white'
                },
            }}
            onClick={() => {
                if (id !== -1) {
                    timerStarted ? dispatch({ type: 'stopped_timer', id, timeLeft: seconds }) : dispatch({ type: 'started_timer', id })
                }
                setTimerStarted(!timerStarted);

            }}
            startIcon={timerStarted ? <StopIcon fontSize='medium' /> : <PlayArrowIcon fontSize='medium' />}
            variant="contained">{timerStarted ? "STOP" : "START"}</Button>
        <div style={{ marginLeft: 'auto' }}>
            <span style={{
                color: 'white',

                fontSize: 20
            }}>
                end time
                <span style={{
                    fontWeight: 'bold',
                    fontSize: 30
                }}>
                    {" " + endTimeString}
                </span>
            </span>
        </div></div>)
});

export default EndTime;
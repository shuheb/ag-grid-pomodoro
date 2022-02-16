import { Button } from '@mui/material';
import { memo } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { serialiseDate } from '../../utils/date';

const EndTimeComponent = memo((props) => {
    const { pomodoroType, buttonColor, timerStarted, setTimerStarted, stopTimer, startTimer, id, timeLeft } = props;
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
                if (id) {
                    timerStarted ? stopTimer({ id }) : startTimer({ id })
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

export default EndTimeComponent;
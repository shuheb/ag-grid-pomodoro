import { Button } from '@mui/material';
import { memo } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

const EndTimeComponent = memo((props) => {
    const { pomodoroType, buttonColor, timerStarted, setTimerStarted, stopTimer, startTimer, id, timeLeft } = props;
    const endTime = new Date();
    const endTimeDelta = pomodoroType === "pomodoro" ? timeLeft ? timeLeft : 1500 : pomodoroType === "short_break" ? 300 : 900;
    endTime.setMinutes(endTime.getMinutes() + Math.round(endTimeDelta / 60));
    var hours = endTime.getHours();
    var minutes = endTime.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;

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
                    {` ${hours}:${minutes}${ampm}`}
                </span>
            </span>
        </div></div>)
});

export default EndTimeComponent;
import { Box, CircularProgress, Typography } from '@mui/material';
import { useState, useEffect, memo, useContext } from 'react';
import { PomodoroContext } from '../../PomodoroContext';

// https://mui.com/components/progress/#circular-with-label
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant='determinate' {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="white">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const ProgressComponent = memo(props => {
  const { timeLeft } = props;
  // represent timeLeft as a percentage of the total time
  const minutes = Math.floor((((1500 - timeLeft) / 1500) * 100));

  return (<CircularProgressWithLabel sx={{ color: 'white' }} value={minutes} />);
});

const TimerCellRenderer = memo(props => {
  const { stopTimer, persistSeconds, markAsComplete } = useContext(PomodoroContext);
  const { id, timerStarted, timeLeft } = props.node.data;
  const [seconds, setSeconds] = useState(timeLeft);

  // when timer is stopped, get the current seconds left for the row and persist it to the store
  useEffect(() => {
    if (!timerStarted && seconds && seconds < timeLeft) {
      persistSeconds({ id, timeLeft: seconds })
    };
  }, [timerStarted]);

  // start ticking the timer by decrementing seconds by 1 every second
  // if seconds reaches 0, then stop the timer and mark the task as completed
  useEffect(() => {
    let timer;
    if (seconds === 0) {
      stopTimer({ id });
      markAsComplete({ id });
    }
    else if (timerStarted && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prev => prev - 1)
      }, 1000);
    }

    return () => {
      if (timer) { clearInterval(timer); };
    }
  }, [seconds, timerStarted, id, stopTimer, markAsComplete])

  const secondsToShow = (seconds % 60) < 10 ? `0${seconds % 60}` : seconds % 60;
  const minutesToShow = Math.floor(seconds / 60) < 10 ? `0${Math.floor(seconds / 60)}` : Math.floor(seconds / 60);

  return (<div style={{
    width: '100%'
  }}>
    <div
      style={{
        fontSize: '25px',
        fontWeight: 'bold'
      }}>
      {`${minutesToShow}:${secondsToShow}`}
    </div>
    <div style={{ marginLeft: 'auto' }}><ProgressComponent timeLeft={seconds} /></div>
  </div>)

});

export default TimerCellRenderer;
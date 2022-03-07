import { Box, CircularProgress, Typography } from '@mui/material';
import { useState, useEffect, memo, useContext } from 'react';
import { PomodoroContext } from '../../context/PomodoroContext';
import { formatSecondsIntoMinutesAndSeconds } from '../../utils/date';

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

  // when timer is stopped, get the time left for the active task and persist it to the store
  useEffect(() => {
    if (!timerStarted) {
      persistSeconds({ id, timeLeft: seconds })
    };
  }, [timerStarted, persistSeconds, seconds, id]);

  // start ticking the timer by decrementing every second
  // if seconds reaches 0, then stop the timer and mark the task as completed
  useEffect(() => {
    let timer;

    if (timerStarted) {
      timer = setInterval(() => {
        setSeconds(prev => prev - 1)
      }, 1000);
    }

    return () => {
      if (timer) { clearInterval(timer); };
    }
  }, [seconds, timerStarted]);

  useEffect(() => {
    if (seconds === 0) {
      stopTimer({ id });
      markAsComplete({ id });
    }
  }, [seconds, stopTimer, markAsComplete, id])

  // format the seconds into minutes and seconds
  let timeString = formatSecondsIntoMinutesAndSeconds(seconds);

  return (<>
    <div
      style={{
        fontSize: '25px',
        fontWeight: 'bold'
      }}>
      {timeString}
    </div>
    <ProgressComponent timeLeft={seconds} />
  </>)

});

export default TimerCellRenderer;
import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, memo, useContext, useCallback } from 'react';
import { PomodoroContext } from '../../context/PomodoroContext';
import { formatSecondsIntoMinutesAndSeconds } from '../../utils/date';
import useTimer from '../../utils/useTimer';

const ProgressCellRenderer = memo(props => {
  const { dispatch } = useContext(PomodoroContext);
  const { id, timerStarted, timeLeft } = props.node.data;

  const taskCompletedCallback = useCallback(() => {
    dispatch({ type: 'completed_task', id })
  }, [id, dispatch]);

  const [seconds] = useTimer(timerStarted, timeLeft, taskCompletedCallback);

  useEffect(() => {
    if (timerStarted) {
      props.node.setData({ ...props.node.data, timeLeft: seconds })
    }
  }, [seconds, props.node, timerStarted])

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


export default ProgressCellRenderer;
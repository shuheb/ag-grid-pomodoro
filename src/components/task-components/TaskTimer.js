import { useState, useEffect, useCallback, memo } from 'react';
import { formatSecondsIntoMinutesAndSeconds } from '../../utils/date';
import useTimer from '../../utils/useTimer';
import EndTime from './EndTime';

const TaskTimer = memo((props) => {
  const { pomodoroType, theme, timeLeft, id, timerStarted } = props;
  const [stateTimerStarted, setStateTimerStarted] = useState(timerStarted);

  const callback = useCallback(() => {
    setStateTimerStarted(false);
  }, []);

  const [seconds, setSeconds] = useTimer(stateTimerStarted, timeLeft, callback);

  useEffect(() => {
    setStateTimerStarted(timerStarted)
  }, [timerStarted]);

  useEffect(() => {
    setSeconds(timeLeft);
  }, [id, timeLeft, setSeconds])

  const timerString = formatSecondsIntoMinutesAndSeconds(seconds);
  return (
    <>
      <div className='timer-label'>{timerString}</div>
      <EndTime
        buttonColor={theme.background}
        timerStarted={stateTimerStarted}
        setTimerStarted={(prev) => setStateTimerStarted(prev)}
        id={id}
        timeLeft={timeLeft}
        seconds={seconds}
        pomodoroType={pomodoroType} />
    </>
  )
});

export default TaskTimer;
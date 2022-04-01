import { useState, useEffect, useCallback, memo } from 'react';
import { formatSecondsIntoMinutesAndSeconds } from '../../utils/date';
import useTimer from '../../utils/useTimer';
import EndTimeComponent from './EndTimeComponent';

const TaskTimerComponent = memo((props) => {
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
    <div>
      <div style={{ color: 'white', fontWeight: 'bold', fontSize: 90, padding: '30px 0px' }}>{timerString}</div>
      <EndTimeComponent
        buttonColor={theme.background}
        timerStarted={stateTimerStarted}
        setTimerStarted={(prev) => setStateTimerStarted(prev)}
        id={id}
        timeLeft={timeLeft}
        pomodoroType={pomodoroType} />
    </div>
  )
});

export default TaskTimerComponent;
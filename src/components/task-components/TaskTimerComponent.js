import { useState, useEffect, memo } from 'react';
import { formatSecondsIntoMinutesAndSeconds } from '../../utils/date';
import useTimer from '../../utils/useTimer';
import EndTimeComponent from './EndTimeComponent';

const TaskTimerComponent = memo((props) => {
  const { pomodoroType, stopTimer, startTimer, theme } = props;
  const { timeLeft, id, timerStarted } = props.value;
  const [stateTimerStarted, setStateTimerStarted] = useState(timerStarted);
  const [seconds, setSeconds] = useTimer(stateTimerStarted, timeLeft);

  useEffect(() => {
    setStateTimerStarted(timerStarted)
  }, [timerStarted]);

  useEffect(() => {
    setSeconds(prev => timeLeft);
  }, [timeLeft, setSeconds])

  // when the timer reaches 0, set stateTimerStarted=false, so that the timer will stop
  useEffect(() => {
    if (seconds === 0) {
      setStateTimerStarted(false);
    }
  }, [seconds])

  const timerString = formatSecondsIntoMinutesAndSeconds(seconds);
  return (
    <div>
      <div style={{ color: 'white', fontWeight: 'bold', fontSize: 90, padding: '30px 0px' }}>{timerString}</div>
      <EndTimeComponent
        buttonColor={theme.background}
        timerStarted={stateTimerStarted}
        setTimerStarted={(prev) => setStateTimerStarted(prev)}
        stopTimer={stopTimer}
        id={id}
        timeLeft={timeLeft}
        startTimer={startTimer}
        pomodoroType={pomodoroType} />
    </div>
  )
});

export default TaskTimerComponent;
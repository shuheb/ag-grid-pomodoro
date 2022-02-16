import { useState, useEffect, memo } from 'react';
import { formatSecondsIntoMinutesAndSeconds } from '../../utils/date';
import EndTimeComponent from './EndTimeComponent';

const TaskTimerComponent = memo((props) => {
  const { pomodoroType, stopTimer, startTimer, theme } = props;
  const { timeLeft, id, timerStarted, completed } = props.value || '';
  const [seconds, setSeconds] = useState(25 * 60);
  const [stateTimerStarted, setStateTimerStarted] = useState(false);

  // timerStarted may not exist on the initial render
  // when it does exist, we store it inside the state variable stateTimerStarted
  useEffect(() => {
    if (timerStarted !== undefined) {
      setStateTimerStarted(timerStarted)
    }
  }, [timerStarted]);

  // timeLeft may not exist on the initial render
  // when it does exist, we store it inside the state variable seconds
  useEffect(() => {
    if (timeLeft !== undefined) {
      setSeconds(timeLeft);
    }
  }, [timeLeft])

  /* this is to reset the timer if:
  - a timer has reached 0 seconds which means completed=true
  - a task from the grid is not active, therefore we show the default timer
  */
  useEffect(() => {
    if (!timeLeft || completed) {
      const newSeconds = pomodoroType === "short_break" ? 5 * 60 : pomodoroType === "long_break" ? 15 * 60 : 25 * 60;
      setSeconds(newSeconds)
      setStateTimerStarted(false);
    }

    // if timeLeft exists, this means task from the grid is active.
    // if short_break / long_break is selected, reset timer to adjust for this
    if (timeLeft) {
      const newSeconds = pomodoroType === "short_break" ? 5 * 60 : pomodoroType === "long_break" ? 15 * 60 : timeLeft;
      setSeconds(newSeconds)
    }
  }, [pomodoroType, completed]);

  // handle the timer logic
  useEffect(() => {
    let timer;

    if (stateTimerStarted && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prev => prev - 1)
      }, 1000);
    }

    return () => {
      if (timer) { clearInterval(timer); };
    }
    // eslint-disable-next-line
  }, [stateTimerStarted]);

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
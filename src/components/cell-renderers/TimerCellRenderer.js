import { useState, useEffect, memo, useContext } from 'react';
import { PomodoroContext } from '../../PomodoroContext';

// i have timerLeft, make useState based on that, then start timer locally
// do the same for the component above
// check if it saves renders
const TimerCellRenderer = memo(props => {
  const { stopTimer, persistSeconds, markAsComplete } = useContext(PomodoroContext);
  // const { stopTimer, currentRow, persistSeconds } = props;
  const { id, timerStarted, timeLeft } = props.node.data;

  const [seconds, setSeconds] = useState(timeLeft);

  // useEffect(() => {
  //   setSeconds(timeLeft);
  // }, [type]);

  // if timer is stopped, and the current timer is less than the default timer, then set the new value
  useEffect(() => {
    if (!timerStarted && seconds && seconds < timeLeft) {
      persistSeconds({ id, timeLeft: seconds })
    };
  }, [timerStarted])
  useEffect(() => {
    let timer;
    if (seconds === 0) {
      stopTimer({ id });
      markAsComplete({ id });
      // removeCurrentTimer({ id })
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

  if (!timerStarted && (seconds < timeLeft)) {
    // persistSeconds({id, seconds})
  }

  const secondsToShow = (seconds % 60) < 10 ? `0${seconds % 60}` : seconds % 60;
  const minutesToShow = Math.floor(seconds / 60) < 10 ? `0${Math.floor(seconds / 60)}` : Math.floor(seconds / 60);

  return (<div className="p-timer">{`${minutesToShow}:${secondsToShow}`}</div>)

});

export default TimerCellRenderer;
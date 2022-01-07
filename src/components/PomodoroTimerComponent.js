import { useState, useEffect, memo, useContext } from 'react';
import { PomodoroContext } from '../PomodoroContext';

const PomodoroTimerComponent = memo(props => {
  console.log('PomodoroTimerComponent');
  const { stopTimer } = useContext(PomodoroContext);
  const { node } = props;
  const timerStarted = node.data.timerStarted;
  const type = node.data.type;
  const [seconds, setSeconds] = useState();

  useEffect(() => {
    let timer;
    if (seconds === 0) {
      stopTimer({ id: node.data.id });
    }
    else if (timerStarted && seconds > 0) {
      console.log('timer', seconds)
      timer = setInterval(() => {

        setSeconds(prev => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) { clearInterval(timer); };
    }
  }, [timerStarted, seconds, node.data.id, stopTimer]);

  useEffect(() => {
    switch (type) {
      case 'short_break':
        setSeconds(5 * 60);
        break;
      case 'long_break':
        setSeconds(15 * 60);
        break;
      default:
        setSeconds(25 * 60);
    }
  }, [type]);

  const secondsToShow = (seconds % 60) < 10 ? `0${seconds % 60}` : seconds % 60;
  const minutesToShow = Math.floor(seconds / 60) < 10 ? `0${Math.floor(seconds / 60)}` : Math.floor(seconds / 60);

  return (<div className="p-timer">{`${minutesToShow}:${secondsToShow}`}</div>)
});

export default PomodoroTimerComponent;
import { useState, useEffect, memo, useContext } from 'react';
import { PomodoroContext } from '../PomodoroContext';

const TimerComponent = memo(props => {
  console.log('TimerComponent');
  const { stopTimer, decrementTimeLeft } = useContext(PomodoroContext);
  const { id, timerStarted, timeLeft } = props.node.data;
  
  useEffect(() => {
    let timer;
    console.log('USE EFFECT')
    if (timeLeft === 0) {
      stopTimer({ id });
    }
    else if (timerStarted && timeLeft > 0) {
      console.log('else if block')
      timer = setTimeout(() => {
        decrementTimeLeft({id})
      }, 1000);
    }

    return () => {
      if (timer) { clearTimeout(timer); };
    }
  }, [timerStarted, timeLeft, id, stopTimer]);

  const secondsToShow = (timeLeft % 60) < 10 ? `0${timeLeft % 60}` : timeLeft % 60;
  const minutesToShow = Math.floor(timeLeft / 60) < 10 ? `0${Math.floor(timeLeft / 60)}` : Math.floor(timeLeft / 60);

  return (<div className="p-timer">{`${minutesToShow}:${secondsToShow}`}</div>)
});

export default TimerComponent;
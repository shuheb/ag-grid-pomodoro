import { useState, useEffect, memo } from 'react';


const PomodoroTimerComponent = memo(props => {
  
    const { node } = props;
    const doesTaskExist = node.data.task;
    // console.log(node.data)
    const timerStarted = node.data.timerStarted;
    const type = node.data.type || "pomodoro";
    const [startTimer, setStartTimer] = useState(timerStarted);
    const [seconds, setSeconds] = useState(25 * 60);
    const [timerType, setTimerType] = useState(type);
  
    useEffect(() => {
      setStartTimer(timerStarted);
    },[timerStarted]);

    useEffect(() => {
        setTimerType(type)
        setStartTimer(false);
    },[type])
  
    useEffect(() => {
      let timer;
      if (startTimer && seconds > 0) {
        timer = setInterval(() => {
          console.log('set interval')
          setSeconds(prev => prev - 1);
          if (seconds < 0) {
            console.log('clear timer')
          }
        }, 1000);
      }
  
      return () => {
        if (timer) { clearInterval(timer); };
      }
    }, [timerStarted,startTimer]);
  
    useEffect(() => {
      if (seconds === 0) {
        setStartTimer(false);
      }
    }, [seconds]);
  
    useEffect(() => {
      switch (timerType) {
        case 'short_break':
          setSeconds(5 * 60);
          break;
        case 'long_break':
          setSeconds(15 * 60);
          break;
        default:
          setSeconds(25 * 60);
      }
    }, [timerType]);
  
    const secondsToShow = (seconds % 60) < 10 ? `0${seconds % 60}` : seconds % 60;
    const minutesToShow = Math.floor(seconds / 60) < 10 ? `0${Math.floor(seconds / 60)}` : Math.floor(seconds / 60);
    const timerString = doesTaskExist ? `${minutesToShow}:${secondsToShow}`:null;
  
  
    return (<div className="p-timer">{timerString}</div>)
  });

  export default PomodoroTimerComponent;
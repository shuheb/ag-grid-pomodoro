import { useState, useEffect, memo } from 'react';

const PomodoroCellRendererComponent = () => {
  const [startTimer, setStartTimer] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [timerType, setTimerType] = useState("pomodoro")

  useEffect(() => {
    let timer;
    if (startTimer && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prev => prev - 1);
        if (seconds < 0) {
          console.log('clear timer')
        }
      }, 1000);
    }

    return () => {
      if (timer) { clearInterval(timer); };
    }
  }, [startTimer]);

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

  const onClickHandler = () => {
    setStartTimer(prev => !prev);
  }

  const secondsToShow = (seconds % 60) < 10 ? `0${seconds % 60}` : seconds % 60;
  const minutesToShow = Math.floor(seconds / 60) < 10 ? `0${Math.floor(seconds / 60)}` : Math.floor(seconds / 60);
  const timerString = `${minutesToShow}:${secondsToShow}`;



  return (<div className={timerType === "pomodoro" ? "p-background red" : timerType === "short_break" ? "p-background green" : "p-background blue"} >
    <div className="p-container">
      <div className="p-title">
        <button onClick={() => setTimerType('pomodoro')} className={timerType === "pomodoro" ? "p-title-item active" : "p-title-item"}>Pomodoro</button>
        <button onClick={() => setTimerType('short_break')} className={timerType === "short_break" ? "p-title-item active" : "p-title-item"}>Short Break</button>
        <button onClick={() => setTimerType('long_break')} className={timerType === "long_break" ? "p-title-item active" : "p-title-item"}>Long Break</button>
      </div>
      <div className="p-timer">{timerString}</div>

      <div>
        <button className={timerType === "pomodoro" ? "p-button red" : timerType === "short_break" ? "p-button green" : "p-button blue"} onClick={onClickHandler}>{startTimer ? 'STOP' : 'START'}</button>
      </div>
    </div>
  </div>)
}

export default PomodoroCellRendererComponent;
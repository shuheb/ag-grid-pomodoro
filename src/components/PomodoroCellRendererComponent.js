import { useState, useEffect, useContext, memo } from 'react';
import { PomodoroContext } from '../PomodoroContext';
import { ThemeContext } from '../ThemeContext';

const PomodoroCellRendererComponent = () => {
  const [startTimer, setStartTimer] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [timerType, setTimerType] = useState("pomodoro")
  const { rowData, currentRow } = useContext(PomodoroContext);
  const themes = useContext(ThemeContext);
  const [rowInfo, setRowInfo] = useState(null);
  const { type, timeLeft } = rowInfo || '';

  useEffect(() => {
    if (currentRow !== -1) {
      setRowInfo(rowData.filter(row => row.id === currentRow)[0])
    }
  }, [currentRow, rowData])



  const onClickHandler = () => {
    setStartTimer(prev => !prev);
  }

  const secondsToShow = (timeLeft % 60) < 10 ? `0${timeLeft % 60}` : timeLeft % 60;
  const minutesToShow = Math.floor(timeLeft / 60) < 10 ? `0${Math.floor(timeLeft / 60)}` : Math.floor(timeLeft / 60);
  const timerString = `${minutesToShow}:${secondsToShow}`;


  // className={timerType === "pomodoro" ? "p-background red" : timerType === "short_break" ? "p-background green" : "p-background blue"}
  return (currentRow !== -1 && <div className="p-background" style={{ backgroundColor: themes[type] ? themes[type].background : '' }} >
    <div className="p-container">
      <div className="p-title">
        <button onClick={() => setTimerType('pomodoro')} className={timerType === "pomodoro" ? "p-title-item active" : "p-title-item"}>Pomodoro</button>
        <button onClick={() => setTimerType('short_break')} className={timerType === "short_break" ? "p-title-item active" : "p-title-item"}>Short Break</button>
        <button onClick={() => setTimerType('long_break')} className={timerType === "long_break" ? "p-title-item active" : "p-title-item"}>Long Break</button>
      </div>
      <div>current ID: {JSON.stringify(currentRow)}</div>
      {/* <div>rowData: {JSON.stringify(rowData)}</div> */}
      <div className="p-timer">{timerString}</div>

      <div>
        <button className={timerType === "pomodoro" ? "p-button red" : timerType === "short_break" ? "p-button green" : "p-button blue"} onClick={onClickHandler}>{startTimer ? 'STOP' : 'START'}</button>
      </div>
    </div>
  </div>)
}

export default PomodoroCellRendererComponent;
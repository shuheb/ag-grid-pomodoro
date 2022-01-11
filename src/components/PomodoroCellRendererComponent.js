import { useState, useEffect, useContext, memo } from 'react';
import { PomodoroContext } from '../PomodoroContext';
import { ThemeContext } from '../ThemeContext';
import ActionComponent from './ActionComponent';
import TypeComponent from './TypeComponent';

const PomodoroCellRendererComponent = () => {
  const { rowData, currentRow, changePomodoroType, startTimer, stopTimer } = useContext(PomodoroContext);
  const themes = useContext(ThemeContext);
  const [rowInfo, setRowInfo] = useState(null);
  const { type, timeLeft, id, task, timerStarted } = rowInfo ? rowInfo : '';
  useEffect(() => {
    if (currentRow !== -1) {
      setRowInfo(rowData.filter(row => row.id === currentRow)[0])
    }
  }, [currentRow, rowData])

  const secondsToShow = (timeLeft % 60) < 10 ? `0${timeLeft % 60}` : timeLeft % 60;
  const minutesToShow = Math.floor(timeLeft / 60) < 10 ? `0${Math.floor(timeLeft / 60)}` : Math.floor(timeLeft / 60);
  const timerString = `${minutesToShow}:${secondsToShow}`;


  // className={timerType === "pomodoro" ? "p-background red" : timerType === "short_break" ? "p-background green" : "p-background blue"}
  return (currentRow !== -1 &&
    <div className="p-background" style={{ backgroundColor: themes[type] ? themes[type].background : '' }} >
      <div className="p-container">
        <TypeComponent type={type} id={id} changePomodoroType={changePomodoroType} />
        <div>Currently Working on: {task}</div>
        <div>current ID: {JSON.stringify(currentRow)}</div>
        <div className="p-timer">{timerString}</div>
        <div>
          <ActionComponent background={themes[type] ? themes[type].background : ''} id={id} startTimer={startTimer} stopTimer={stopTimer} timerStarted={timerStarted} />
        </div>
      </div>
    </div>)
}

export default PomodoroCellRendererComponent;
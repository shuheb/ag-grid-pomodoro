import { useState, useEffect, useContext, memo } from 'react';
import { PomodoroContext } from '../PomodoroContext';
import ActionComponent from './ActionComponent';
import TypeComponent from './TypeComponent';


const PomodoroGridView = memo((props) => {

  const { rowData, currentRow, changePomodoroType, startTimer, stopTimer } = useContext(PomodoroContext);
  const { theme } = props;

  const [rowInfo, setRowInfo] = useState(null);
  const { type, timeLeft, id, task, timerStarted } = rowInfo ? rowInfo : '';
  const [seconds, setSeconds] = useState(25 * 60)
  useEffect(() => {
    if (currentRow !== -1) {
      setRowInfo(rowData.filter(row => row.id === currentRow)[0])
    } else {
      setRowInfo('')
    }
  }, [currentRow, rowData])
  useEffect(() => {
    if (timeLeft) {
      setSeconds(timeLeft);
    }
  }, [type]);

  useEffect(() => {
    let timer;

    if (seconds === 0) {
      stopTimer({ id });
    }
    else if (timerStarted && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prev => prev - 1)
      }, 1000);
    }

    return () => {
      if (timer) { clearInterval(timer); };
    }
  }, [seconds, timerStarted, id]);

  const secondsToShow = (seconds % 60) < 10 ? `0${seconds % 60}` : seconds % 60;
  const minutesToShow = Math.floor(seconds / 60) < 10 ? `0${Math.floor(seconds / 60)}` : Math.floor(seconds / 60);
  const timerString = `${minutesToShow}:${secondsToShow}`;

  return (<div>
    <div>Currently Working on: {task}</div>
    <div>current ID: {JSON.stringify(currentRow)}</div>
    <div style={{ fontWeight: 'bold', fontSize: 60 }}>{timerString}</div>
    <div>
      <div>FINISH: { }</div>
      <ActionComponent background={theme.background} id={id} startTimer={startTimer} stopTimer={stopTimer} timerStarted={timerStarted} currentRow={currentRow} />
    </div>
  </div>)
});

const PomodoroView = memo((props) => {
  console.log('PomodoroView', props)
  const { currentRow } = useContext(PomodoroContext);
  const { theme, type } = props;
  const [seconds, setSeconds] = useState(25 * 60);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    const timeLeft = type === "short_break" ? 5 * 60 : type === "long_break" ? 15 * 60 : 25 * 60;
    setSeconds(timeLeft)
    setTimerStarted(false);
  }, [type])

  useEffect(() => {
    let timer;

    if (seconds === 0) {
      setTimerStarted(false);
    }
    else if (timerStarted && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prev => prev - 1)
      }, 1000);
    }

    return () => {
      if (timer) { clearInterval(timer); };
    }
  }, [seconds, timerStarted]);

  const secondsToShow = (seconds % 60) < 10 ? `0${seconds % 60}` : seconds % 60;
  const minutesToShow = Math.floor(seconds / 60) < 10 ? `0${Math.floor(seconds / 60)}` : Math.floor(seconds / 60);
  const timerString = `${minutesToShow}:${secondsToShow}`;

  return (
    <div>
      <div style={{ fontWeight: 'bold', fontSize: 60 }}>{timerString}</div>
      <div>
        <div>FINISH: { }</div>
        <button onClick={() => setTimerStarted(!timerStarted)}>{timerStarted ? 'STOP' : 'START'}</button>
        {/* <ActionComponent background={theme[type] ? themes[type].background : ''} id={id} startTimer={startTimer} stopTimer={stopTimer} timerStarted={timerStarted} currentRow={currentRow} /> */}
      </div>
    </div>)
})

const PomodoroViewRenderer = memo((props) => {
  console.log('PomodoroViewRenderer')
  const { currentRow } = useContext(PomodoroContext);
  const [type, setType] = useState('pomodoro');
  const { themes } = props;

  useEffect(() => {
    if (currentRow !== -1) {
      setType('pomodoro')
    }
  }, [currentRow])

  const clickHandler = (pomodoroType) => {
    if (currentRow !== -1) {
      alert('The timer is still running, stop timer before switching.')
      return;
    }

    if (pomodoroType === 'long_break') {
      setType('long_break')
    }
    else if (pomodoroType === 'short_break') {
      setType('short_break')
    } else {
      setType('pomodoro')
    }
  }

  return (<div className="p-background" style={{ backgroundColor: themes[type].background }} >
    <div className="p-container">
      <div className="p-title">
        <button onClick={() => clickHandler('pomodoro')} className={type === "pomodoro" ? "p-title-item active" : "p-title-item"}>Pomodoro</button>
        <button onClick={() => clickHandler('short_break')} className={type === "short_break" ? "p-title-item active" : "p-title-item"}>Short Break</button>
        <button onClick={() => clickHandler('long_break')} className={type === "long_break" ? "p-title-item active" : "p-title-item"}>Long Break</button>
      </div>
      {currentRow !== -1 ? <PomodoroGridView theme={themes[type]} /> : <PomodoroView theme={themes[type]} type={type} />}
    </div>
  </div>)
})

export default PomodoroViewRenderer;
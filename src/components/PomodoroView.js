import { useState, useEffect, useContext, memo } from 'react';
import { PomodoroContext } from '../PomodoroContext';
import ActionComponent from './ActionComponent';
import TypeComponent from './TypeComponent';

const PomodoroView = memo((props) => {
  const { rowData, currentRow, changePomodoroType, startTimer, stopTimer } = useContext(PomodoroContext);
  const {themes} = props;

  const [rowInfo, setRowInfo] = useState(null);
  const { type, timeLeft, id, task, timerStarted } = rowInfo ? rowInfo : '';
  const[seconds, setSeconds] = useState(timeLeft)
  useEffect(() => {
    if (currentRow !== -1) {
      console.log('CALLING USE EFFECT',rowData.filter(row => row.id === currentRow)[0])
      setRowInfo(rowData.filter(row => row.id === currentRow)[0])
    } else {
      setRowInfo('')
    }
  }, [currentRow, rowData])
  useEffect(() => {
    setSeconds(timeLeft);
  },[type]);

console.log(currentRow,timeLeft)
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

if(currentRow === -1) {
  return (<div>hello</div>)
}
  return (
    <div className="p-background" style={{ backgroundColor: themes[type] ? themes[type].background : '' }} >
      <div className="p-container">
        <TypeComponent type={type} id={id} changePomodoroType={changePomodoroType} />
        <div>Currently Working on: {task}</div>
        <div>current ID: {JSON.stringify(currentRow)}</div>
        <div style={{fontWeight:'bold', fontSize: 60}}>{timerString}</div>
        <div>
          <div>FINISH: {}</div>
          <ActionComponent background={themes[type] ? themes[type].background : ''} id={id} startTimer={startTimer} stopTimer={stopTimer} timerStarted={timerStarted} currentRow={currentRow} />
        </div>
      </div>
    </div>)
})

export default PomodoroView;
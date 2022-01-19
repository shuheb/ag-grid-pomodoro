import { useState, useEffect, useContext, memo } from 'react';
import { PomodoroContext } from '../PomodoroContext';

/*
const PomodoroGridView = memo((props) => {

  const { rowData, currentRow, changePomodoroType, startTimer, stopTimer } = useContext(PomodoroContext);
  const { theme } = props;

  const [rowInfo, setRowInfo] = useState(null);
  const { type, timeLeft, id, task, timerStarted, completed } = rowInfo ? rowInfo : '';
  const [seconds, setSeconds] = useState(25 * 60)
  useEffect(() => {
    if (currentRow !== -1) {
      setRowInfo(rowData.filter(row => row.id === currentRow)[0])
    } else {
      setRowInfo('')
    }
  }, [currentRow, rowData])

  useEffect(() => {
    if (completed) {
      props.setCompleted();
    }
  }, [completed])
  useEffect(() => {
    if (timeLeft) {
      setSeconds(timeLeft);
    }
  }, [type]);

  useEffect(() => {
    let timer;

    if (seconds === 0) {
      // stopTimer({ id });
    }
    else if (timerStarted && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prev => prev - 1)
      }, 1000);
    }

    return () => {
      if (timer) { clearInterval(timer); };
    }
  }, [timerStarted, id]);

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
        <ActionComponent background={theme[type] ? themes[type].background : ''} id={id} startTimer={startTimer} stopTimer={stopTimer} timerStarted={timerStarted} currentRow={currentRow} />
      </div>
    </div>)
})

const PomodoroViewRenderer = memo((props) => {
  console.log('PomodoroViewRenderer')
  const { currentRow, completed } = useContext(PomodoroContext);
  const [type, setType] = useState('pomodoro');
  const { themes } = props;



  // useEffect(() => {
  //   if(completed) {
  //     setType('completed')
  //   }
  // }, [completed])

  useEffect(() => {
    if (currentRow !== -1) {
      setType('pomodoro')
    } else {
      if (type === 'completed') {
        setType('pomodoro')
      }
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
  // console.log(themes[type].background)
  return (<div className="p-background" style={{ backgroundColor: themes[type].background }} >
    <div className="p-container">
      <div className="p-title">
        <button onClick={() => clickHandler('pomodoro')} className={type === "pomodoro" ? "p-title-item active" : "p-title-item"}>Pomodoro</button>
        <button onClick={() => clickHandler('short_break')} className={type === "short_break" ? "p-title-item active" : "p-title-item"}>Short Break</button>
        <button onClick={() => clickHandler('long_break')} className={type === "long_break" ? "p-title-item active" : "p-title-item"}>Long Break</button>
      </div>
      {currentRow !== -1 ? <PomodoroGridView theme={themes[type]} setCompleted={() => setType('completed')} /> : <PomodoroView theme={themes[type]} type={type} />}
    </div>
  </div>)
})

const GridTimer = memo((props) => {

  const { rowData, currentRow } = useContext(PomodoroContext);
  const { theme } = props;

  const [rowInfo, setRowInfo] = useState(null);
  const { type, timeLeft, id, task, timerStarted, completed } = rowInfo ? rowInfo : '';
  const [seconds, setSeconds] = useState(25 * 60)
  useEffect(() => {
    if (currentRow !== -1) {
      setRowInfo(rowData.filter(row => row.id === currentRow)[0])
    } else {
      setRowInfo('')
    }
  }, [currentRow, rowData])

  useEffect(() => {
    if (completed) {
      props.setCompleted();
    }
  }, [completed])
  useEffect(() => {
    if (timeLeft) {
      setSeconds(timeLeft);
    }
  }, [type]);

  useEffect(() => {
    let timer;

    if (seconds === 0) {
      // stopTimer({ id });
    }
    else if (timerStarted && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prev => prev - 1)
      }, 1000);
    }

    return () => {
      if (timer) { clearInterval(timer); };
    }
  }, [timerStarted, id]);

  const secondsToShow = (seconds % 60) < 10 ? `0${seconds % 60}` : seconds % 60;
  const minutesToShow = Math.floor(seconds / 60) < 10 ? `0${Math.floor(seconds / 60)}` : Math.floor(seconds / 60);
  const timerString = `${minutesToShow}:${secondsToShow}`;

  return (<div>
    <div>Currently Working on: {task}</div>
    <div>current ID: {JSON.stringify(currentRow)}</div>
    <div style={{ fontWeight: 'bold', fontSize: 60 }}>{timerString}</div>
  </div>)
})
*/

const NormalTimer = memo((props) => {
  const { pomodoroType, stopTimer, startTimer } = props;
  const { timeLeft, id, task, timerStarted, completed } = props.value || '';

  const [seconds, setSeconds] = useState(25 * 60);
  const [stateTimerStarted, setStateTimerStarted] = useState(false);

  useEffect(() => {
    if (timerStarted !== undefined) {
      setStateTimerStarted(timerStarted)
    }
  }, [timerStarted])

  useEffect(() => {
    if (timeLeft !== undefined) {
      console.log('setting new seconds', timeLeft)
      setSeconds(timeLeft);
    }
  }, [timeLeft])

  /* this is to reset the timer if:
  - a timer has reached 0 seconds i.e. completed=true
  - a task from the grid is not being run, therefore we show the default timer
  */
  useEffect(() => {
    if (!timeLeft || completed) {
      const newSeconds = pomodoroType === "short_break" ? 5 * 60 : pomodoroType === "long_break" ? 15 * 60 : 25 * 60;
      setSeconds(newSeconds)
      // setStateTimerStarted(false);
    }
  }, [pomodoroType])

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
  }, [stateTimerStarted]);

  useEffect(() => {
    if (seconds === 0) {
      setStateTimerStarted(false);
    }
  }, [seconds])


  const secondsToShow = (seconds % 60) < 10 ? `0${seconds % 60}` : seconds % 60;
  const minutesToShow = Math.floor(seconds / 60) < 10 ? `0${Math.floor(seconds / 60)}` : Math.floor(seconds / 60);
  const timerString = `${minutesToShow}:${secondsToShow}`;

  return (
    <div
      style={{ fontWeight: 'bold', fontSize: 60 }}
    >
      <div>{timerString}</div>
      <div>
        <button
          className='p-button'
          onClick={() => {
            if (id) {
              stateTimerStarted ? stopTimer({ id }) : startTimer({ id })
            }
            setStateTimerStarted(!stateTimerStarted);

          }}>
          {stateTimerStarted ? "STOP" : "START"}
        </button>
      </div>
    </div>
  )
})

const PomodoroViewRenderer = memo((props) => {
  // console.log('PomodoroViewRenderer')F
  const { currentRow, rowData, removeCurrentTimer, stopTimer, startTimer } = useContext(PomodoroContext);
  const [rowInfo, setRowInfo] = useState(null);
  const [pomodoroType, setPomodoroType] = useState('short_break');
  const { timeLeft, id, task, timerStarted, completed } = rowInfo ? rowInfo : {};
  const { themes } = props;

  // use case: when timer has finished, move to short_break tyoe
  useEffect(() => {
    if (completed) {
      console.log('removingCurrentTimer and setting long_break')
      removeCurrentTimer({ id });
      setPomodoroType('long_break')

    }
  }, [completed])

  useEffect(() => {
    console.log('resetting setRowInfo', currentRow)
    if (currentRow !== -1) {
      setRowInfo(rowData.filter(row => row.id === currentRow)[0])
    } else {
      setRowInfo({})
    }
  }, [currentRow, rowData]);

  // use case: when we are looking at a grid timer, always start with pomodoro, otherwise
  // if user is looking at short/long break, that style will stay
  useEffect(() => {
    if (currentRow !== -1) {
      setPomodoroType('pomodoro')
    }
  }, [currentRow])

  const clickHandler = (pomodoroType) => {
    if (timerStarted) {
      alert('The timer is still running, stop timer before switching.')
      return;
    }

    if (pomodoroType === 'long_break') {
      setPomodoroType('long_break')
    }
    else if (pomodoroType === 'short_break') {
      setPomodoroType('short_break')
    } else if (pomodoroType === 'pomodoro') {
      setPomodoroType('pomodoro')
    }
  }
  const value = { timeLeft, id, task, timerStarted, completed };
  // console.log(themes[type].background)
  // console.log('rowinfo=',{ timeLeft, id, task, timerStarted, completed })
  return (<div className="p-background" style={{ backgroundColor: themes[pomodoroType].background, height: '400px' }} >
    <div className="p-container">
      <div className="p-title">
        <button onClick={() => clickHandler('pomodoro')} className={pomodoroType === "pomodoro" ? "p-title-item active" : "p-title-item"}>Pomodoro</button>
        <button onClick={() => clickHandler('short_break')} className={pomodoroType === "short_break" ? "p-title-item active" : "p-title-item"}>Short Break</button>
        <button onClick={() => clickHandler('long_break')} className={pomodoroType === "long_break" ? "p-title-item active" : "p-title-item"}>Long Break</button>
      </div>
      <div style={{ fontWeight: 'bold', fontSize: 26 }}>Working on: {task}</div>
      <div>{currentRow}</div>
      <NormalTimer value={value} pomodoroType={pomodoroType} stopTimer={stopTimer} startTimer={startTimer} />
      {/* <GridTimer /> */}
    </div>
  </div>)
})
export default PomodoroViewRenderer;
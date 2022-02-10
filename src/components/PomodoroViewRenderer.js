import { Alert, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState, useEffect, useContext, memo } from 'react';
import { PomodoroContext } from '../PomodoroContext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

const EndTimeComponent = memo((props) => {
  const { pomodoroType, buttonColor, timerStarted, setTimerStarted, stopTimer, startTimer, id } = props;
  const endTime = new Date();
  const endTimeDelta = pomodoroType === "pomodoro" ? 1500 : pomodoroType === "short_break" ? 300 : 900;
  endTime.setMinutes(endTime.getMinutes() + Math.round(endTimeDelta / 60));
  var hours = endTime.getHours();
  var minutes = endTime.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return (<div style={{ display: 'flex', paddingLeft:'15px' }}>
    <Button disableElevation
      sx={{
        backgroundColor: 'white',
        color: buttonColor,
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: '#00000014',
          color: 'white'
        },
      }}
      onClick={() => {
        if (id) {
          timerStarted ? stopTimer({ id }) : startTimer({ id })
        }
        setTimerStarted(!timerStarted);

      }}
      startIcon={timerStarted ? <StopIcon fontSize='medium' /> : <PlayArrowIcon fontSize='medium' />}
      variant="contained">{timerStarted ? "STOP" : "START"}</Button>
    {/*
    <button
      className='p-button'
      style={{ color: buttonColor }}
      onClick={() => {
        if (id) {
          timerStarted ? stopTimer({ id }) : startTimer({ id })
        }
        setTimerStarted(!timerStarted);

      }}>
      {timerStarted ? "STOP" : "START"}
    </button>
    */}
    <div style={{ marginLeft: 'auto' }}>
      <span style={{
        color: 'white',

        fontSize: 20
      }}>
        end time
        <span style={{
          fontWeight: 'bold',
          fontSize: 30
        }}>
          {` ${hours}:${minutes}${ampm}`}
        </span>
      </span>
    </div></div>)
})

const NormalTimer = memo((props) => {
  const { pomodoroType, stopTimer, startTimer, theme } = props;
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
      setStateTimerStarted(false);
    }

    // if timeLeft exists, then a task from the grid is active.
    // if short_break / long_break is selected, reset timer to adjust for this
    // otherwise, 
    if (timeLeft) {
      const newSeconds = pomodoroType === "short_break" ? 5 * 60 : pomodoroType === "long_break" ? 15 * 60 : timeLeft;
      setSeconds(newSeconds)
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
    <div>
      <div style={{ color: 'white', fontWeight: 'bold', fontSize: 90, padding: '30px 0px' }}>{timerString}</div>
      <EndTimeComponent
        buttonColor={theme.background}
        timerStarted={stateTimerStarted}
        setTimerStarted={(prev) => setStateTimerStarted(prev)}
        stopTimer={stopTimer}
        id={id}
        startTimer={startTimer}
        pomodoroType={pomodoroType} />
    </div>
  )
})

const MessageComponent = memo((props) => {

  const { pomodoroType, theme, task, id } = props;

  const isPomodoroTask = pomodoroType === "pomodoro";

  const emoji = isPomodoroTask ? '📌' : '🕺';

  return (<div className='task-container' >
    <div
      style={{
        color: theme.background,
        fontSize: 20,
      }}>

      <span style={{
        fontSize: 30,
        paddingRight: '5px'
      }}>
        {emoji}
      </span>
      {isPomodoroTask ?
        <span >
          <span
            style={{
              fontWeight: 'bold',
              fontSize: 24
            }}
          >
            {task ? "Working on" : "Time to work!"}
          </span>
          {task && (<div
          >
            {task}
          </div>)}
        </span> :
        <span
          style={{
            fontWeight: 'bold',
            fontSize: 24
          }}>Time for a break!</span>}
      {/* <div>id: {id}</div> */}
    </div>
  </div >)
});

const TypeButtonComponent = memo((props) => {

  const { timerStarted, pomodoroType, setPomodoroType } = props;
  const [showAlert, setShowAlert] = useState(false);

  const onChange = (event, newValue) => {
    if (!newValue) return;
    if (timerStarted) {
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false)
      }, 3000)
      return;
    }
    setPomodoroType(newValue);
  }
  return (
    <div style={{ paddingBottom: 15 }}>
      <ToggleButtonGroup
        sx={{

          '& .MuiToggleButton-root': { color: 'white !important' },
          // '& > :not(style) + :not(style)': { mt: 2 },
        }}
        value={pomodoroType}
        exclusive

        onChange={onChange}
      >
        <ToggleButton value="pomodoro">Pomodoro</ToggleButton>
        <ToggleButton value="short_break">Short Break</ToggleButton>
        <ToggleButton value="long_break">Long Break</ToggleButton>
      </ToggleButtonGroup>
      {/* <div className="p-title">
        <button onClick={() => clickHandler('pomodoro')} className={pomodoroType === "pomodoro" ? "p-title-item active" : "p-title-item"}>Pomodoro</button>
        <button onClick={() => clickHandler('short_break')} className={pomodoroType === "short_break" ? "p-title-item active" : "p-title-item"}>Short Break</button>
        <button onClick={() => clickHandler('long_break')} className={pomodoroType === "long_break" ? "p-title-item active" : "p-title-item"}>Long Break</button>
      </div> */}
      {showAlert && <div style={{ paddingTop: 15 }}><Alert severity="warning">The timer is still running. - stop timer before switching</Alert></div>}
    </div>
  )

})

const PomodoroViewRenderer = memo((props) => {
  // console.log('PomodoroViewRenderer')
  const { currentRow, rowData, removeCurrentTimer, stopTimer, startTimer } = useContext(PomodoroContext);
  const [rowInfo, setRowInfo] = useState(null);
  const [pomodoroType, setPomodoroType] = useState('short_break');
  const { timeLeft, id, task, taskNo, timerStarted, completed } = rowInfo ? rowInfo : {};
  const { themes } = props;

  // use case: when timer has finished, move to short_break tyoe
  useEffect(() => {
    if (completed) {
      removeCurrentTimer({ id });
      setPomodoroType('long_break')

    }
  }, [completed])

  useEffect(() => {
    if (id && (pomodoroType === "long_break" || pomodoroType === "short_break")) {


      removeCurrentTimer({ id });
      // setRowInfo({})
    }
  }, [pomodoroType])

  useEffect(() => {

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
    // if (timerStarted) {
    //   setShowAlert(true);

    //   setTimeout(() => {
    //     setShowAlert(false)
    //   }, 3000)
    //   // alert('The timer is still running, stop timer before switching.')
    //   return;
    // }

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
  return (<div className="p-background" style={{ backgroundColor: themes[pomodoroType].background }} >
    <div className="p-container">
      <TypeButtonComponent timerStarted={timerStarted} pomodoroType={pomodoroType} setPomodoroType={(type) => setPomodoroType(type)} />

      <MessageComponent pomodoroType={pomodoroType} id={id} theme={themes[pomodoroType]} task={task ? `${task} (${taskNo})` : undefined} />
      <NormalTimer value={value} pomodoroType={pomodoroType} stopTimer={stopTimer} startTimer={startTimer} theme={themes[pomodoroType]} />
      {/* <GridTimer /> */}
    </div>

  </div>)
})
export default PomodoroViewRenderer;
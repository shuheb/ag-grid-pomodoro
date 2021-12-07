
import { useState, useEffect } from 'react';
import './App.scss';

import { AgGridReact } from 'ag-grid-react';

// TO DO: restructure the grid into the following columns:
// task name, priority, start time, end time, type of pomodoro, timer, progress, 

// TO DO:
// use context: show the current pomodoro task as a timer 
// theming 
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

function App() {
  const rowData = [
    { pomodoroComponent: true },
    { make: "Porsche", model: "Boxter", price: 72000 },
    {},
    {}
  ];
  // task name, priority, start time, end time, type of pomodoro, timer, progress
  const columnDefs = [
    {
      field: "task",
    },
    {
      field: "action", 
    },
    {
      field: "timer",
    }, 
    {
      field:"start_time"
    },
    {
      field:"end_time"
    },
    {field:'type'},
    {field:'progress'}
  ];

  const defaultColDef = { flex: 1, filter: true, sortable: true }
  return (
    <div className="grid-container">
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          reactUi={true}
          // getRowHeight={params => {

          //  if(params.node.rowIndex == 1) {
          //    return 300;
          //  }
          // }}
          frameworkComponents={{
            'pomodoroComponent': PomodoroCellRendererComponent
          }}
        >
        </AgGridReact>
      </div>
    </div>
  );
}



export default App;

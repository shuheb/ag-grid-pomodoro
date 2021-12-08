
import { useState, useEffect,memo } from 'react';
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

const PomodoroActionComponent = memo((props) => {
  const type = props.node.data.type || 'pomodoro';

  const doesTaskExist = props.node.data.task
  const [startTimer, setStartTimer] = useState(false);

  const [timerType, setTimerType] = useState(type)

  const onClickHandler = () => {
    setStartTimer(prev => !prev);
    if(startTimer){
    let data = props.node.data;

    props.node.setData({ ...data, timerStarted: false })
    } else {
      let data = props.node.data;

    props.node.setData({ ...data, timerStarted: true })
    }
  }

  const button = <button className={timerType === "pomodoro" ? "p-button red" : timerType === "short_break" ? "p-button green" : "p-button blue"} onClick={onClickHandler}>{startTimer ? 'STOP' : 'START'}</button>;

  const userInterface = doesTaskExist ? button : null;
  return (userInterface)
});

const PomodoroTypeComponent = memo(props => {
  const type = props.node.data.type || "pomodoro";
  const doesTaskExist = props.node.data.task
  const [timerType, setTimerType] = useState(type);

  


  useEffect(() => {
    if (type !== timerType) {
      let data = props.node.data;
      props.node.setData({ ...data, type: timerType })
    }
  }, [timerType]);



  const uiToShow = <div className="p-title">
    <button onClick={() => setTimerType('pomodoro')} className={timerType === "pomodoro" ? "p-title-item active" : "p-title-item"}>Pomodoro</button>
    <button onClick={() => setTimerType('short_break')} className={timerType === "short_break" ? "p-title-item active" : "p-title-item"}>Short Break</button>
    <button onClick={() => setTimerType('long_break')} className={timerType === "long_break" ? "p-title-item active" : "p-title-item"}>Long Break</button>
  </div>;

  const showUi = doesTaskExist ? uiToShow : null;

  return (showUi)
})

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
  },[timerStarted])

  // useEffect(()=> {
  //   console.log('useeffect empty')
  //   if(!timerStarted) {
  //     setStartTimer(false)
  //   } else {
  //     setStartTimer(true)
  //   }
  // },[])

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


  return (<div>{timerString}</div>)
});

function App() {
  const [rowData, setRowData] = useState([
    { id: 1, timerStarted:false}
  ]);
  // task name, priority, start time, end time, type of pomodoro, timer, progress
  const columnDefs = [
    {
      field: "task",
      editable: true,
      cellClassRules: {
        'red-cell': ({ node }) => {
          if (node.data.type === "pomodoro") {
            return true;
          }
        },
        'gray-cell': ({ node }) => {
          if (node.data.task) {
            return false;
          } else {
            return true;
          }
        }
      },
      valueFormatter: ({ value }) => {
        if (!value) { return 'enter value...' }
      },
      onCellValueChanged: params => {
        if (params.oldValue !== params.newValue) {
          let data = params.node.data;
          params.node.setData({ ...data, type: 'pomodoro' })
          // params.api.applyTransaction({update:[{...data, type:'pomodoro'}]})
          // let newStore = rowData.map(row => {
          //   if (row.id == params.data.id) {
          //     return { ...row, type: 'pomodoro' }
          //   }
          // });
          // setRowData(newStore);
          // params.api.setRowData(newStore)

        }
      }
    },
    {
      field: "action",
      autoHeight: true,
      cellClassRules: {
        'red-cell': ({ node }) => {
          if (node.data.type === "pomodoro") {
            return true;
          }
        }
      },
      cellRendererFramework: PomodoroActionComponent
    },
    {
      field: "timer",
      cellRendererFramework: PomodoroTimerComponent
    },
    {
      field: "start_time"
    },
    {
      field: "end_time"
    },
    {
      field: 'type', minWidth: 350, cellRendererFramework: PomodoroTypeComponent,
      autoHeight: true,
      cellClassRules: {
        'red-cell': ({ node }) => {
          if (node.data.type === "pomodoro") {
            return true;
          }
        }
      }
    },
    { field: 'progress', }
  ];

  const defaultColDef = { flex: 1, filter: true, sortable: true }
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <PomodoroCellRendererComponent />
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          reactUi={true}
          // immutableData={true}
          getRowNodeId={data => data.id}
          rowClassRules={{
            'red': ({ node }) => {
              if (node.data.type === "pomodoro") {
                return true;
              }
            },
            'green': ({ node }) => {
              if (node.data.type === "short_break") {
                return true;
              }
            },
            'blue': ({ node }) => {
              if (node.data.type === "long_break") {
                return true;
              }
            }
          }}
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

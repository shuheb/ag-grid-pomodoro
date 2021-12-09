
import { useState, useEffect, memo } from 'react';
import './App.scss';

import { AgGridReact } from 'ag-grid-react';
import PomodoroActionComponent from './components/PomodoroActionComponent';
import PomodoroTypeComponent from './components/PomodoroTypeComponent';
import PomodoroTimerComponent from './components/PomodoroTimerComponent';
import PomodoroCellRendererComponent from './components/PomodoroCellRendererComponent';
// TO DO: restructure the grid into the following columns:
// task name, priority, start time, end time, type of pomodoro, timer, progress, 

// TO DO:
// use context: show the current pomodoro task as a timer 
// theming 

function App() {
  const [rowData, setRowData] = useState([
    { id: 1, timerStarted: false }
  ]);
  // task name, priority, start time, end time, type of pomodoro, timer, progress
  const columnDefs = [
    {
      field: "task",
      editable: true,
      cellClassRules: {
        'shade-cell': ({ node }) => {
          if (node.data.type === "pomodoro" || node.data.type === "short_break" || node.data.type === "long_break") {
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
      // autoHeight: true,
      cellClassRules: {
        'shade-cell': ({ node }) => {
          if (node.data.type === "pomodoro" || node.data.type === "short_break" || node.data.type === "long_break") {
            return true;
          }
        },
      },
      cellRendererFramework: PomodoroActionComponent
    },
    {
      field: "timer",
      cellRendererFramework: PomodoroTimerComponent
    },
    {
      headerName: "Start Time",
      field: "start_time",
      valueFormatter: params => {
        // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
        if (params.value) {
          const date = params.value[0];
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? `0${minutes}`: minutes;
          // var strTime = hours + ':' + minutes + ' ' + ampm;
          return `${hours}:${minutes} ${ampm}`;
          // return `${}`
        }
      }
    },
    {
      field: "end_time",
      
    },
    {
      field: 'type', minWidth: 350, cellRendererFramework: PomodoroTypeComponent,
      // autoHeight: true,
      cellClassRules: {
        'shade-cell': ({ node }) => {
          if (node.data.type === "pomodoro" || node.data.type === "short_break" || node.data.type === "long_break") {
            return true;
          }
        },
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

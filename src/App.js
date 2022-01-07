
import { useContext } from 'react';
import './App.scss';

import { AgGridReact } from 'ag-grid-react';
import PomodoroActionComponent from './components/PomodoroActionComponent';
import PomodoroTypeComponent from './components/PomodoroTypeComponent';
import PomodoroTimerComponent from './components/PomodoroTimerComponent';
import PomodoroCellRendererComponent from './components/PomodoroCellRendererComponent';
import { PomodoroContext } from './PomodoroContext';
import StatusBar from './components/StatusBar';
import 'ag-grid-enterprise';

function App(props) {
  const { rowData, updateTaskName } = useContext(PomodoroContext);

  // task name, priority, start time, end time, type of pomodoro, timer, progress
  const columnDefs = [
    { field: 'id' },
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
          updateTaskName({ id: params.data.id, task: params.newValue })
        }
      }
    },
    {
      field: "action",
      cellRendererSelector: ({ data }) => {
        const actionComponent = {
          frameworkComponent: PomodoroActionComponent
        };
        if (data.task) {
          return actionComponent;
        }

        return undefined;
      },
      cellClassRules: {
        'shade-cell': ({ node }) => {
          if (node.data.type === "pomodoro" || node.data.type === "short_break" || node.data.type === "long_break") {
            return true;
          }
        },
      },
    },
    {
      field: "timer",
      cellRendererSelector: ({ data }) => {
        const timerComponent = {
          frameworkComponent: PomodoroTimerComponent
        };
        if (data.task) {
          return timerComponent;
        }

        return undefined;
      },
    },
    // {
    //   headerName: "Start Time",
    //   field: "start_time",
    //   valueFormatter: params => {
    //     // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
    //     if (params.value) {
    //       const date = params.value
    //       var hours = date.getHours();
    //       var minutes = date.getMinutes();
    //       var ampm = hours >= 12 ? 'pm' : 'am';
    //       hours = hours % 12;
    //       hours = hours ? hours : 12; // the hour '0' should be '12'
    //       minutes = minutes < 10 ? `0${minutes}`: minutes;
    //       // var strTime = hours + ':' + minutes + ' ' + ampm;
    //       return `${hours}:${minutes} ${ampm}`;
    //       // return `${}`
    //     }
    //   }
    // },
    // {
    //   headerName:'End Time',
    //   field: "end_time",
    //   valueGetter: params => {
    //     if(params.data.start_time) {
    //       const date = params.data.start_time;
    //       date.setMinutes(date.getMinutes() + 25);
    //       var hours = date.getHours();
    //       var minutes = date.getMinutes();
    //       var ampm = hours >= 12 ? 'pm' : 'am';
    //       hours = hours % 12;
    //       hours = hours ? hours : 12; // the hour '0' should be '12'
    //       minutes = minutes < 10 ? `0${minutes}`: minutes;
    //       // var strTime = hours + ':' + minutes + ' ' + ampm;
    //       return `${hours}:${minutes} ${ampm}`;
    //       // return `${}`
    //     }
    //   },
    // },
    {
      field: 'type', minWidth: 350, 
      cellRendererSelector: ({ data }) => {
        const typeComponent = {
          frameworkComponent: PomodoroTypeComponent
        };
        if (data.task) {
          return typeComponent;
        }

        return undefined;
      },
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

  const defaultColDef = { flex: 1, filter: true, sortable: true };

  return (
    <div style={{ height: '60%', width: '100%' }}>
      <PomodoroCellRendererComponent />
      <button onClick={() => console.log(rowData)}>log out data from store</button>
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        <AgGridReact
          rowData={rowData.map((it) => ({ ...it }))}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          reactUi={true}
          immutableData={true}

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
          statusBar={{
            statusPanels: [
              {
                statusPanelFramework: StatusBar,
                key: 'statusBarKey',
                align: 'left'
              },
              {
                statusPanel: 'agAggregationComponent',
                statusPanelParams: {
                  aggFuncs: ['count', 'sum'],
                },
              },
            ]
          }}
        >
        </AgGridReact>
      </div>
    </div>
  );
}



export default App;

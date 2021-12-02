
import { useState, useEffect } from 'react';
import './App.scss';

import { AgGridReact } from 'ag-grid-react';



const PomodoroCellRendererComponent = props => {
const [seconds,setSeconds] = useState(25*60);

const [start, setStarted] = useState(false);

useEffect(() => {
  let timer;
  if(start) {
    timer = setInterval(() => {
      setSeconds(prev => prev - 1);
    },1000)
  }

  return () => {
    console.log('clean up',timer)
  }
},[start])


const startTimer = () => {
  setStarted(true)
}

  return (
  <div className="pomodoro-container" style={{ display:'flex',height:'100%', width:'100%'}}>
    <div className="pomodoro-title">
      <div>Pomodoro</div>
      <div>Short Break</div>
      <div>Long Break</div>
    </div>
    <div style={{ height: '70px', fontSize:'50px', marginTop:'20px', fontWeight:'bold', textAlign:'center'}}>
      {seconds/60}:{seconds%60}
    </div>
    <button style={{}} onClick={startTimer}>START</button>
  </div>)
}


function App() {
  const rowData = [
    { model: "Celica", },
    { model: "Mondeo", },
    { make: "Porsche", model: "Boxter", price: 72000 }
  ];

  const columnDefs = [
    {
      field: "make"
    },
    {
      field: "model", headerName: 'Pomofocus', cellRendererSelector: params => {
        console.log(params.rowIndex)
        if(params.rowIndex == 1) {
          return {
            component:'pomodoroComponent'
          }
          return undefined;
        }
      }
    },
    {
      field: "price"
    }];

  const defaultColDef = { flex: 1, filter: true, sortable: true }
  return (
    <div className="grid-container">
      <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          reactUi="true"
          getRowHeight={params => {

           if(params.node.rowIndex == 1) {
             return 300;
           }
          }}
          frameworkComponents={{
            'pomodoroComponent':PomodoroCellRendererComponent
          }}
         >
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;

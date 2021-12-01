import logo from './logo.svg';
import './App.scss';
import {AgGridReact} from 'ag-grid-react';
function App() {
  const rowData = [
    {make: "Toyota", model: "Celica", price: 35000},
    {make: "Ford", model: "Mondeo", price: 32000},
    {make: "Porsche", model: "Boxter", price: 72000}
];

const columnDefs = [{field:"make"},{field:"model"},{field:"price"}]

return (
  <div className="grid-container">
    <div className="ag-theme-alpine" style={{ height: '500px', width: '100%'}}>
        <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}>
        </AgGridReact>
    </div>
    </div>
);
}

export default App;

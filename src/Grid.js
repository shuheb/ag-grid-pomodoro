
import React, { useContext, useRef, memo } from 'react';
import './App.scss';

import { AgGridReact } from 'ag-grid-react';
import ActionCellRenderer from './components/cell-renderers/ActionCellRenderer';
import TimerCellRenderer from './components/cell-renderers/TimerCellRenderer';
import { PomodoroContext } from './PomodoroContext';
import FullWidthRenderer from './components/FullWidthRenderer';


function Grid(props) {
    const { themes } = props;
    const { rowData, updateTaskName } = useContext(PomodoroContext);

    // task name, priority, start time, end time, type of pomodoro, timer, progress
    const columnDefs = [
        // { field: 'id' },
        {
            field: "action",
            cellRendererSelector: ({ data }) => {
                return data.task ? { component: ActionCellRenderer, params: { themes } } : undefined;
            },
            maxWidth: 200,
            cellStyle: {
                backgroundColor: '#ffffff1a',
                fontWeight: 'bold',
                fontSize: '24px'
            },
        },
        {
            field: "task",
            // editable: true,


            valueFormatter: (params) => {
                // if (!value) { return 'enter value...' }
                if (params.data.taskNo) {
                    return `${params.value} (${params.data.taskNo})`
                }
                return params.value;
            },
            // onCellValueChanged: params => {
            //     if (params.oldValue !== params.newValue) {
            //         updateTaskName({ id: params.data.id, task: params.newValue })
            //     }
            // }
        },

        {
            field: "timer",
            maxWidth: 150,
            valueGetter: ({ data }) => data.timeLeft,
            sort: 'asc',
            cellRendererSelector: ({ data }) => {
                return data.task ? { component: TimerCellRenderer, params: {} } : undefined;
            },
        },
        {
            headerName: "Start Time",
            field: "start_time",
            maxWidth: 150,
            valueGetter: params => {
                if (params.data.timerStarted) {
                    return new Date();
                }
            },
            valueFormatter: params => {
                // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
                if (params.value && params.data.timerStarted) {
                    const date = params.value
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    var ampm = hours >= 12 ? 'pm' : 'am';
                    hours = hours % 12;
                    hours = hours ? hours : 12; // the hour '0' should be '12'
                    minutes = minutes < 10 ? `0${minutes}` : minutes;
                    return `${hours}:${minutes} ${ampm}`;
                }
            }
        },
        {
            headerName: 'End Time',
            field: "end_time",
            maxWidth: 150,
            valueGetter: params => {
                const startTime = params.getValue('start_time');
                if (startTime) {
                    const date = startTime;
                    const newDate = new Date(date);
                    newDate.setMinutes(date.getMinutes() + Math.round(params.data.timeLeft / 60));
                    var hours = newDate.getHours();
                    var minutes = newDate.getMinutes();
                    var ampm = hours >= 12 ? 'pm' : 'am';
                    hours = hours % 12;
                    hours = hours ? hours : 12; // the hour '0' should be '12'
                    minutes = minutes < 10 ? `0${minutes}` : minutes;
                    return `${hours}:${minutes} ${ampm}`;
                }
            },
        },
        // {
        //     headerName: 'Pomodoro Actions',
        //     field: 'completed',
        //     minWidth: 300,
        //     cellRendererSelector: ({ data }) => {
        //         return data.task ? { component: PomodoroActionsRenderer, params: { themes } } : undefined;
        //     },
        //     cellStyle: {
        //         backgroundColor: '#ffffff1a',
        //         fontWeight: 'bold',
        //         fontSize: '24px'
        //     },
        // },
        // {
        //     field: 'type', minWidth: 350,
        //     cellRendererSelector: ({ data }) => {
        //         return data.task ? { component: TypeCellRenderer, params: {} } : undefined;
        //     },
        //     cellClassRules: {
        //         'shade-cell': ({ node }) => {
        //             if (node.data.type === "pomodoro" || node.data.type === "short_break" || node.data.type === "long_break") {
        //                 return true;
        //             }
        //         },
        //     }
        // },
    ];

    const defaultColDef = { flex: 1, filter: true, sortable: true };

    const getRowStyle = params => {
        const { completed } = params.data;
        if (!params.node.isRowPinned()) {


            if (completed) {
                const { background, foreground } = themes['completed'];

                return { backgroundColor: background, color: foreground }
            } else {
                const { background, foreground } = themes['pomodoro'];
                return { backgroundColor: background, color: foreground }
                /*
                const { background, foreground } = themes[type];
                switch (type) {
                    case 'pomodoro':
                        return { backgroundColor: background, color: foreground }
                    case 'short_break':
                        return { backgroundColor: background, color: foreground }
                    case 'long_break':
                        return { backgroundColor: background, color: foreground }
                    default:
                        return;

                }
                */
            }
        } else {

            // const { background, foreground } = themes['long_break'];
            // console.log('applying', background, foreground)
            // return { backgroundColor: background, color: foreground }
        }



    }

    const gridRef = useRef();

    return (
        <div style={{ height: '50%', width: '100%' }}>
            {/* <button onClick={() => {
                // gridRef.current.api.forEachNode(node => console.log(node))
                console.log(rowData);
            }}>log out data</button> */}
            <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    ref={gridRef}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    immutableData={true}
                    fullWidthCellRenderer={FullWidthRenderer}
                    fullWidthCellRendererParams={{ themes }}
                    isFullWidthCell={(node) => node.rowPinned === 'bottom'}
                    getRowStyle={getRowStyle}
                    animateRows={true}
                    getRowNodeId={data => data.id}
                    getRowHeight={(params) => params.node.rowPinned === 'bottom' ? 82 : 42}
                    pinnedBottomRowData={[{}]}
                    onGridReady={(params) => {
                        // const gridState = JSON.parse(localStorage.getItem('gridState'));
                        // if(gridState) {
                        //     params.api.setRowData(gridState);
                        // }

                    }}
                >
                </AgGridReact>
            </div>
        </div>
    );
}



export default Grid;

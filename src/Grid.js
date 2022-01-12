
import { useContext, useCallback } from 'react';
import './App.scss';

import { AgGridReact } from 'ag-grid-react';
import ActionCellRenderer from './components/cell-renderers/ActionCellRenderer';
import TypeCellRenderer from './components/cell-renderers/TypeCellRenderer';
import TimerCellRenderer from './components/cell-renderers/TimerCellRenderer';
import PomodoroActionsRenderer from './components/cell-renderers/PomodoroActionsRenderer';
import { PomodoroContext } from './PomodoroContext';
import StatusBar from './components/StatusBar';
import 'ag-grid-enterprise';


function Grid(props) {
    const { themes } = props;
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
                return data.task ? { frameworkComponent: ActionCellRenderer, params: { themes } } : undefined;
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
                return data.task ? { frameworkComponent: TimerCellRenderer, params: {} } : undefined;
            },
        },
        {
            headerName: "Start Time",
            field: "start_time",
            valueFormatter: params => {
                // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
                if (params.value) {
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
            valueGetter: params => {
                // console.log('valueGetter:end_time ')
                if (params.data.start_time) {
                    const date = params.data.start_time;
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
        {
            headerName: 'Pomodoro Actions',
            field:'completed',
            minWidth:300,
            cellRendererSelector: ({ data }) => {
                return data.task ? { frameworkComponent: PomodoroActionsRenderer, params: {themes} } : undefined;
            },
            cellClassRules: {
                'shade-cell': ({ node }) => {
                    if (node.data.type === "pomodoro" || node.data.type === "short_break" || node.data.type === "long_break") {
                        return true;
                    }
                },
            }
        },
        // {
        //     field: 'type', minWidth: 350,
        //     cellRendererSelector: ({ data }) => {
        //         return data.task ? { frameworkComponent: TypeCellRenderer, params: {} } : undefined;
        //     },
        //     cellClassRules: {
        //         'shade-cell': ({ node }) => {
        //             if (node.data.type === "pomodoro" || node.data.type === "short_break" || node.data.type === "long_break") {
        //                 return true;
        //             }
        //         },
        //     }
        // },
        { field: 'progress', }
    ];

    const defaultColDef = { flex: 1, filter: true, sortable: true };

    const getRowStyle = params => {
        const { type } = params.data;
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

    }

    return (
        <div style={{ height: '60%', width: '100%' }}>
            <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    reactUi={true}
                    immutableData={true}
                    getRowStyle={getRowStyle}
                    getRowNodeId={data => data.id}
                    statusBar={{
                        statusPanels: [
                            {
                                statusPanelFramework: StatusBar,
                                statusPanelParams: {

                                },
                                key: 'statusBarKey',
                                align: 'left'
                            },
                        ]
                    }}
                >
                </AgGridReact>
            </div>
        </div>
    );
}



export default Grid;

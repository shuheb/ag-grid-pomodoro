
import React, { useContext, useCallback, useMemo } from 'react';
import '../App.css';
import { AgGridReact } from 'ag-grid-react';
import ActionCellRenderer from './cell-renderers/ActionCellRenderer';
import TimerCellRenderer from './cell-renderers/TimerCellRenderer';
import { PomodoroContext } from '../context/PomodoroContext';
import AddTaskCellRenderer from './full-width-cell-renderers/AddTaskCellRenderer';
import { serialiseDate } from '../utils/date';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
function Grid(props) {
    const { themes } = props;
    const { rowData } = useContext(PomodoroContext);

    const formatDateIntoMinutesAndSeconds = ({ value, data }) => (value && data.timeLeft) ? serialiseDate(value) : value;

    const columnTypes = useMemo(() => ({
        'timeColumn': {
            cellStyle: {
                justifyContent: 'center',
            },
        },
        'grayColumn': {
            cellStyle: {
                backgroundColor: '#ffffff1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around'
            },
        },
        'textColumn': {
            cellStyle: {
                fontWeight: 'bold',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
            },
        }
    }), [])

    const columnDefs = [
        {
            field: "action",
            maxWidth: 200,
            type: 'grayColumn',
            cellRendererSelector: ({ data }) => {
                return data.task ? { component: ActionCellRenderer } : undefined;
            },
            pinned: 'left'
        },
        {
            field: "task",
            minWidth: 1000,
            type: 'textColumn',
            valueFormatter: ({ data, value }) => {
                if (data.taskNo) {
                    return `${value} (${data.taskNo}/${data.taskCount})`
                }
                return value;
            },
        },
        {
            headerName: 'Progress',
            field: "timer",
            type: 'grayColumn',
            minWidth: 200,
            valueGetter: ({ data }) => data.timeLeft,
            sort: 'asc',
            cellRendererSelector: ({ data }) => {
                return data.task ? { component: TimerCellRenderer, params: {} } : undefined;
            },

        },
        {
            headerName: "Start Time",
            field: "start_time",
            type: ['timeColumn', 'textColumn'],
            valueGetter: params => {
                if (params.data.timerStarted) {
                    return new Date();
                }
            },
            valueFormatter: formatDateIntoMinutesAndSeconds
        },
        {
            headerName: 'End Time',
            field: "end_time",
            type: ['timeColumn', 'textColumn'],
            valueGetter: params => {
                const startTime = params.getValue('start_time');
                if (startTime) {
                    const date = startTime;
                    const newDate = new Date(date);
                    newDate.setMinutes(date.getMinutes() + Math.round(params.data.timeLeft / 60));
                    return newDate
                }
            },
            valueFormatter: formatDateIntoMinutesAndSeconds,

        }
    ];

    const defaultColDef = useMemo(() => ({ flex: 1, suppressMovable: true, minWidth: 100 }), []);

    const getRowStyle = useCallback(params => {
        const { completed } = params.data;
        if (!params.node.isRowPinned()) {
            if (completed) {
                const { background, foreground } = themes['completed'];
                return { backgroundColor: background, color: foreground }
            } else {
                const { background, foreground } = themes['pomodoro'];
                return { backgroundColor: background, color: foreground }
            }
        }
    }, [themes])

    const postSort = useCallback(rowNodes => {
        // here we put completed rows on top while preserving the sort order
        let nextInsertPos = 0;
        for (let i = 0; i < rowNodes.length; i++) {
            const completed = rowNodes[i].data.completed;
            if (completed) {
                rowNodes.splice(nextInsertPos, 0, rowNodes.splice(i, 1)[0]);
                nextInsertPos++;
            }
        }
    }, [])

    return (
        <div style={{ height: '50%', width: '100%' }}>
            <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
                <AgGridReact
                    ref={props.gridRef}
                    rowData={rowData}
                    columnTypes={columnTypes}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    immutableData={true}
                    fullWidthCellRenderer={AddTaskCellRenderer}
                    isFullWidthCell={(node) => node.rowPinned === 'bottom'}
                    getRowStyle={getRowStyle}
                    animateRows={true}
                    overlayLoadingTemplate={`<span class="ag-overlay-loading-center">Please stop the timer before clicking an action.</span>`}
                    postSort={postSort}
                    getRowNodeId={data => data.id}
                    getRowHeight={(params) => params.node.rowPinned === 'bottom' ? 82 : 60}
                    pinnedBottomRowData={[{}]}
                >
                </AgGridReact>
            </div>
        </div>
    );
}



export default Grid;
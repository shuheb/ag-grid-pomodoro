import initialState from "./initialState";
import { useReducer, createContext, useCallback } from 'react';

import { UPDATE_TASK_NAME, START_TIMER, STOP_TIMER, ADD_TASK, TOGGLE_TIMER, CHANGE_POMODORO_TYPE } from "./ActionCreators";
import { v4 as generateId } from 'uuid';
export const PomodoroContext = createContext();

const reducer = (state = {}, action) => {

    switch (action.type) {
        case START_TIMER:
            console.log('START_TIMER', action.payload)
            return { ...state, rowData: toggleTimer(state.rowData, action.payload.id, true) }
        case STOP_TIMER:
            console.log('STOP_TIMER', action.payload)
            return { ...state, rowData: stopTimerOnRow(state.rowData, action.payload.id, false) }
        case TOGGLE_TIMER:
            console.log('TOGGLE_TIMER', action.payload);
            return { ...state, rowData: toggleTimer(state.rowData, action.payload.id) }
        case ADD_TASK:
            console.log('ADD_TASK', action.payload);
            return { ...state, rowData: [...state.rowData, { id: action.payload.id, timerStarted: false, type: 'pomodoro' }] }
        case UPDATE_TASK_NAME:
            console.log('UPDATE_TASK_NAME', action.payload);
            const newRowData = state.rowData.map(row => {
                if (row.id !== action.payload.id) return row;
                return { ...row, task: action.payload.task };
            });
            return { ...state, rowData: newRowData };
        case CHANGE_POMODORO_TYPE:
            console.log('CHANGE_POMODORO_TYPE', action.payload);

            return { ...state, rowData: updateRowDataWithNewType(state.rowData, action.payload.id, action.payload.type) };
        default:
            console.log('default triggered')
            return state;
    }
}

const stopTimerOnRow = (rowData, id, toggle) => {
    const newRowData = rowData.map((row) => {
        if (row.id !== id) return row;
        return { ...row, timerStarted: toggle }
    })
    return newRowData
}

const toggleTimer = (rowData, id) => {
    const newRowData = rowData.map((row) => {
        if (row.id !== id) return row;
        return { ...row, timerStarted: !row.timerStarted }
    })
    return newRowData
}

const updateRowDataWithNewType = (rowData, id, type) => {
    const newRowData = rowData.map((row) => {
        if (row.id !== id) return row;
        return { ...row, type }
    })
    return newRowData;
}

export const PomodoroProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { rowData, currentRow } = state;

    const startTimer = useCallback(({ id }) => {
        dispatch({
            type: START_TIMER,
            payload: {
                id
            },
        });
    }, [dispatch]);

    const stopTimer = useCallback(({ id }) => {
        dispatch({
            type: STOP_TIMER,
            payload: {
                id
            },
        });
    }, [dispatch]);

    const toggleTimer = useCallback(({ id }) => {
        dispatch({
            type: TOGGLE_TIMER,
            payload: {
                id
            },
        });
    }, [dispatch]);

    const changePomodoroType = useCallback(({ id, type, previous }) => {
        if (type !== previous) {
            dispatch({
                type: CHANGE_POMODORO_TYPE,
                payload: {
                    id,
                    type
                }
            })
        }
    }, [dispatch])

    const addTask = useCallback(() => {

        dispatch({
            type: ADD_TASK,
            payload: {
                id: generateId()
            },
        });
    }, [dispatch]);

    const updateTaskName = useCallback(({ id, task }) => {

        dispatch({
            type: UPDATE_TASK_NAME,
            payload: {
                id,
                task
            },
        });
    }, [dispatch]);

    const value = { rowData, currentRow, startTimer, stopTimer, updateTaskName, addTask, toggleTimer, changePomodoroType };

    return (<PomodoroContext.Provider value={value}>
        {children}
    </PomodoroContext.Provider>
    );
}
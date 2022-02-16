import initialState from "./initialState";
import { useReducer, createContext, useCallback } from 'react';

import { START_TIMER, STOP_TIMER, ADD_TASK, PERSIST_SECONDS, RESET_ACTIVE_TASK, MARK_AS_COMPLETE, DELETE_POMODORO } from "./ActionCreators";
import { v4 as generateId } from 'uuid';


export const PomodoroContext = createContext();

const reducer = (state = {}, action) => {
    console.warn(`************* ${action.type} ***********`)
    switch (action.type) {
        case START_TIMER:
            return {
                ...state, activeTaskId: action.payload.id, rowData: state.rowData.map(row => {
                    if (row.id !== action.payload.id) return row;
                    return { ...row, timerStarted: true };
                })
            };
        case STOP_TIMER:
            return {
                ...state, rowData: state.rowData.map(row => {
                    if (row.id !== action.payload.id) return row;
                    return { ...row, timerStarted: false }
                })
            }
        case ADD_TASK:
            return {
                ...state,
                rowData: [...state.rowData, {
                    id: action.payload.id,
                    task: action.payload.task,
                    taskNo: action.payload.taskNo,
                    timerStarted: false,
                    completed: false,
                    timeLeft: 1500
                }]
            }
        case DELETE_POMODORO:
            return { ...state, activeTaskId: -1, rowData: state.rowData.filter((row) => row.id !== action.payload.id) };
        case MARK_AS_COMPLETE:
            return {
                ...state, rowData: state.rowData.map(row => {
                    if (row.id !== action.payload.id) return row;
                    return { ...row, completed: true, timeLeft: 0 }
                })
            };
        case PERSIST_SECONDS:
            return {
                ...state, rowData: state.rowData.map(row => {
                    if (row.id !== action.payload.id) return row;
                    return { ...row, timeLeft: action.payload.timeLeft }
                })
            }
        case RESET_ACTIVE_TASK:
            return { ...state, activeTaskId: -1 }
        default:
            return state;
    }
}

export const PomodoroProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
        const gridState = JSON.parse(localStorage.getItem('gridState'));
        if (gridState) {
            return gridState;
        }
        return initial;
    });

    const { rowData, activeTaskId } = state;
    const startTimer = useCallback(({ id }) => {
        dispatch({
            type: START_TIMER,
            payload: {
                id
            },
        });
    }, [dispatch]);

    const stopTimer = useCallback(({ id, timeLeft }) => {
        dispatch({
            type: STOP_TIMER,
            payload: {
                id,
                timeLeft
            },
        });
    }, [dispatch]);

    const addTask = useCallback(({ task, taskNo }) => {

        dispatch({
            type: ADD_TASK,
            payload: {
                id: generateId(),
                task,
                taskNo
            },
        });
    }, [dispatch]);

    const persistSeconds = useCallback(({ id, timeLeft }) => {

        dispatch({
            type: PERSIST_SECONDS,
            payload: {
                id,
                timeLeft
            },
        });
    }, [dispatch]);

    const markAsComplete = useCallback(({ id }) => {
        dispatch({
            type: MARK_AS_COMPLETE,
            payload: {
                id
            },
        });
    }, [dispatch]);

    const deletePomodoro = useCallback(({ id }) => {
        dispatch({
            type: DELETE_POMODORO,
            payload: {
                id
            },
        });
    }, [dispatch]);

    const resetActiveTask = useCallback(() => {
        dispatch({
            type: RESET_ACTIVE_TASK
        })
    }, [dispatch])

    const value = { rowData, activeTaskId, startTimer, stopTimer, addTask, persistSeconds, markAsComplete, deletePomodoro, resetActiveTask };

    return (<PomodoroContext.Provider value={value}>
        {children}
    </PomodoroContext.Provider>
    );
}
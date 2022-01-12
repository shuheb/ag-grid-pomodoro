import initialState from "./initialState";
import { useReducer, createContext, useCallback } from 'react';

import { UPDATE_TASK_NAME, START_TIMER, STOP_TIMER, ADD_TASK, TOGGLE_TIMER, CHANGE_POMODORO_TYPE, UPDATE_CURRENT_TIMER, DISABLE_TIMER_ON_OTHER_ROWS, DECREMENT_TIMER, UPDATE_TIME_LEFT, PERSIST_SECONDS, REMOVE_CURRENT_TIMER } from "./ActionCreators";
import { v4 as generateId } from 'uuid';


export const PomodoroContext = createContext();

const reducer = (state = {}, action) => {
    console.warn(`************* ${action.type} ***********`)
    switch (action.type) {
        case START_TIMER:
            return { ...state, rowData: startTimerOnRow(state.rowData, action.payload.id, true) }
        case STOP_TIMER:
            return {
                ...state, currentRow: -1, rowData: state.rowData.map(row => {
                    if (row.id !== action.payload.id) return row;
                    return { ...row, timerStarted: false }
                })
            }
        case TOGGLE_TIMER:
            return { ...state, rowData: toggleTimer(state.rowData, action.payload.id) }
        case ADD_TASK:
            return { ...state, rowData: [...state.rowData, { id: action.payload.id, timerStarted: false, type: 'pomodoro', timeLeft: 5 }] }
        case UPDATE_TASK_NAME:
            return {
                ...state, rowData: state.rowData.map(row => {
                    if (row.id !== action.payload.id) return row;
                    return { ...row, task: action.payload.task };
                })
            };
        case CHANGE_POMODORO_TYPE:
            return { ...state, rowData: updateRowDataWithNewType(state.rowData, action.payload.id, action.payload.type) };
        case UPDATE_CURRENT_TIMER:
            return { ...state, currentRow: action.payload.id }
        case DISABLE_TIMER_ON_OTHER_ROWS:
            return { ...state, rowData: stopTimerOnOtherRows(state.rowData, action.payload.id) };
        case DECREMENT_TIMER:
            return {
                ...state, rowData: decrementTimeLeftOnRow(state.rowData, action.payload.id)
            }
        case UPDATE_TIME_LEFT:
            return { ...state, rowData: updateTimeLeftOnRow(state.rowData, action.payload.id, action.payload.type) };
        case PERSIST_SECONDS:
            // debugger;
            return {
                ...state, rowData: state.rowData.map(row => {
                    if (row.id !== action.payload.id) return row;
                    return { ...row, timeLeft: action.payload.timeLeft }
                })
            }
        case REMOVE_CURRENT_TIMER:
            return { ...state, currentRow: -1 }
        default:
            return state;
    }
}
const stopTimerOnOtherRows = (rowData, id) => {
    const newRowData = rowData.map(row => {
        if (row.id === id) return row;
        if (row.timerStarted) return { ...row, timerStarted: false };
        return row;
    });
    return newRowData
};
const startTimerOnRow = (rowData, id, toggle) => {
    const newRowData = rowData.map((row) => {
        if (row.id !== id) return row;
        return { ...row, timerStarted: toggle, start_time: new Date() }
    })
    return newRowData
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
    });
    return newRowData;
}

const updateTimeLeftOnRow = (rowData, id, type) => {
    let timeLeft = 1500;
    switch (type) {
        case 'short_break':
            timeLeft = 300
            break;
        case 'long_break':
            timeLeft = 900;
            break;
        default:
            timeLeft = 1500;
            break;
    }
    return rowData.map(row => {
        if (row.id !== id) return row;
        return { ...row, timeLeft: timeLeft }
    })
}

const decrementTimeLeftOnRow = (rowData, id) => {
    const newRowData = rowData.map(row => {
        if (row.id !== id) return row;
        return { ...row, timeLeft: row.timeLeft - 1 }
    });

    return newRowData
}

export const PomodoroProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { rowData, currentRow } = state;

    console.log(state)

    const startTimer = useCallback(({ id }) => {
        dispatch({
            type: START_TIMER,
            payload: {
                id
            },
        });

        // dispatch({
        //     type: DISABLE_TIMER_ON_OTHER_ROWS,
        //     payload: {
        //         id
        //     }
        // })

        dispatch({
            type: UPDATE_CURRENT_TIMER,
            payload: {
                id
            }
        });
    }, [dispatch]);

    const stopTimer = useCallback(({ id, timeLeft }) => {
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

            dispatch({
                type: STOP_TIMER,
                payload: {
                    id
                }
            })

            dispatch({
                type: UPDATE_TIME_LEFT,
                payload: {
                    id,
                    type
                }
            });
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

    const decrementTimeLeft = useCallback(({ id }) => {
        dispatch({
            type: DECREMENT_TIMER,
            payload: {
                id
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

    const value = { rowData, currentRow, startTimer, stopTimer, updateTaskName, addTask, toggleTimer, changePomodoroType, decrementTimeLeft, persistSeconds };

    return (<PomodoroContext.Provider value={value}>
        {children}
    </PomodoroContext.Provider>
    );
}
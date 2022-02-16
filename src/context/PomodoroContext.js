import { useReducer, createContext, useCallback } from 'react';
import { START_TIMER, STOP_TIMER, ADD_TASK, PERSIST_SECONDS, RESET_ACTIVE_TASK, MARK_AS_COMPLETE, DELETE_POMODORO } from "../actions/ActionCreators";
import { v4 as generateId } from 'uuid';
import reducer from "../reducers/reducer";

export const PomodoroContext = createContext();

const initialState = {
    rowData: [],
    activeTaskId: -1
};

/**
 * Before the Grid Component is rendered, check if there is any saved data in local storage and initialise
 * the state with it.
 * Alternatively, you can implement this logic inside the onGridReady event on the Grid Component
 */
const init = (initial) => {
    console.log(initial)
    const gridState = JSON.parse(localStorage.getItem('gridState'));
    if (gridState) {
        return gridState;
    }
    return initial;
}

export const PomodoroProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState, init);

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
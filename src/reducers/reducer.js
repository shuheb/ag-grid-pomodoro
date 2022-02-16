import { START_TIMER, STOP_TIMER, ADD_TASK, PERSIST_SECONDS, RESET_ACTIVE_TASK, MARK_AS_COMPLETE, DELETE_POMODORO } from "../actions/ActionCreators";
const reducer = (state = {}, action) => {
    console.warn(`************* ${action.type} ${JSON.stringify(action.payload)} ***********`)
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
export default reducer;
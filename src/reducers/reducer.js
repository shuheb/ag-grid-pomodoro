import { START_TIMER, STOP_TIMER, ADD_TASK, PERSIST_SECONDS, RESET_ACTIVE_TASK, MARK_AS_COMPLETE, DELETE_POMODORO } from "../actions/ActionCreators";
const reducer = (state = {}, action) => {
    // console.warn(`************* ${action.type} ${JSON.stringify(action.payload)} ***********`)
    switch (action.type) {
        case START_TIMER:
            return {
                tasks: state.tasks.map(row => {
                    if (row.id !== action.payload.id) return row;
                    return { ...row, timerStarted: true };
                }),
                activeTaskId: action.payload.id,
            };
        case STOP_TIMER:
            return {
                ...state, tasks: state.tasks.map(row => {
                    if (row.id !== action.payload.id) return row;
                    return { ...row, timerStarted: false }
                })
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, {
                    id: action.payload.id,
                    task: action.payload.task,
                    taskNo: action.payload.taskNo,
                    taskCount: action.payload.taskCount,
                    timerStarted: false,
                    completed: false,
                    timeLeft: 1500
                }]
            }
        case DELETE_POMODORO:
            return { tasks: state.tasks.filter((row) => row.id !== action.payload.id), activeTaskId: -1 };
        case MARK_AS_COMPLETE:
            return {
                ...state, tasks: state.tasks.map(row => {
                    if (row.id !== action.payload.id) return row;
                    return { ...row, completed: true, timeLeft: 0 }
                })
            };
        case PERSIST_SECONDS:
            return {
                ...state, tasks: state.tasks.map(row => {
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
const reducer = (state = {}, action) => {
    console.group(action.type);
    console.log('dispatching: ', action);
    console.groupEnd(action.type);
    switch (action.type) {
        case 'started_timer':
            return {
                tasks: state.tasks.map(row => {
                    if (row.id !== action.id) return row;
                    return { ...row, timerStarted: true };
                }),
                activeTaskId: action.id,
            };
        case 'stopped_timer':
            return {
                ...state, tasks: state.tasks.map(row => {
                    if (row.id !== action.id) return row;
                    return { ...row, timerStarted: false }
                })
            }
        case 'added_task':
            return {
                ...state,
                tasks: [...state.tasks, {
                    id: action.id,
                    task: action.task,
                    taskNo: action.taskNo,
                    taskCount: action.taskCount,
                    timerStarted: false,
                    completed: false,
                    timeLeft: 1500
                }]
            }
        case 'deleted_task':
            return { tasks: state.tasks.filter((row) => row.id !== action.id), activeTaskId: -1 };
        case 'completed_task':
            return {
                ...state, tasks: state.tasks.map(row => {
                    if (row.id !== action.id) return row;
                    return { ...row, completed: true, timeLeft: 0 }
                })
            };
        case 'saved_progress':
            return {
                ...state, tasks: state.tasks.map(row => {
                    if (row.id !== action.id) return row;
                    return { ...row, timeLeft: action.timeLeft }
                })
            }
        case 'resetted_active_task':
            return { ...state, activeTaskId: -1 }
        default:
            return state;
    }
}
export default reducer;
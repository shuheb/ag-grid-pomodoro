import './App.scss';
import PomodoroViewRenderer from './components/PomodoroViewRenderer';
import Grid from './Grid';
import { PomodoroProvider } from './PomodoroContext';

// const themes = {
//   pomodoro: {
//     foreground: '#ffffff',
//     background: '#d95550',
//   },
//   short_break: {
//     foreground: '#ffffff',
//     background: '#4c9195',
//   },
//   long_break: {
//     foreground: '#ffffff',
//     background: '#457ca3',
//   },
//   completed: {
//     foreground: 'fffffff',
//     background: '#588157'
//   }
// };

const themes = {
  pomodoro: {
    foreground: '#ffffff',
    background: '#d32f2f',
  },
  short_break: {
    foreground: '#ffffff',
    background: '#7b1fa2',
  },
  long_break: {
    foreground: '#ffffff',
    background: '#1565c0',
  },
  completed: {
    foreground: 'fffffff',
    background: '#4caf50'
  }
};

const App = () => {

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <PomodoroProvider>
        <PomodoroViewRenderer themes={themes} />
        <Grid themes={themes} />
      </PomodoroProvider>
    </div>
  );
}

/*
const [state, dispatch] = useReducer(reducer, initialState);
  const { rowData, currentRow } = state;

  const startTimer = useCallback(({ id }) => {
    dispatch({
      type: START_TIMER,
      payload: {
        id
      },
    });

    dispatch({
      type: DISABLE_TIMER_ON_OTHER_ROWS,
      payload: {
        id
      }
    })

    dispatch({
      type: UPDATE_CURRENT_TIMER,
      payload: {
        id,

      }
    });
  }, [dispatch]);

  const stopTimer = useCallback(({ id }) => {
    dispatch({
      type: STOP_TIMER,
      payload: {
        id
      },
    });

    dispatch({
      type: REMOVE_CURRENT_TIMER,
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

  const persistSeconds = useCallback(({ id, seconds }) => {

    dispatch({
      type: PERSIST_SECONDS,
      payload: {
        id,
        seconds
      },
    });
  }, [dispatch]);

  const actions = { rowData, currentRow, startTimer, stopTimer, updateTaskName, addTask, toggleTimer, changePomodoroType, decrementTimeLeft, persistSeconds };
*/


export default App;

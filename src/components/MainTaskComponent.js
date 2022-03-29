import { useState, useEffect, useContext, memo } from 'react';
import { PomodoroContext } from '../context/PomodoroContext';
import TaskTypeComponent from './task-components/TaskTypeComponent';
import TaskDetailsComponent from './task-components/TaskDetailsComponent';
import TaskTimerComponent from './task-components/TaskTimerComponent';

const ACTIVE_TASK_DEFAULT = { id: -1, timeLeft: 1500, timerStarted: false }

const MainTaskComponent = memo((props) => {
  const { activeTaskId, tasks, resetActiveTask, stopTimer, startTimer } = useContext(PomodoroContext);
  const [activeTask, setActiveTask] = useState(ACTIVE_TASK_DEFAULT);
  const [pomodoroType, setPomodoroType] = useState('pomodoro');
  const { timeLeft, id, task, taskNo, taskCount, timerStarted, completed } = activeTask;
  const { themes } = props;
  // if there is an active task, i.e. the timer is running, then store the data inside the activeTask hook
  useEffect(() => {
    if (activeTaskId !== -1) {
      setActiveTask(tasks.filter(row => row.id === activeTaskId)[0])
    } else {

    }
  }, [activeTaskId, tasks]);

  // when task is completed i.e. timer has reached 0 seconds or via button, show the short break option
  useEffect(() => {
    if (completed) {
      setPomodoroType('short_break')
    }
  }, [completed])

  // if type is changed from pomodoro to short break or long break, reset the active task 
  useEffect(() => {
    if ((id && id !== -1) && (pomodoroType === "long_break" || pomodoroType === "short_break")) {
      resetActiveTask();
      setActiveTask(ACTIVE_TASK_DEFAULT)
    }
  }, [pomodoroType, id, resetActiveTask])

  useEffect(() => {
    if (id === -1) {
      if (pomodoroType === 'pomodoro') {
        setActiveTask(task => ({ ...task, timeLeft: 1500 }));
      } else if (pomodoroType === 'short_break') {
        setActiveTask(task => ({ ...task, timeLeft: 300 }));
      }
      else if (pomodoroType === 'long_break') {
        setActiveTask(task => ({ ...task, timeLeft: 900 }));
      }
    }
  }, [pomodoroType, id]);

  // whenever there is no active task, i.e. a task from the grid is not active, then default to pomodoro option
  useEffect(() => {
    if (activeTaskId !== -1) {
      setPomodoroType('pomodoro')
    }
  }, [activeTaskId])

  return (<div className="main-task-background" style={{ backgroundColor: themes[pomodoroType].background }} >
    <div className="main-task-container">
      <TaskTypeComponent timerStarted={timerStarted} pomodoroType={pomodoroType} setPomodoroType={(type) => setPomodoroType(type)} />
      <TaskDetailsComponent pomodoroType={pomodoroType} id={id} theme={themes[pomodoroType]} task={task ? `${task} (${taskNo}/${taskCount})` : undefined} />
      <TaskTimerComponent timeLeft={timeLeft} id={id} timerStarted={timerStarted} pomodoroType={pomodoroType} stopTimer={stopTimer} startTimer={startTimer} theme={themes[pomodoroType]} />
    </div>

  </div>)
})
export default MainTaskComponent;
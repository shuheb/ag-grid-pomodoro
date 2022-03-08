import { useState, useEffect, useContext, memo } from 'react';
import { PomodoroContext } from '../context/PomodoroContext';
import TaskTypeComponent from './task-components/TaskTypeComponent';
import TaskDetailsComponent from './task-components/TaskDetailsComponent';
import TaskTimerComponent from './task-components/TaskTimerComponent';

const MainTaskComponent = memo((props) => {
  const { activeTaskId, rowData, resetActiveTask, stopTimer, startTimer } = useContext(PomodoroContext);
  const [activeTask, setActiveTask] = useState(null);
  const [pomodoroType, setPomodoroType] = useState('pomodoro');
  const { timeLeft, id, task, taskNo, taskCount, timerStarted, completed } = activeTask ? activeTask : {};
  const { themes } = props;
  
  // if there is an active task, i.e. the timer is running, then store the data inside the activeTask hook
  useEffect(() => {
    if (activeTaskId !== -1) {
      setActiveTask(rowData.filter(row => row.id === activeTaskId)[0])
    } else {
      setActiveTask({})
    }
  }, [activeTaskId, rowData]);

  // when task is completed i.e. timer has reached 0 seconds or via button, show the short break option
  useEffect(() => {
    if (completed) {
      setPomodoroType('short_break')
    }
  }, [completed])

  // if type is changed from pomodoro to short break or long break, reset the active task 
  useEffect(() => {
    if (id && (pomodoroType === "long_break" || pomodoroType === "short_break")) {
      resetActiveTask();
    }
  }, [pomodoroType, id, resetActiveTask])



  // whenever there is no active task, i.e. a task from the grid is not active, then default to pomodoro option
  useEffect(() => {
    if (activeTaskId !== -1) {
      setPomodoroType('pomodoro')
    }
  }, [activeTaskId])

  const value = { timeLeft, id, task, timerStarted, completed };
  return (<div className="main-task-background" style={{ backgroundColor: themes[pomodoroType].background }} >
    <div className="main-task-container">
      <TaskTypeComponent timerStarted={timerStarted} pomodoroType={pomodoroType} setPomodoroType={(type) => setPomodoroType(type)} />
      <TaskDetailsComponent pomodoroType={pomodoroType} id={id} theme={themes[pomodoroType]} task={task ? `${task} (${taskNo}/${taskCount})` : undefined} />
      <TaskTimerComponent value={value} pomodoroType={pomodoroType} stopTimer={stopTimer} startTimer={startTimer} theme={themes[pomodoroType]} />
    </div>

  </div>)
})
export default MainTaskComponent;
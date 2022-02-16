import { useState, useEffect, useContext, memo } from 'react';
import { PomodoroContext } from '../context/PomodoroContext';
import TaskTypeComponent from './task-components/TaskTypeComponent';
import TaskDetailsComponent from './task-components/TaskDetailsComponent';
import TaskTimerComponent from './task-components/TaskTimerComponent';

const MainTaskComponent = memo((props) => {
  const { activeTaskId, rowData, resetActiveTask, stopTimer, startTimer } = useContext(PomodoroContext);
  const [activeTask, setActiveTask] = useState(null);
  const [pomodoroType, setPomodoroType] = useState('pomodoro');
  const { timeLeft, id, task, taskNo, timerStarted, completed } = activeTask ? activeTask : {};
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
  }, [completed, resetActiveTask])

  // if type is changed from pomodoro to short break or long break, reset the active task 
  useEffect(() => {
    if (id && (pomodoroType === "long_break" || pomodoroType === "short_break")) {
      resetActiveTask();
    }
  }, [pomodoroType, id, resetActiveTask])



  // use case: when we are looking at a grid timer, always start with pomodoro, otherwise
  // if user is looking at short/long break, that style will stay
  useEffect(() => {
    if (activeTaskId !== -1) {
      setPomodoroType('pomodoro')
    }
  }, [activeTaskId])

  const value = { timeLeft, id, task, timerStarted, completed };
  return (<div className="p-background" style={{ backgroundColor: themes[pomodoroType].background }} >
    <div className="p-container">
      <TaskTypeComponent timerStarted={timerStarted} pomodoroType={pomodoroType} setPomodoroType={(type) => setPomodoroType(type)} />
      <TaskDetailsComponent pomodoroType={pomodoroType} id={id} theme={themes[pomodoroType]} task={task ? `${task} (${taskNo})` : undefined} />
      <TaskTimerComponent value={value} pomodoroType={pomodoroType} stopTimer={stopTimer} startTimer={startTimer} theme={themes[pomodoroType]} />
    </div>

  </div>)
})
export default MainTaskComponent;
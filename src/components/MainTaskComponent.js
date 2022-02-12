import { useState, useEffect, useContext, memo } from 'react';
import { PomodoroContext } from '../PomodoroContext';
import TaskTypeComponent from './task-components/TaskTypeComponent';
import TaskDetailsComponent from './task-components/TaskDetailsComponent';
import TaskTimerComponent from './task-components/TaskTimerComponent';

const MainTaskComponent = memo((props) => {
  // console.log('MainTaskComponent')
  const { currentRow, rowData, removeCurrentTimer, stopTimer, startTimer } = useContext(PomodoroContext);
  const [rowInfo, setRowInfo] = useState(null);
  const [pomodoroType, setPomodoroType] = useState('short_break');
  const { timeLeft, id, task, taskNo, timerStarted, completed } = rowInfo ? rowInfo : {};
  const { themes } = props;

  // use case: when timer has finished, move to short_break tyoe
  useEffect(() => {
    if (completed) {
      removeCurrentTimer({ id });
      setPomodoroType('short_break')

    }
  }, [completed])

  useEffect(() => {
    if (id && (pomodoroType === "long_break" || pomodoroType === "short_break")) {
      removeCurrentTimer({ id });
      // setRowInfo({})
    }
  }, [pomodoroType])

  useEffect(() => {

    if (currentRow !== -1) {
      setRowInfo(rowData.filter(row => row.id === currentRow)[0])
    } else {
      setRowInfo({})
    }
  }, [currentRow, rowData]);

  // use case: when we are looking at a grid timer, always start with pomodoro, otherwise
  // if user is looking at short/long break, that style will stay
  useEffect(() => {
    if (currentRow !== -1) {
      setPomodoroType('pomodoro')
    }
  }, [currentRow])

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
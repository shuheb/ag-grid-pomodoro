import { memo, useContext } from 'react';
import { PomodoroContext } from '../PomodoroContext';

const TypeComponent = memo(props => {
  console.log('TypeComponent');
  const { changePomodoroType, stopTimer } = useContext(PomodoroContext);
  const type = props.node.data.type;

  const clickHandler = (pomodoroType) => {
    if (pomodoroType === 'long_break') {
      changePomodoroType({ type: 'long_break', id: props.node.data.id, previous: props.node.data.type })
    }
    else if (pomodoroType === 'short_break') {
      changePomodoroType({ type: 'short_break', id: props.node.data.id, previous: props.node.data.type })
    } else {
      changePomodoroType({ type: 'pomodoro', id: props.node.data.id, previous: props.node.data.type })
    }
    stopTimer({ id: props.node.data.id, timerStarted: props.node.data.timerStarted });
  }

  return (<div className="p-title">
    <button onClick={() => clickHandler('pomodoro')} className={type === "pomodoro" ? "p-title-item active" : "p-title-item"}>Pomodoro</button>
    <button onClick={() => clickHandler('short_break')} className={type === "short_break" ? "p-title-item active" : "p-title-item"}>Short Break</button>
    <button onClick={() => clickHandler('long_break')} className={type === "long_break" ? "p-title-item active" : "p-title-item"}>Long Break</button>
  </div>)
})

export default TypeComponent;
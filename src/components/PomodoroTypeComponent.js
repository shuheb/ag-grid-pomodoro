import { memo, useContext } from 'react';
import { PomodoroContext } from '../PomodoroContext';

const PomodoroTypeComponent = memo(props => {
  console.log('PomodoroTypeComponent');
  const { changePomodoroType } = useContext(PomodoroContext);
  const type = props.node.data.type;

  return (<div className="p-title">
    <button onClick={() => changePomodoroType({ type: 'pomodoro', id: props.node.data.id, previous: props.node.data.type })} className={type === "pomodoro" ? "p-title-item active" : "p-title-item"}>Pomodoro</button>
    <button onClick={() => changePomodoroType({ type: 'short_break', id: props.node.data.id, previous: props.node.data.type })} className={type === "short_break" ? "p-title-item active" : "p-title-item"}>Short Break</button>
    <button onClick={() => changePomodoroType({ type: 'long_break', id: props.node.data.id, previous: props.node.data.type })} className={type === "long_break" ? "p-title-item active" : "p-title-item"}>Long Break</button>
  </div>)
})

export default PomodoroTypeComponent;
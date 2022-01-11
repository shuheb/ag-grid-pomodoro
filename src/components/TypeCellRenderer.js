import { memo, useContext } from 'react';
import { PomodoroContext } from '../PomodoroContext';

/*
  Since the TypeComponent is used in both this file and in the above component
  Exercise:
  - create a new Context which has TypeComponent so that it can be shared by TypeCellRenderer and the component above the grid
*/
const TypeComponent = ({ id, type, changePomodoroType }) => {
  const clickHandler = (pomodoroType) => {
    if (pomodoroType === 'long_break') {
      changePomodoroType({ type: 'long_break', id, previous: type })
    }
    else if (pomodoroType === 'short_break') {
      changePomodoroType({ type: 'short_break', id, previous: type })
    } else {
      changePomodoroType({ type: 'pomodoro', id, previous: type })
    }
  }

  return (<div className="p-title">
    <button onClick={() => clickHandler('pomodoro')} className={type === "pomodoro" ? "p-title-item active" : "p-title-item"}>Pomodoro</button>
    <button onClick={() => clickHandler('short_break')} className={type === "short_break" ? "p-title-item active" : "p-title-item"}>Short Break</button>
    <button onClick={() => clickHandler('long_break')} className={type === "long_break" ? "p-title-item active" : "p-title-item"}>Long Break</button>
  </div>)
}

const TypeCellRenderer = memo(props => {
  // console.log('TypeCellRenderer');
  const { changePomodoroType } = useContext(PomodoroContext);
  const {type, id} = props.node.data;

  return (<TypeComponent type={type} id={id} changePomodoroType={changePomodoroType} />)
});

export default TypeCellRenderer;
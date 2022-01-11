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

export default TypeComponent;
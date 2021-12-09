import { useState, useEffect, memo } from 'react';

const PomodoroTypeComponent = memo(props => {
    const type = props.node.data.type || "pomodoro";
    const doesTaskExist = props.node.data.task
    const [timerType, setTimerType] = useState(type);
  
    
  
  
    useEffect(() => {
      if (type !== timerType) {
        let data = props.node.data;
        props.node.setData({ ...data, type: timerType, timerStarted: false })
      }
    }, [timerType]);
  
  
  
    const uiToShow = <div className="p-title">
      <button onClick={() => setTimerType('pomodoro')} className={timerType === "pomodoro" ? "p-title-item active" : "p-title-item"}>Pomodoro</button>
      <button onClick={() => setTimerType('short_break')} className={timerType === "short_break" ? "p-title-item active" : "p-title-item"}>Short Break</button>
      <button onClick={() => setTimerType('long_break')} className={timerType === "long_break" ? "p-title-item active" : "p-title-item"}>Long Break</button>
    </div>;
  
    const showUi = doesTaskExist ? uiToShow : null;
  
    return (showUi)
  })

  export default PomodoroTypeComponent;
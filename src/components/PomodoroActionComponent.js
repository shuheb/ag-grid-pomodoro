import { useState, useEffect, memo } from 'react';

const PomodoroActionComponent = memo((props) => {
    const type = props.node.data.type || 'pomodoro';

    const timerStarted = props.node.data.timerStarted;

    const doesTaskExist = props.node.data.task
    const [startTimer, setStartTimer] = useState(false);

    const [timerType, setTimerType] = useState(type);

    useEffect(() => {
        if(timerStarted === false) {
            setStartTimer(false);
        }
    },[timerStarted])

    const onClickHandler = () => {
        setStartTimer(prev => !prev);
        if (startTimer) {
            let data = props.node.data;
            props.node.setData({ ...data, timerStarted: false })
        } else {
            let data = props.node.data;
            let date = new Date();
            props.node.setData({ ...data, timerStarted: true, start_time: date })
        }
    }

    const button = <div className="btn-container"><button className={timerType === "pomodoro" ? "p-button red" : timerType === "short_break" ? "p-button green" : "p-button blue"} onClick={onClickHandler}>{startTimer ? 'STOP' : 'START'}</button></div>;

    const userInterface = doesTaskExist ? button : null;
    return (userInterface)
});


export default PomodoroActionComponent;
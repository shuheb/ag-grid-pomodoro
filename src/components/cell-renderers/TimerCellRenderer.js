import { useState, useEffect, memo, useContext } from 'react';
import { PomodoroContext } from '../../PomodoroContext';

// i have timerLeft, make useState based on that, then start timer locally
// do the same for the component above
// check if it saves renders
const TimerCellRenderer = memo(props => {
  console.log('TimerCellRenderer');
  // const { id, timerStarted, timeLeft, type, stopTimer } = props.node.data;
  // const { stopTimer, persistSeconds} = props;
  // const { id, timerStarted, timeLeft, type } = props.node.data;

  // return (<ContextComponent id={id} timerStarted={timerStarted} timeLeft={timeLeft} type={type} stopTimer={stopTimer} persistSeconds={persistSeconds} />)

  const { stopTimer, currentRow, persistSeconds, markAsComplete } = useContext(PomodoroContext);
  // const { stopTimer, currentRow, persistSeconds } = props;
  const { id, timerStarted, timeLeft, type } = props.node.data;

  const [seconds, setSeconds] = useState(timeLeft);

  useEffect(() => {
    setSeconds(timeLeft);
  }, [type]);
  if (!timerStarted && seconds && seconds < timeLeft) {
    // debugger
    persistSeconds({ id, timeLeft: seconds })
    console.log('******* SAVE THIS VALUE', seconds)
  };
  useEffect(() => {
    let timer;
    if (seconds === 0) {
      stopTimer({ id });
      markAsComplete({ id })
    }
    else if (timerStarted && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prev => prev - 1)
      }, 1000);
    }

    return () => {
      if (timer) { clearInterval(timer); };
    }
  }, [seconds, timerStarted, id])

  if (!timerStarted && (seconds < timeLeft)) {
    // persistSeconds({id, seconds})
  }
  // useEffect(() => {
  //   let timer;
  //   if (timeLeft === 0) {
  //     stopTimer({ id });
  //   }
  //   else if (timerStarted && timeLeft > 0) {
  //     timer = setTimeout(() => {
  //       decrementTimeLeft({id})
  //     }, 1000);
  //   }

  //   return () => {
  //     if (timer) { clearTimeout(timer); };
  //   }
  // }, [timerStarted, timeLeft, id, stopTimer]);

  const secondsToShow = (seconds % 60) < 10 ? `0${seconds % 60}` : seconds % 60;
  const minutesToShow = Math.floor(seconds / 60) < 10 ? `0${Math.floor(seconds / 60)}` : Math.floor(seconds / 60);

  return (<div className="p-timer">{`${minutesToShow}:${secondsToShow}`}</div>)

});

// before
// const TimerCellRenderer = memo(props => {
//   console.log('TimerCellRenderer');
//   const { stopTimer, decrementTimeLeft } = useContext(PomodoroContext);
//   const { id, timerStarted, timeLeft } = props.node.data;

//   useEffect(() => {
//     let timer;
//     if (timeLeft === 0) {
//       stopTimer({ id });
//     }
//     else if (timerStarted && timeLeft > 0) {
//       timer = setTimeout(() => {
//         decrementTimeLeft({id})
//       }, 1000);
//     }

//     return () => {
//       if (timer) { clearTimeout(timer); };
//     }
//   }, [timerStarted, timeLeft, id, stopTimer]);

//   const secondsToShow = (timeLeft % 60) < 10 ? `0${timeLeft % 60}` : timeLeft % 60;
//   const minutesToShow = Math.floor(timeLeft / 60) < 10 ? `0${Math.floor(timeLeft / 60)}` : Math.floor(timeLeft / 60);

//   return (<div className="p-timer">{`${minutesToShow}:${secondsToShow}`}</div>)
// });

export default TimerCellRenderer;
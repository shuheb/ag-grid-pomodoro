import { memo } from "react";

const ActionComponent = memo(({ background, id, timerStarted, stopTimer, startTimer, currentRow, timeLeft }) => {
    
    return (<div className="btn-container" >
        <button disabled={currentRow !== -1 ? id !== currentRow : false} style={{ color: background }}
            onClick={() => timerStarted ? stopTimer({ id, timeLeft }) : startTimer({ id })}>
            {timerStarted ? 'STOP' : 'START'}
        </button>
    </div>)
})

// button:disabled {
//     background-color: -internal-light-dark(rgba(239, 239, 239, 0.3), rgba(19, 1, 1, 0.3));
//     color: -internal-light-dark(rgba(16, 16, 16, 0.3), rgba(255, 255, 255, 0.3));
//     border-color: -internal-light-dark(rgba(118, 118, 118, 0.3), rgba(195, 195, 195, 0.3));
// }
export default ActionComponent;
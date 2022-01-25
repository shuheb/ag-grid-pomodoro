import { memo } from "react";

const ActionComponent = memo(({ rowData, background, id, timerStarted, stopTimer, startTimer, currentRow, timeLeft, completed, node }) => {
    const onClickHandler = () => {
        if (timerStarted) {
            stopTimer({ id, timeLeft });
        }
        else { startTimer({ id }) }
    }

    /* a button is disabled if:
    - completed=true for that row 
    - another timer is running on another row i.e. timerStarted=true && completed=false
    */

    // useEffect(() => {
    //     if (rowData) {
    //         const timerRunningOnRow = rowData.filter((row) => (row.timerStarted));
    //         if (timerRunningOnRow.length > 0) {
    //             timerRunningOnRow = timerRunningOnRow[0];
    //         }
    //     }

    // }, [rowData])

    const checkIfATimerIsRunning = () => {
        if (completed) {
            return true;
        }
        if (rowData) {
            const timerRunningOnRow = rowData.filter((row) => (row.timerStarted && row.id !== id));
            if (timerRunningOnRow.length > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    return (<div className="btn-container" >
        <button
            className="p-button"
            disabled={checkIfATimerIsRunning()}
            // disabled={completed ? true : currentRow !== -1 ? id !== currentRow : false}
            style={{ color: background }}
            onClick={onClickHandler}>
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
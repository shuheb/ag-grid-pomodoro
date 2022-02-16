import { memo, useContext } from 'react';
import { PomodoroContext } from '../../PomodoroContext';
import { IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

const ActionCellRenderer = memo((props) => {
    const { startTimer, stopTimer, rowData, deletePomodoro, markAsComplete } = useContext(PomodoroContext);
    const { timerStarted, id, timeLeft, completed, } = props.node.data;
    // start and stop the timer for the active task
    const toggleTimer = () => {
        if (timerStarted) {
            stopTimer({ id, timeLeft });
        }
        else { startTimer({ id }) }
    }

    // dispatch an action to mark the active task as complete
    // if the timer is active, then display loading overlay
    const completeTask = () => {
        if (timerStarted) {
            props.api.showLoadingOverlay();
            setTimeout(() => {
                props.api.hideOverlay();
            }, 3000)
            return;
        }
        markAsComplete({ id })
    }

     // dispatch an action to delete active task
    // if the timer is active, then display loading overlay
    const deleteTask = () => {
        if (timerStarted) {
            props.api.showLoadingOverlay();

            setTimeout(() => {
                props.api.hideOverlay();
            }, 3000)
            return;
        }
        deletePomodoro({ id })
    }

    // button is disabled if there exists a timer running for a task
    const isButtonDisabled = () => {
        if (rowData) {
            const activeTimers = rowData.filter((row) => (row.timerStarted && row.id !== id));
            const isTimerActive = activeTimers.length > 0;
            if (isTimerActive) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    return (<div className="btn-container" >
        <IconButton
            sx={{
                color: 'white',
            }}
            size="small"
            onClick={toggleTimer}
            disabled={completed ? true : isButtonDisabled()}
        >
            {timerStarted ? <StopIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
        </IconButton>
        <IconButton
            sx={{
                color: 'white',
            }}
            disabled={completed ? true : isButtonDisabled()}
            onClick={completeTask}
            size="small">
            <CheckCircleIcon fontSize="large" />
        </IconButton>
        <IconButton
            sx={{
                color: 'white',
            }}
            disabled={isButtonDisabled()}
            size="small"
            onClick={deleteTask}
        >
            <DeleteIcon fontSize="large" />
        </IconButton>
    </div>)
});

export default ActionCellRenderer;
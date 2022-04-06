import { memo, useContext } from 'react';
import { PomodoroContext } from '../../context/PomodoroContext';
import { IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

const ActionCellRenderer = memo((props) => {
    const { dispatch, rowData } = useContext(PomodoroContext);
    const { timerStarted, id, timeLeft, completed, } = props.node.data;
    // start and stop the timer for the active task
    const toggleTimer = () => {
        if (timerStarted) {
            dispatch({ type: 'stopped_timer', id, timeLeft });
        }
        else { dispatch({ type: 'started_timer', id }); }
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
        dispatch({ type: 'completed_task', id });
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
        };
        dispatch({ type: 'deleted_task', id });
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

    return (<>
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
    </>)
});

export default ActionCellRenderer;
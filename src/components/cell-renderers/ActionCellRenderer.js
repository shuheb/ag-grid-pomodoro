import { memo, useContext } from 'react';
import { PomodoroContext } from '../../PomodoroContext';
import { IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { Alert, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
const ActionCellRenderer = memo((props) => {
    const { startTimer, stopTimer, currentRow, rowData, deletePomodoro, markAsComplete } = useContext(PomodoroContext);
    const { themes } = props;
    const type = 'pomodoro'
    const { background } = themes[type]
    const { timerStarted, id, timeLeft, completed, } = props.node.data;
    const onClickHandler = () => {
        if (timerStarted) {
            stopTimer({ id, timeLeft });
        }
        else { startTimer({ id }) }
    }
    const isStartButtonDisabled = () => {
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
    const isDeleteButtonDisabled = () => {
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

    const isCompleteButtonDisabled = () => {
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
        <IconButton
            sx={{
                color: 'white',
            }}
            size="small"
            onClick={onClickHandler}
            disabled={isStartButtonDisabled()}
            >
            {timerStarted ? <StopIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
        </IconButton>
        {/* <button
            className="p-button"
            disabled={isStartButtonDisabled()}
            style={{ color: background }}
            onClick={onClickHandler}>
            {timerStarted ? 'STOP' : 'START'}
        </button> */}
        <IconButton
            sx={{
                color: 'white',
            }}
            disabled={isCompleteButtonDisabled()}
            onClick={() => {
                if (timerStarted) {
                    alert('The timer is still running, stop timer before switching.')
                    return;
                }
                markAsComplete({ id })
            }}
            aria-label="delete"
            size="small">
            <CheckCircleIcon fontSize="large" />
        </IconButton>
        <IconButton
            sx={{
                color: 'white',
            }}
            aria-label="delete"
            disabled={isDeleteButtonDisabled()}
            size="small"
            onClick={() => {
                if (timerStarted) {
                    alert('The timer is still running, stop timer before switching.')
                    return;
                }
                deletePomodoro({ id })
            }}
        >
            <DeleteIcon fontSize="large" />
        </IconButton>
    </div>)
});

export default ActionCellRenderer;
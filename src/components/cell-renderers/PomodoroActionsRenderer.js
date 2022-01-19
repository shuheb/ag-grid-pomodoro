

import { IconButton } from '@mui/material';
import { memo, useContext } from 'react';
import { PomodoroContext } from '../../PomodoroContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
const PomodoroActionsRenderer = memo((props) => {
    // console.log('PomodoroActionsRenderer')
    const { markAsComplete, deletePomodoro, rowData } = useContext(PomodoroContext);

    // const type = props.node.data.type;
    const { id, completed, timerStarted } = props.node.data;

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
    return (
        <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', }}>
            <IconButton
                color='primary'
                disabled={checkIfATimerIsRunning()}
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
                color='primary'
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

        </div>
    )
});
/*

 <button
                disabled={completed}
                onClick={() => markAsComplete({ id })} style={{ color: background }}>
                Mark as complete
            </button> 
             <button onClick={() => deletePomodoro({ id })}>Delete</button> 

            */
export default PomodoroActionsRenderer;
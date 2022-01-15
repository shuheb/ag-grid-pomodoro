

import { Button, IconButton } from '@mui/material';
import { memo, useContext } from 'react';
import { PomodoroContext } from '../../PomodoroContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
const PomodoroActionsRenderer = memo((props) => {
    // console.log('PomodoroActionsRenderer')
    const { markAsComplete, deletePomodoro } = useContext(PomodoroContext);
    const { themes } = props;
    const type = props.node.data.type;
    const { background } = themes[type]
    const { id, completed } = props.node.data;
    return (
        <div style={{ display: 'flex', width: '100%', height: '100%', alignItems:'center', }}>
            <IconButton
                color='primary'
                disabled={completed}
                onClick={() => markAsComplete({ id })}
                aria-label="delete"
                size="small">
                <CheckCircleIcon fontSize="large" />
            </IconButton>
            <IconButton
                color='primary'
                aria-label="delete"
                size="small"
                onClick={() => deletePomodoro({ id })}
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
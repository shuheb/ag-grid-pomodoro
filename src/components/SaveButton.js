import React, { useContext, memo } from 'react';
import { PomodoroContext } from '../context/PomodoroContext';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const SaveButton = memo(props => {
    const { tasks, activeTaskId } = useContext(PomodoroContext);

    // grab reference to the grid so that the component can access the Grid API
    const { gridRef } = props;

    const saveHandler = () => {
        if (activeTaskId) {
            let activeTask = tasks.filter(row => row.id === activeTaskId);
            if (activeTask.length > 0) {
                if (activeTask[0].timerStarted) {
                    gridRef.current.api.showLoadingOverlay();
                    setTimeout(() => {
                        gridRef.current.api.hideOverlay();
                    }, 3000);
                    return;
                }
            }
        }
        localStorage.setItem('gridState', JSON.stringify({ tasks, activeTaskId }));
        alert('Saved Grid State to Local Storage!')
    }

    return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom:'20px' }}>
            <Button
                variant="contained"
                size='large'
                color="primary"
                sx={{ mt: 3 }}
                startIcon={<SaveIcon />}
                onClick={saveHandler}
            >
                Save to Local Storage
            </Button>
        </div>
    )
})

export default SaveButton;
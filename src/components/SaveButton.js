import React, { useContext, memo } from 'react';
import { PomodoroContext } from '../context/PomodoroContext';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useRef } from "react";
import Grid from "./Grid";

const SaveLocalStorageButton = memo(props => {
    const { rowData, activeTaskId } = useContext(PomodoroContext);

    // grab reference to the grid so that the component can access the Grid API
    const gridRef = useRef();

    const saveHandler = () => {
        if (activeTaskId) {
            let activeTask = rowData.filter(row => row.id === activeTaskId);
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
        localStorage.setItem('gridState', JSON.stringify({ rowData, activeTaskId }))
    }

    return (<>
        <Grid gridRef={gridRef} themes={props.themes} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
    </>)
})

export default SaveLocalStorageButton;
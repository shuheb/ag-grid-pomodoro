import React, { useContext, memo, useState } from 'react';
import { PomodoroContext } from '../../context/PomodoroContext';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Box, MenuItem, Button, TextField } from '@mui/material';
import { v4 as generateId } from 'uuid';

const AddTaskCellRenderer = memo((props) => {
    const { dispatch } = useContext(PomodoroContext);
    const [pomodoroCount, setPomodoroCount] = useState(1);
    const [task, setTask] = useState("");
    const [error, setError] = useState(false);

    // dispatch an action to add a new tasks with the task and required pomodoro timers
    const addTaskHandler = (e) => {
        if (task.length < 1) {
            setError(true)
        } else {
            for (let i = 0; i < pomodoroCount; i++) {
                dispatch({ type: 'added_task', id: generateId(), task, taskNo: i + 1, taskCount: pomodoroCount });
            };
            setError(false)
        }
    }

    return (<div
        style={{
            display: 'flex',
            height: '100%',
            justifyContent: 'center'
        }}>
        <div style={{ height: '100%', backgroundColor: '#ffffff1a', display: 'flex', alignItems: 'center' }}>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: 'center',
                    width: '100%',
                    '& .MuiTextField-root': { mx: 3 },
                    '& .MuiButton-root': { mx: 3 },
                }}
            >
                <TextField
                    id="outlined-basic"
                    required
                    autoComplete="off"
                    label="I'm working on..."
                    size="small"
                    variant="outlined"
                    value={task}
                    error={error}
                    onChange={(e) => setTask(e.target.value)}
                />
                <TextField
                    select
                    label="Est. Pomodoros"
                    type={'number'}
                    sx={{ minWidth: 125 }}
                    value={pomodoroCount}
                    onChange={(e) => setPomodoroCount(e.target.value)}
                    size="small"
                    variant="outlined">
                    <MenuItem value={1}>One</MenuItem>
                    <MenuItem value={2}>Two</MenuItem>
                    <MenuItem value={3}>Three</MenuItem>
                    <MenuItem value={4}>Four</MenuItem>
                </TextField>
                <Button
                    variant="contained"
                    size='large'
                    color="primary"
                    startIcon={<AddTaskIcon />}
                    onClick={addTaskHandler}
                >
                    Add Task
                </Button>
            </Box>
        </div>
    </div>)
})

export default AddTaskCellRenderer;
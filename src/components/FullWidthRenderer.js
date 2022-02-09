import React, { useContext, memo, useState } from 'react';
import { PomodoroContext } from '../PomodoroContext';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Box, MenuItem, Button, TextField } from '@mui/material';
const FullWidthRenderer = memo((props) => {
    const { addTask, rowData, currentRow } = useContext(PomodoroContext);
    const [pomodoroCount, setPomodoroCount] = useState(1);
    const [task, setTask] = useState("");
    const [error, setError] = useState(false);

    const onSubmitHandler = (e) => {
        if (task.length < 1) {
            setError(true)
        } else {
            for (let i = 0; i < pomodoroCount; i++) {
                addTask({ task, taskNo: i + 1 })
            };
            setError(false)
        }
    }

    return (<div
        style={{
            display: 'flex',
            height: '100%',
        }}>
        <div style={{ width: '20%' }}></div>
        <div style={{ width: '60%', height: '100%', backgroundColor: '#ffffff1a', display: 'flex', alignItems: 'center' }}>
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
                    onClick={onSubmitHandler}
                >
                    Add Task
                </Button>
            </Box>
            {/* <input type="text" placeholder='what are you working on?' value={task} onChange={(e) => setTask(e.target.value)} />
                {error && (<span>task cannot be empty.</span>)} */}

            {/* <select value={pomodoroCount} onChange={(e) => setPomodoroCount(e.target.value)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>


                <button>Add Task</button> */}
            {/* <form style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-evenly',
            }}
                onSubmit={onSubmitHandler}
            >
            </form> */}
        </div>
        <div style={{ width: '20%', display: 'flex', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center' }}>
                <Button
                    variant="contained"
                    size='large'
                    color="primary"
                    sx={{ mx: 3 }}
                    // startIcon={<AddTaskIcon />}
                    onClick={() => {
                        localStorage.setItem('gridState', JSON.stringify({ rowData, currentRow }))
                    }}
                >
                    Save to Local Storage
                </Button>
            </div>
        </div>
    </div>)
})

// const StatusBar = (props) => {
//     const { addTask } = useContext(PomodoroContext)
//     return (

//         <div className="ag-status-name-value">

//             <button onClick={() => addTask()}>Add Task</button>
//         </div>
//     );

// };

export default FullWidthRenderer;
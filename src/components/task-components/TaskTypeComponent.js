import { Alert, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState, memo } from 'react';
const TaskTypeComponent = memo((props) => {

  const { timerStarted, pomodoroType, setPomodoroType } = props;
  const [showAlert, setShowAlert] = useState(false);

  const onChange = (event, newValue) => {
    if (!newValue) return;
    if (timerStarted) {
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false)
      }, 3000)
      return;
    }
    setPomodoroType(newValue);
  }

  // https://mui.com/components/button-group/
  return (
    <div style={{ paddingBottom: 15 }}>
      <ToggleButtonGroup
        sx={{
          '& .MuiToggleButton-root': { color: 'white !important' },
        }}
        value={pomodoroType}
        exclusive={true}
        onChange={onChange}
      >
        <ToggleButton value="pomodoro">Pomodoro</ToggleButton>
        <ToggleButton value="short_break">Short Break</ToggleButton>
        <ToggleButton value="long_break">Long Break</ToggleButton>
      </ToggleButtonGroup>
      {showAlert && <div style={{ paddingTop: 15 }}><Alert severity="warning">The timer is still running. - stop timer before switching</Alert></div>}
    </div>
  )

});

export default TaskTypeComponent;
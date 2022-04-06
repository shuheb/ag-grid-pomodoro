import './App.css';
import MainTask from './components/MainTask';
import { useMemo, useRef } from 'react';
import { PomodoroProvider } from './context/PomodoroContext';
import SaveButton from './components/SaveButton';
import PomodoroGrid from './components/PomodoroGrid';

const App = () => {
  const gridRef = useRef(null);

  const themes = useMemo(() => ({
    pomodoro: {
      foreground: '#ffffff',
      background: '#d95550',
    },
    short_break: {
      foreground: '#ffffff',
      background: '#1565c0',
    },
    long_break: {
      foreground: '#ffffff',
      background: '#ab47bc'

    },
    completed: {
      foreground: '#ffffff',
      background: '#4caf50'
    }
  }), []);

  return (
    <>
      <PomodoroProvider>
        <MainTask themes={themes} />
        <PomodoroGrid gridRef={gridRef} themes={themes} />
        <SaveButton gridRef={gridRef} />
      </PomodoroProvider>
    </>
  );
}

export default App;

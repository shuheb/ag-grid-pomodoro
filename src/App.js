import './App.css';
import MainTaskComponent from './components/MainTaskComponent';
import { useMemo } from 'react';
import { PomodoroProvider } from './context/PomodoroContext';
import SaveLocalStorageButton from './components/SaveButton';

const App = () => {
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
    <div style={{ height: '100%', width: '100%' }}>
      <PomodoroProvider>
        <MainTaskComponent themes={themes} />

        <SaveLocalStorageButton themes={themes} />
      </PomodoroProvider>
    </div>
  );
}

export default App;

import './App.scss';
import MainTaskComponent from './components/MainTaskComponent';
import Grid from './components/Grid';
import { useMemo } from 'react';
import { PomodoroProvider } from './context/PomodoroContext';



const App = () => {
  const themes = useMemo(() => ({
    pomodoro: {
      foreground: '#ffffff',
      // background: '#d32f2f'
      background: '#d95550',
      // background: '#d32f2f',
    },
    short_break: {
      foreground: '#ffffff',
      // background:'#0288d1'
      background: '#1565c0',
    },
    long_break: {
      foreground: '#ffffff',
      background: '#ab47bc'
      // background: '#7b1fa2',

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
        <Grid themes={themes} />
      </PomodoroProvider>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Clock } from 'lucide-react';

const PomodoroTracker = () => {
  const [timeLeft, setTimeLeft] = useState(40 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(40);
  
  const intervalRef = useRef(null);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      if (timeLeft === 0) {
        setIsRunning(false);
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const stopTimer = () => {
    setIsRunning(false);
    setTimeLeft(customMinutes * 60);
  };

  const setCustomTime = () => {
    setTimeLeft(customMinutes * 60);
    setIsRunning(false);
  };

  const setBreak = (minutes) => {
    setTimeLeft(minutes * 60);
    setIsRunning(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      {/* Timer Display */}
      <div className="text-center mb-6">
        <div className="text-4xl font-mono font-bold text-gray-800 mb-2">
          {formatTime(timeLeft)}
        </div>
        <div className="text-sm text-gray-500">
          {timeLeft === 0 ? 'Time\'s up!' : isRunning ? 'Running' : 'Paused'}
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={startTimer}
          disabled={timeLeft === 0}
          className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <Play size={16} />
          Start
        </button>
        <button
          onClick={pauseTimer}
          className="flex items-center gap-1 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
        >
          <Pause size={16} />
          Pause
        </button>
        <button
          onClick={stopTimer}
          className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          <Square size={16} />
          Stop
        </button>
      </div>

      {/* Time Presets */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock size={16} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Quick Set:</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBreak(10)}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          >
            10m Break
          </button>
          <button
            onClick={() => setBreak(60)}
            className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
          >
            1hr Break
          </button>
          <input
            type="number"
            value={customMinutes}
            onChange={(e) => setCustomMinutes(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max="120"
            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
          />
          <span className="text-sm text-gray-600">min</span>
          <button
            onClick={setCustomTime}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Set
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <PomodoroTracker />
    </div>
  );
}

export default App;

import React, { useState, useRef } from 'react';
import './stopwatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stopped, setStopped] = useState(false);
  const timerRef = useRef(null);

  const startPauseHandler = () => {
    if (isPlaying) {
      clearInterval(timerRef.current);
    } else {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    setIsPlaying(!isPlaying);
  };

  const stopHandler = () => {
    clearInterval(timerRef.current);
    setIsPlaying(false);
    setStopped(true); 

    setTimeout(() => {
      setTime(0);
      setStopped(false); 
    }, 2000); 
  };

  const resetHandler = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setIsPlaying(false);
    setStopped(false);
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / 1000 / 60 / 60) % 24);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
  };

  return (
    <div className="stopwatch">
      <p className='time'>{formatTime(time)}</p>
      <div className="action-buttons">
        <button onClick={startPauseHandler}>
          {isPlaying ? 'Pause' : 'Start'}
        </button>
        <button onClick={stopHandler}>Stop</button>
        <button onClick={resetHandler}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;

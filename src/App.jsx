import { useState, useEffect, useCallback, memo } from "react";

// Countdown Component
const CountdownTimer = memo(({ initialTime, onComplete, onRemove }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isPaused) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      onComplete(); // Call onComplete when the countdown finishes
    }
  }, [timeLeft, isPaused, onComplete]);

  const handlePause = () => setIsPaused((prev) => !prev);
  const handleReset = () => setTimeLeft(initialTime);

  return (
    <div>
      <h2>{timeLeft} seconds left</h2>
      <button onClick={handlePause}>{isPaused ? "Resume" : "Pause"}</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
});

// Main App Component
const App = () => {
  const [timers, setTimers] = useState([10, 20, 30]); // Initial countdown times in seconds

  const handleTimerComplete = useCallback(() => {
    console.log("A timer has completed!");
  }, []);

  const handleRemoveTimer = useCallback((index) => {
    setTimers((prevTimers) => prevTimers.filter((_, i) => i !== index));
  }, []);

  return (
    <div>
      <h1>Countdown Timers</h1>
      {timers.map((time, index) => (
        <CountdownTimer
          key={index}
          initialTime={time}
          onComplete={handleTimerComplete}
          onRemove={() => handleRemoveTimer(index)}
        />
      ))}
    </div>
  );
};

export default App;

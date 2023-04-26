import { useState } from 'react'

function Beater() {
  let tempo = 1000
  const [sixteenth, setSixteenth] = useState<number>(0)
  const [intervalId, setIntervalId] = useState<number>()

  const startTimer = (): void => {
    const newIntervalId = setInterval(() => {
      setSixteenth((steps) => steps + 1)
    }, tempo)
    setIntervalId(newIntervalId)
  }

  const stopTimer = (): void => {
    clearInterval(intervalId)
    setIntervalId(undefined)
  }

  const handleSetTempo = (): void => {
    stopTimer()
    tempo = 100
    startTimer()
  }

  return (
    <>
      <div>{tempo}</div>
      {intervalId ? (
        <button onClick={stopTimer}>Stop</button>
      ) : (
        <button onClick={startTimer}>Start</button>
      )}
      <button onClick={handleSetTempo}>Set tempo</button>
      <br />
      {sixteenth}
    </>
  )
}

export default Beater

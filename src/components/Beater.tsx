import { useState } from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

function Beater() {
  const [tempo, setTempo] = useState<number>(1000)
  const [sixteenth, setSixteenth] = useState<number>(0)
  const [intervalId, setIntervalId] = useState<number>()

  const startTimer = (): void => {
    const newIntervalId = setInterval(() => {
      setSixteenth((steps) => steps + 1)
    }, 60000 / tempo)
    setIntervalId(newIntervalId)
  }

  const stopTimer = (): void => {
    clearInterval(intervalId)
    setIntervalId(undefined)
  }

  const handleSetTempo = (): void => {
    stopTimer()
    startTimer()
  }

  const handleTempoChange = (event: Event, newValue: number | number[]): void => {
    setTempo(newValue as number)
  }

  return (
    <>
      <div>{Math.round(tempo)} bpm</div>
      {intervalId ? (
        <button onClick={stopTimer}>Stop</button>
      ) : (
        <button onClick={startTimer}>Start</button>
      )}
      <br />
      {sixteenth}
      <Box width={300}>
        <Slider
          min={10}
          max={210}
          defaultValue={50}
          aria-label='Default'
          valueLabelDisplay='auto'
          onChange={handleTempoChange}
          onMouseDown={stopTimer}
          onMouseUp={startTimer}
        />
      </Box>
    </>
  )
}

export default Beater

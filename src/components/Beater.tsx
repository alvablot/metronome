import { useState, useRef } from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import kick1 from '../assets/samples/kick_close02.wav'
import snr1 from '../assets/samples/snr_ring01.wav'

function Beater() {
  const [tempo, setTempo] = useState<number>(120)
  const [sixteenth, setSixteenth] = useState<number>(0)
  const [intervalId, setIntervalId] = useState<number>()
  const audioRef = useRef<HTMLAudioElement>(null)
  const bpm = 60000 / tempo
  const playSound = (drum: string): void => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }

  const startTimer = (): void => {
    const newIntervalId = setInterval(() => {
      setSixteenth((steps) => steps + 1)
      playSound(kick1)
    }, bpm)
    setIntervalId(newIntervalId)
  }

  const stopTimer = (): void => {
    clearInterval(intervalId)
    setIntervalId(undefined)
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
          defaultValue={120}
          aria-label='Default'
          valueLabelDisplay='auto'
          onChange={handleTempoChange}
          onMouseDown={stopTimer}
          onMouseUp={startTimer}
        />
      </Box>
      <br />
      <audio ref={audioRef} src={kick1} preload='auto' />
 
    </>
  )
}

export default Beater

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import kick1 from '../assets/samples/kick_close02.wav'
import snr1 from '../assets/samples/snr_ring01.wav'

function Beater() {
  const [tempo, setTempo] = useState<number>(120)
  const [sixteenth, setSixteenth] = useState<number>(0)
  const [intervalId, setIntervalId] = useState<number | undefined>()
  const audioRefKick = useRef<HTMLAudioElement>(null)
  const audioRefSnr = useRef<HTMLAudioElement>(null)
  const startTempo = 120
  const [bpm, setBpm] = useState(120000 / startTempo)

  const playKick = (): void => {
    if (audioRefKick.current) {
      audioRefKick.current.currentTime = 0
      audioRefKick.current.play()
    }
  }

  const playSnr = (): void => {
    if (audioRefSnr.current) {
      audioRefSnr.current.currentTime = 0
      audioRefSnr.current.play()
    }
  }

  const startTimer = (): void => {
    const newIntervalId = setInterval(() => {
      setSixteenth((steps) => steps + 1)
      playKick()
      setTimeout(() => {
        playSnr()
      }, bpm / 2)
    }, bpm)
    setIntervalId(newIntervalId)
  }

  const stopTimer = (): void => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(undefined)
    }
  }

  const handleTempoChange = (event: Event, newValue: number | number[]): void => {
    setTempo(newValue as number)
  }

  useEffect(() => {
    setBpm(120000 / tempo)
    if (intervalId) {
      stopTimer()
      startTimer()
    }
  }, [tempo])

  return (
    <>
      <div>{Math.round(tempo)} bpm</div>
      {intervalId ? <button onClick={stopTimer}>Stop</button> : <button onClick={startTimer}>Start</button>}
      <br />
      {sixteenth}
      <Box width={300}>
        <Slider min={10} max={210} defaultValue={startTempo} aria-label='Default' valueLabelDisplay='auto' onChange={handleTempoChange} />
      </Box>
      <br />
      <audio ref={audioRefKick} src={kick1} preload='auto' />
      <audio ref={audioRefSnr} src={snr1} preload='auto' />
    </>
  )
}

export default Beater

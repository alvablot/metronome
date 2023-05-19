/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { Howl } from 'howler'
import kick1 from '../assets/samples/kick_close02.wav'
import snr1 from '../assets/samples/snr_ring01.wav'

function Beater() {
  const [tempo, setTempo] = useState<number>(120)
  const [intervalId, setIntervalId] = useState<number | undefined>()
  const kickSound = useRef<Howl | null>(null)
  const snrSound = useRef<Howl | null>(null)
  const startTempo = 120
  const [bpm, setBpm] = useState(7500 / startTempo)

  const kickArray: boolean[] = [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, false, false, false, false, false, false, true, false, true, false, false, false, false, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, false, false, false, false, false, false, true, false, true, false, false, false, false, false]
  const snrArray: boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false]
  let timeIndicator = 0

  const loadSounds = (): void => {
    kickSound.current = new Howl({ src: [kick1] })
    snrSound.current = new Howl({ src: [snr1] })
  }

  const playKick = (): void => {
    if (kickSound.current) {
      kickSound.current.play()
    }
  }

  const playSnr = (): void => {
    if (snrSound.current) {
      snrSound.current.play()
    }
  }

  const startTimer = (): void => {
    const newIntervalId = setInterval(() => {
      console.log(snrArray[timeIndicator])
      if (snrArray[timeIndicator]) playSnr()
      if (kickArray[timeIndicator]) playKick()
      timeIndicator = (timeIndicator + 1) % 32
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
    setBpm(7500 / tempo)
    if (intervalId) {
      stopTimer()
      startTimer()
    }
  }, [tempo])

  useEffect(() => {
    loadSounds()
  }, [])

  return (
    <>
      <div>{Math.round(tempo)} bpm</div>
      {intervalId ? <button onClick={stopTimer}>Stop</button> : <button onClick={startTimer}>Start</button>}
      <br />
      {timeIndicator}
      <Box width={300}>
        <Slider min={10} max={210} defaultValue={startTempo} aria-label='Default' valueLabelDisplay='auto' onChange={handleTempoChange} />
      </Box>
      <br />
    </>
  )
}

export default Beater

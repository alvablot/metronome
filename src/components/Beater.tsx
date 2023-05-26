/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { Howl } from 'howler'
import kick1 from '../assets/samples/kick_close02.wav'
import snr1 from '../assets/samples/snr_ring01.wav'
import hh1 from '../assets/samples/hh cls-tip_95.wav'
import Checkbox from '@mui/material/Checkbox'

function Beater() {
  const [tempo, setTempo] = useState<number>(120)
  const [intervalId, setIntervalId] = useState<number | undefined>()
  const kickSound = useRef<Howl | null>(null)
  const snrSound = useRef<Howl | null>(null)
  const hhSound = useRef<Howl | null>(null)
  const startTempo = 120
  const [bpm, setBpm] = useState(7500 / startTempo)
  const [time, setTime] = useState<number>(0)
  const thirtytwoTrippleNote = 1
  const sixteetnhTrippleNote = 2
  const eigthTrippleNote = 4
  const quarterTrippleNote = 8
  const sixteetnhNote = 3
  const eighthNote = 6
  const quarterNote = 12
  const [snrNoteLength, setSnrNoteLength] = useState<number>(sixteetnhNote) //

  const kickArrayLength = 192 / 2 // Desired length of the array
  const generatedKickArray = Array(kickArrayLength).fill(false)
  for (let i = 0; i < kickArrayLength; i += 6) {
    generatedKickArray[i] = true
  }

  const [kickArray, setKickArray] = useState<boolean[]>(generatedKickArray)

  const [snrArray, setSnrArray] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
  ])

  const [hhArray, setHhArray] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
  ])
  const barLength = kickArray.length / 4
  let timeIndicator = 0

  const handleKickChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedKickArray = [...kickArray]
      updatedKickArray[index] = event.target.checked
      setKickArray(updatedKickArray)
    }

  const handleSnrChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedSnrArray = [...snrArray]
      updatedSnrArray[index] = event.target.checked
      setSnrArray(updatedSnrArray)
    }

  const handleHhChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedHhArray = [...hhArray]
      updatedHhArray[index] = event.target.checked
      setHhArray(updatedHhArray)
    }

  const loadSounds = (): void => {
    kickSound.current = new Howl({ src: [kick1] })
    snrSound.current = new Howl({ src: [snr1] })
    hhSound.current = new Howl({ src: [hh1] })
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

  const playHh = (): void => {
    if (hhSound.current) {
      hhSound.current.play()
    }
  }

  const startTimer = (): void => {
    const newIntervalId = setInterval(() => {
      console.log(snrArray[timeIndicator])

      if (kickArray[timeIndicator]) playKick()
      // if (snrArray[timeIndicator]) playSnr()
      // if (hhArray[timeIndicator]) playHh()
      timeIndicator = (timeIndicator + 1) % kickArray.length
      if (timeIndicator > 0) setTime(timeIndicator)
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
  }, [tempo, kickArray, snrArray, hhArray])

  useEffect(() => {
    loadSounds()
  }, [])

  return (
    <>
      {intervalId ? (
        <button onClick={stopTimer}>Stop</button>
      ) : (
        <button onClick={startTimer}>Start</button>
      )}
      <br />
      Counter {Math.ceil(time / barLength)}
      <div>{Math.round(tempo)} bpm</div>
      <div className='tempo-slider'>
        <Box width={300}>
          <Slider
            min={10}
            max={210}
            defaultValue={startTempo}
            aria-label='Default'
            valueLabelDisplay='auto'
            onChange={handleTempoChange}
          />
        </Box>
      </div>
      <div>
        {/* {hhArray.map((hh, index) => (
          <span key={index}>
            <Checkbox id={`hh-${index}`} checked={hh} onChange={handleHhChange(index)} />
            {index % barLength === barLength - 1 ? ' | ' : ''}
          </span>
        ))} */}
        <br />
        <button
          className={snrNoteLength === eighthNote ? 'active-note' : 'note'}
          onClick={() => {
            setSnrNoteLength(eighthNote)
          }}
        >
          8th
        </button>

        <button
          className={snrNoteLength === sixteetnhNote ? 'active-note' : 'note'}
          onClick={() => {
            setSnrNoteLength(sixteetnhNote)
          }}
        >
          16th
        </button>
        <button
          className={snrNoteLength === eigthTrippleNote ? 'active-note' : 'note'}
          onClick={() => {
            setSnrNoteLength(eigthTrippleNote)
          }}
        >
          8th triplets
        </button>
        <button
          className={snrNoteLength === sixteetnhTrippleNote ? 'active-note' : 'note'}
          onClick={() => {
            setSnrNoteLength(sixteetnhTrippleNote)
          }}
        >
          16th triplets
        </button>
        {/* <button
        className={snrNoteLength === eighthNote ? 'active-note' : ''}
          onClick={() => {
            setSnrNoteLength(thirtytwoTrippleNote)
          }}
        >
          32th triplets
        </button> */}

        <br />
        {kickArray.map((kick, index) => (
          <span key={index}>
            {(index % snrNoteLength === 0 || index === 0) && (
              <input
                type='checkbox'
                id={`kick-${index}`}
                checked={kick}
                onChange={handleKickChange(index)}
              />
            )}
            {index % 48 === 47 && <b> | </b>}
          </span>
        ))}
        {/* 
        <br />
        {snrArray.map((snr, index) => (
          <span key={index}>
            <Checkbox
              id={`snr-${index}`}
              checked={snr}
              onChange={handleSnrChange(index)}
            />
            {index % barLength === barLength - 1 ? ' | ' : ''}
          </span>
        ))} */}
      </div>
    </>
  )
}

export default Beater

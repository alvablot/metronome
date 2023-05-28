/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { Howl } from 'howler'
import kick1 from '../assets/samples/kick_1.wav'
import kick2 from '../assets/samples/kick_2.wav'
import kick3 from '../assets/samples/kick_3.wav'
import snr1 from '../assets/samples/snr_1.wav'
import snr2 from '../assets/samples/snr_2.wav'
import snr3 from '../assets/samples/snr_3.wav'
import hh1 from '../assets/samples/hh_1.wav'
import hh2 from '../assets/samples/hh_2.wav'
import hh3 from '../assets/samples/hh_3.wav'
import rim from '../assets/samples/snare_rim_01.wav'
import Checkbox from '@mui/material/Checkbox'

function Beater() {
  const [tempo, setTempo] = useState<number>(120)
  const [intervalId, setIntervalId] = useState<number | undefined>()

  const kickSound = useRef<Howl[] | null[]>([null, null, null])
  const snrSound = useRef<Howl[] | null[]>([null, null, null])
  const hhSound = useRef<Howl[] | null[]>([null, null, null])

  const startTempo = 120
  const [bpm, setBpm] = useState(3750 / startTempo)
  const [time, setTime] = useState<number>(0)
  const thirtytwoTrippleNote = 1
  const sixteetnhTrippleNote = 2
  const eigthTrippleNote = 4
  const quarterTrippleNote = 8
  const sixteetnhNote = 3
  const eighthNote = 6
  const quarterNote = 12
  const [kickNoteLength, setKickNoteLength] = useState<number>(sixteetnhNote) //
  const [snrNoteLength, setSnrNoteLength] = useState<number>(sixteetnhNote) //
  const [hhNoteLength, setHhNoteLength] = useState<number>(sixteetnhNote) //
  const [colorIndicator, setColorIndicator] = useState<number>(0)

  const [updatedSnr, setUpdatedSnr] = useState<number>(0)

  const [numberOfBars, setNumbersOfBars] = useState<number>(1)
  const patternLength = numberOfBars * 48 // Desired length of the array

  const [timeSignature, setTimeSignature] = useState<number>(3)

  const generatedKickArray = Array(patternLength).fill(0)
  for (let i = 0; i < patternLength; i += 48) {
    generatedKickArray[i] = 1
  }

  const [kickArray, setKickArray] = useState<number[]>(generatedKickArray)
  const kickArrayRef = useRef<number[]>(kickArray)

  const generatedSnrArray = Array(patternLength).fill(0)
  for (let i = 24; i < patternLength; i += 48) {
    generatedSnrArray[i] = 1
  }
  const [snrArray, setSnrArray] = useState<number[]>(generatedSnrArray)
  const snrArrayRef = useRef<number[]>(snrArray)

  const generatedHhArray = Array(patternLength).fill(0)
  for (let i = 0; i < patternLength; i += 12) {
    generatedHhArray[i] = 1
  }
  const [hhArray, setHhArray] = useState<number[]>(generatedHhArray)
  const hhArrayRef = useRef<number[]>(hhArray)

  const barLength = kickArray.length / timeSignature
  let timeIndicator = 0

  const handleKickChange = (index: number) => (): void => {
    const updatedKickArray = [...kickArray]
    const currentValue = updatedKickArray[index]
    const newValue = (currentValue + 1) % 4

    updatedKickArray[index] = newValue
    setKickArray(updatedKickArray)
  }

  const handleSnrChange = (index: number) => (): void => {
    const updatedSnrArray = [...snrArray]
    const currentValue = updatedSnrArray[index]
    const newValue = (currentValue + 1) % 4

    updatedSnrArray[index] = newValue
    setSnrArray(updatedSnrArray)
  }

  const handleHhChange = (index: number) => (): void => {
    const updatedHhArray = [...hhArray]
    const currentValue = updatedHhArray[index]
    const newValue = (currentValue + 1) % 4

    updatedHhArray[index] = newValue
    setHhArray(updatedHhArray)
  }

  const loadSounds = (): void => {
    kickSound.current[0] = new Howl({ src: [kick1] })
    kickSound.current[1] = new Howl({ src: [kick2] })
    kickSound.current[2] = new Howl({ src: [kick3] })
    snrSound.current[0] = new Howl({ src: [snr2] })
    snrSound.current[1] = new Howl({ src: [snr1] })
    snrSound.current[2] = new Howl({ src: [snr3] })
    hhSound.current[0] = new Howl({ src: [hh1] })
    hhSound.current[1] = new Howl({ src: [hh2] })
    hhSound.current[2] = new Howl({ src: [hh3] })
  }

  const playKick = (index: number): void => {
    if (kickSound.current[0]) {
      if (kickArrayRef.current[index] === 1) kickSound.current[0].play()
      if (kickArrayRef.current[index] === 2) kickSound.current[1].play()
      if (kickArrayRef.current[index] === 3) kickSound.current[2].play()
    }
  }

  const playSnr = (index: number): void => {
    if (snrSound.current[0]) {
      if (snrArrayRef.current[index] === 1) snrSound.current[0].play()
      if (snrArrayRef.current[index] === 2) snrSound.current[1].play()
      if (snrArrayRef.current[index] === 3) snrSound.current[2].play()
    }
  }

  const playHh = (index: number): void => {
    if (kickSound.current[0]) {
      if (hhArrayRef.current[index] === 1) hhSound.current[0].play()
      if (hhArrayRef.current[index] === 2) hhSound.current[1].play()
      if (hhArrayRef.current[index] === 3) hhSound.current[2].play()
    }
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

  const startTimer = (): void => {
    const newIntervalId = setInterval(() => {
      setColorIndicator(timeIndicator)
      timeIndicator = (timeIndicator + 1) % kickArray.length
      if (timeIndicator === 0) setTime(0)

      playKick(timeIndicator)
      playSnr(timeIndicator)
      playHh(timeIndicator)
    }, bpm)

    setIntervalId(newIntervalId)
  }

  useEffect(() => {
    setBpm(3750 / tempo)
    if (intervalId) {
      stopTimer()
      startTimer()
    }
  }, [tempo])

  useEffect(() => {
    kickArrayRef.current = kickArray
  }, [kickArray])

  useEffect(() => {
    snrArrayRef.current = snrArray
  }, [snrArray])

  useEffect(() => {
    hhArrayRef.current = hhArray
  }, [hhArray])

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
      Counter {Math.ceil(time / 12)}
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
        Kick drum
        <br />
        <button
          className={kickNoteLength === eighthNote ? 'active-note' : 'note'}
          onClick={() => {
            setKickNoteLength(eighthNote)
          }}
        >
          8th
        </button>
        <button
          className={kickNoteLength === eigthTrippleNote ? 'active-note' : 'note'}
          onClick={() => {
            setKickNoteLength(eigthTrippleNote)
          }}
        >
          8th triplets
        </button>
        <button
          className={kickNoteLength === sixteetnhNote ? 'active-note' : 'note'}
          onClick={() => {
            setKickNoteLength(sixteetnhNote)
          }}
        >
          16th
        </button>
        <button
          className={kickNoteLength === sixteetnhTrippleNote ? 'active-note' : 'note'}
          onClick={() => {
            setKickNoteLength(sixteetnhTrippleNote)
          }}
        >
          16th triplets
        </button>
        <br />
        <div className='select-row'>
          <div>
            <div className='bar-stroke'> | </div>
            {kickArray.map((kick, index) => (
              <span key={index}>
                {(index % kickNoteLength === 0 || index === 0) && (
                  <span
                    className={
                      colorIndicator === index ? 'active-indicator' : 'inactive-indicator'
                    }
                  >
                    <button
                      key={`kick-${index}`}
                      className={`button-${kick}`}
                      onClick={handleKickChange(index)}
                    >
                      {kick}
                    </button>
                  </span>
                )}
                {index % 48 === 47 && <div className='bar-stroke'> | </div>}
              </span>
            ))}
          </div>
        </div>
        <br />
        <br />
        Snare drum
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
          className={snrNoteLength === eigthTrippleNote ? 'active-note' : 'note'}
          onClick={() => {
            setSnrNoteLength(eigthTrippleNote)
          }}
        >
          8th triplets
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
          className={snrNoteLength === sixteetnhTrippleNote ? 'active-note' : 'note'}
          onClick={() => {
            setSnrNoteLength(sixteetnhTrippleNote)
          }}
        >
          16th triplets
        </button>
        <br />
        <div className='select-row'>
          <div>
            <div className='bar-stroke'> | </div>
            {snrArray.map((snr, index) => (
              <span key={index}>
                {(index % snrNoteLength === 0 || index === 0) && (
                  <span
                    className={
                      colorIndicator === index ? 'active-indicator' : 'inactive-indicator'
                    }
                  >
                    <button
                      key={`snr-${index}`}
                      className={`button-${snr}`}
                      onClick={handleSnrChange(index)}
                    >
                      {snr}
                    </button>
                  </span>
                )}
                {index % 48 === 47 && <div className='bar-stroke'> | </div>}
              </span>
            ))}
          </div>
        </div>
        <br />
        <br />
        Hi-hat
        <br />
        <button
          className={hhNoteLength === eighthNote ? 'active-note' : 'note'}
          onClick={() => {
            setHhNoteLength(eighthNote)
          }}
        >
          8th
        </button>
        <button
          className={hhNoteLength === eigthTrippleNote ? 'active-note' : 'note'}
          onClick={() => {
            setHhNoteLength(eigthTrippleNote)
          }}
        >
          8th triplets
        </button>
        <button
          className={hhNoteLength === sixteetnhNote ? 'active-note' : 'note'}
          onClick={() => {
            setHhNoteLength(sixteetnhNote)
          }}
        >
          16th
        </button>
        <button
          className={hhNoteLength === sixteetnhTrippleNote ? 'active-note' : 'note'}
          onClick={() => {
            setHhNoteLength(sixteetnhTrippleNote)
          }}
        >
          16th triplets
        </button>
        <br />
        <div className='select-row'>
          <div>
            <div className='bar-stroke'> | </div>
            {hhArray.map((hh, index) => (
              <span key={index}>
                {(index % hhNoteLength === 0 || index === 0) && (
                  <span
                    className={
                      colorIndicator === index ? 'active-indicator' : 'inactive-indicator'
                    }
                  >
                    <button
                      key={`hh-${index}`}
                      className={`button-${hh}`}
                      onClick={handleHhChange(index)}
                    >
                      {hh}
                    </button>
                  </span>
                )}
                {index % 48 === 47 && <div className='bar-stroke'> | </div>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Beater

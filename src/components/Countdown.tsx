import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from '../styles/components/Countdown.module.css'

import { useChallenge } from '../hooks/challenges'

let countdownTimeout: NodeJS.Timeout;

export function Countdown(): JSX.Element {

  const { startNewChallenge, activeChallenge } = useChallenge()

  const [time, setTime] = useState(0.1 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = useMemo(() => Math.floor(time / 60), [time]);
  const seconds = useMemo(() => time % 60 , [time])
  const [minuteLeft, minuteRight] = useMemo(() => 
    String(minutes)
      .padStart(2, '0')
      .split(''), 
    [minutes]
  )
  const [secondLeft, secondRight] = useMemo(() => 
    String(seconds)
      .padStart(2, '0')
      .split(''), 
    [seconds]
  )

  const handleStartCountdown = useCallback(() => {
    setIsActive(true);
  },[])

  const handleResetCountdown = useCallback(() => {
    clearTimeout(countdownTimeout);
    setIsActive(false)
    setTime(0.1 * 60)
  },[countdownTimeout])

  useEffect(() => {
    if(!activeChallenge) {
      setIsActive(false);
      setTime(0.1 * 60)
      setHasFinished(false)
    }
  },[activeChallenge])

  useEffect(() =>{
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  },[isActive, time, startNewChallenge])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button 
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado 
        </button>
      ) : (
        <>
          {isActive ? (
            <button 
              type="button" 
              onClick={handleResetCountdown}
              className={`${styles.countdownButton} ${styles.active}`}
            >
              Abandorar ciclo 
              
            </button>
          ) : (
            <button 
              type="button" 
              onClick={handleStartCountdown}
              className={`${styles.countdownButton} ${styles}`}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      ) }
    </div>
  )
}

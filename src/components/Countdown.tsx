import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from '../styles/components/Countdown.module.css'

import { useCountdown } from '../hooks/countdown';

export function Countdown(): JSX.Element {

  const { 
    minutes, 
    seconds, 
    hasCountdownFinished, 
    isCountdownActive,
    resetCountdown,
    startCountdown 
  } = useCountdown()
  
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

      {hasCountdownFinished ? (
        <button 
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado 
        </button>
      ) : (
        <>
          {isCountdownActive ? (
            <button 
              type="button" 
              onClick={resetCountdown}
              className={`${styles.countdownButton} ${styles.active}`}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button 
              type="button" 
              onClick={startCountdown}
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

import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from '../styles/components/Countdown.module.css'

export function Countdown(): JSX.Element {

  const [time, setTime] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)

  const minutes = useMemo(() => Math.floor(time / 60), [time]);
  const seconds = useMemo(() => time % 60 , [time])

  const [minuteLeft, minuteRight] = useMemo(() => 
    String(minutes)
      .padEnd(2, '0')
      .split(''), 
    [minutes]
  )

  const [secondLeft, secondRight] = useMemo(() => 
    String(seconds)
      .padEnd(2, '0')
      .split(''), 
    [seconds]
  )

  const handleStartCountdown = useCallback(() => {
    setIsActive(true);
  },[])

  useEffect(() =>{
    if(isActive && time > 0) {
      setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    }
  },[isActive, time])

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

      <button 
        type="button" 
        onClick={handleStartCountdown}
        className={styles.countdownButton}
      >
        Iniciar um ciclo
      </button>
    </div>
  )
}

import { useChallenge } from '../hooks/challenges'
import styles from '../styles/components/Profile.module.css'

export function Profile(){
  const { level } = useChallenge()
  return (
    <div className={styles.profileContainer} >
      <img src="https://github.com/rennand.png" alt="Rennan Douglas"/>

      <div>
        <strong>Rennan Douglas</strong>
        <p>
          <img src="icons/level.svg" alt="Level Up"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}

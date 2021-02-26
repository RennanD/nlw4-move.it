import { useChallenge } from '../hooks/challenges';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal(): JSX.Element {

  const { level, toggleModal } = useChallenge()

  return(
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo nível</p>

        <button onClick={toggleModal} type="button">
          <img src="/icons/close.svg" alt=""/>
        </button>
      </div>
    </div>
  )
}

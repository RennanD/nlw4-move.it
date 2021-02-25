import { useChallenge } from '../hooks/challenges';

import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(): JSX.Element {

  const { activeChallenge, resetChallenge, completChallenge } = useChallenge()

  return (
    <div className={styles.challengeBoxContainer}>
      {!!activeChallenge ? (
        <div className={styles.chanllegeActive}>
          <header>Ganhe {activeChallenge.amount}xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="Body"/>
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button 
              type="button"
              onClick={resetChallenge}
              className={styles.challengeFailedButton}
            >
              Falhei
            </button>
            <button
              type="button"
              onClick={() => completChallenge(activeChallenge.amount)}
              className={styles.challengeSucceedButton}
            >Completei</button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>

          <p>
            <img src="icons/level-up.svg" alt="Level up"/>
            Avance de level completando os desafios
          </p>
        </div>
      )}
      
    </div>
  );
}

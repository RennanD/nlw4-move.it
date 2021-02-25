import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(): JSX.Element {

  const hasActiveChallenge = true

  return (
    
    <div className={styles.challengeBoxContainer}>
      {hasActiveChallenge ? (
        <div className={styles.chanllegeActive}>
          <header>Ganhe 400xp</header>
          <main>
            <img src="icons/body.svg" alt="Body"/>
            <strong>Novo desafio</strong>
            <p>Levante e faça uma caminha de 3 minutos</p>
          </main>
          <footer>
            <button 
              type="button"
              className={styles.challengeFailedButton}
            >
              Falhei
            </button>
            <button
              type="button"
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

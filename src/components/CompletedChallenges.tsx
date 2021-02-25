import { useChallenge } from '../hooks/challenges';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges(): JSX.Element {

  const { challengesCompleted } = useChallenge()

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}

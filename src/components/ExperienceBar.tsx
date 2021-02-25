import { useMemo } from 'react';
import { useChallenge } from '../hooks/challenges';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  
  const { currentExperience } = useChallenge()

  const percentExperience = useMemo(() => (currentExperience * 100) / 600 , [currentExperience])

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentExperience}%` }} />
        <span className={styles.currentExperience} style={{ left: `${percentExperience}%` }}>
          {currentExperience > 0 && `${currentExperience}xp`}
        </span>
      </div>
      
    </header>
  );
}

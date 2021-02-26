import Head from "next/head"
import { GetServerSideProps } from "next"

import styles from '../styles/components/Home.module.css'

import { ChallengeBox } from "../components/ChallengeBox"
import { CompletedChallenges } from "../components/CompletedChallenges"
import { Countdown } from "../components/Countdown"
import { ExperienceBar } from "../components/ExperienceBar"
import { Profile } from "../components/Profile"
import { CountdownProvider } from "../hooks/countdown"

import { ChallengeProvider } from "../hooks/challenges"

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}


export default function Home(
  {level,challengesCompleted, currentExperience}: HomeProps
) {
  return (
    <ChallengeProvider
      level={level}
      challengesCompleted={challengesCompleted}
      currentExperience={currentExperience}
    >
      <div className={styles.container}>

        <Head>
          <title>Iníco | Move.it</title>
        </Head>
        <ExperienceBar />

        <section>
        <CountdownProvider>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </CountdownProvider>
        </section>

      </div>
    </ChallengeProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, currentExperience, challengesCompleted } = context.req.cookies
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}

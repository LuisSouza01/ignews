import type { NextPage } from 'next';

import styles from './home.module.scss';

const Home: NextPage = () => {
  return (
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👏 Hey, welcome</span>
        <h1>New about the <span>React</span> world.</h1>

        <p>
          Get access to all the publications <br />
          <span>for $9.90 month</span>
        </p>
      </section>

      <img src="/images/avatar.svg" alt="Girl Coding" />
    </main>
  )
}

export default Home

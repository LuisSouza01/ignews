import { GetServerSideProps } from 'next';

import { stripe } from '../services/stripe';
import { SubscribeButton } from '../components/SubscribeButton';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👏 Hey, welcome</span>
        <h1>New about the <span>React</span> world.</h1>

        <p>
          Get access to all the publications <br />
          <span>for {product.amount} month</span>
        </p>

        <SubscribeButton priceId={product.priceId} />
      </section>

      <img src="/images/avatar.svg" alt="Girl Coding" />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1LIUObLTx4MkV7rn4gShHiTY');

  const convertPrice = price.unit_amount ? price.unit_amount  / 100 : 0;

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(convertPrice)
  }

  return {
    props: {
      product,
    }
  }
}
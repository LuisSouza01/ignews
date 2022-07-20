import { GetStaticProps } from 'next';
import * as Prismic from '@prismicio/client';
import Head from 'next/head';

import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';

import styles from './styles.module.scss';

interface PostsProps {
  posts: [
    {
      slug: string
      title: string
      content: string
      updatedAt: string
    }
  ]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Post | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts?.map((post) => (
            <a
              key={post.slug}
              href={`/posts/${post.slug}`}
            >
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.content}</p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.getAllByType('posts');

  const posts = response.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      content: post.data.content.find((content: any) => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
    };
  });

  return {
    props: {
      posts
    }
  }
}
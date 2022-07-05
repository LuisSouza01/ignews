import Document, { Html, Main, Head, NextScript } from 'next/document';

export default class MyDocument extends Document {
 render() {
  return (
    <Html>
      <Head>
        <title>Ignews</title>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
 }
}
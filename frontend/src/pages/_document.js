import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap'
            rel='stylesheet'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'
            rel='stylesheet'
          />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin=''
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto&display=swap'
            rel='stylesheet'
          />
          <link rel='shortcut icon' href='/Ramo_logo.svg' />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id='modal'></div>
        </body>
      </Html>
    );
  }
}

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Hoops Fusion 0.1.0</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet"></link>
        
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;600&display=swap" rel="stylesheet"></link>

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-W6S90RE5C4"></script>
        {

          process.env.NODE_ENV !== 'development' &&
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-W6S90RE5C4');
          `,
            }}
          />
        }
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
import Document, { Html, Head, Main, NextScript } from 'next/document'

const isProd = process.env.ENV_LEVEL === 'production'
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="font-sans h-full w-full">
          <Main />
          <NextScript />
          {isProd && (
            <>
              <script async src="https://www.googletagmanager.com/gtag/js?id=G-G4SXLPN72R"></script>
              <script defer>
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag() { dataLayer.push(arguments); }
                  gtag(\`js\`, new Date());

                  gtag(\`config\`, \`G-G4SXLPN72R\`);
                `}
              </script>
            </>
          )}
        </body>
      </Html>
    )
  }
}

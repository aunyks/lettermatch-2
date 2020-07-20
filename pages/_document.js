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
              <script async>
                {`
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version=\`2.0\`;
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,\`script\`,
                  \`https://connect.facebook.net/en_US/fbevents.js\`);
                  fbq(\`init\`, \`303319057532228\`);
                  fbq(\`track\`, \`PageView\`);
                `}
              </script>
              <noscript>
                <img height="1" width="1" style={{ display: 'none' }}
                  src="https://www.facebook.com/tr?id=303319057532228&ev=PageView&noscript=1"
                />
              </noscript>
            </>
          )}
        </body>
      </Html>
    )
  }
}

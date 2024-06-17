import { ChakraProvider, theme, VisuallyHidden } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const gtagCode = `window.dataLayer = window.dataLayer || [];
                    function gtag() {
                    dataLayer.push(arguments);
                    }
                    gtag('js', new Date());
                    gtag('config', 'G-NDMGLF3H9S');`;
const SchemaORG = {
    "@context": "https://schema.org/",
    "@type": "WebApplication",
    "name": "TPTP - Calcola il tuo voto finale e la tua media universitaria",
    "url": "https://tptp.vercel.app",
    "description": "TPTP ti permette di calcolare il tuo Voto di Laurea e la tua Media Universitaria. " +
        "Inserisci i tuoi corsi ed i relativi voti ed il calcolo sarà automatico. ",
    "image": "https://tptp.vercel.app/images/TPTP-b-bgless.png",
    "alternateName": "TPTP",
    "keywords": "università,media,unipa,calcolo media,media ponderata,voto finale laurea,voto finale,voto",
    "applicationCategory": "Utility",
    "operatingSystem": "Windows,Linux,MacOS,iOS,Android",
    "softwareVersion": "2.2"
}


export default function MyApp({ Component, pageProps }: AppProps) {
    const [lightBackground, darkBackground] = ["#ffffff", "#1a202c"]

    return (
        <ChakraProvider theme={theme}>
            <Head>
                <title>{SchemaORG['name']}</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="description" content={SchemaORG['description']} />
                <Script async src={'https://www.googletagmanager.com/gtag/js?id=G-NDMGLF3H9S'} />
                <Script dangerouslySetInnerHTML={{ __html: gtagCode }} />
                <meta name="google-site-verification" content="Oq3f3LWCCl4gvndQDsIgq0SX8eUFeQZ-18xHphr2OmI" />
                {/* Facebook meta tags*/}
                <meta property="og:title" content="TPTP" key="og:title" />
                <meta
                    property="og:description"
                    content={SchemaORG['description']}
                    key="og:description"
                />
                <meta property="og:url" content="https://tptp.vercel.app/" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/images/TPTP-b-bgless.png" />
                <meta property="og:site_name" content="TPTP" />
                <meta property="og:locale" content="it" />
                {/* Twitter meta tags*/}
                <meta property="twitter:title" content="TPTP" key="twitter:title" />
                <meta
                    property="twitter:description"
                    content={SchemaORG['description']}
                    key="twitter:description"
                />
                <meta property="twitter:card" content="summary" />
                <meta property="twitter:url" content="https://tptp.vercel.app/" />
                <meta property="twitter:image" content="/images/TPTP-b-bgless.png" />
                <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SchemaORG) }} />
                
                {/* Images */}

                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
                <link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#0abab5" />
                <link rel="shortcut icon" href="/images/favicon.ico" />
                <meta name="apple-mobile-web-app-title" content="TPTP" />
                <meta name="application-name" content="TPTP" />
                <meta name="msapplication-TileColor" content="#2b5797" />
                <meta name="msapplication-config" content="/images/browserconfig.xml" />
                {/* 
                //@ts-ignore */}
                <meta name="theme-color" content={lightBackground} media="(prefers-color-scheme: light)" />
                {/* 
                //@ts-ignore */}
                <meta name="theme-color" content={darkBackground} media="(prefers-color-scheme: dark)" />

                <link rel="apple-touch-icon" href="/images/apple-icon-180.png" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-2048-2732.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-2732-2048.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-1668-2388.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-2388-1668.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-1536-2048.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-2048-1536.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-1668-2224.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-2224-1668.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-1620-2160.png" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-2160-1620.png" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-1284-2778.png" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-2778-1284.png" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-1170-2532.png" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-2532-1170.png" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-1125-2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-2436-1125.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-1242-2688.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-2688-1242.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-828-1792.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-1792-828.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-1242-2208.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-2208-1242.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-750-1334.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-1334-750.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-640-1136.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-1136-640.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-2048-2732.png" media="(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-2732-2048.png" media="(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-1668-2388.png" media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-2388-1668.png" media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-1536-2048.png" media="(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-2048-1536.png" media="(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-1668-2224.png" media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-2224-1668.png" media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-1620-2160.png" media="(prefers-color-scheme: dark) and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-2160-1620.png" media="(prefers-color-scheme: dark) and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-1284-2778.png" media="(prefers-color-scheme: dark) and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-2778-1284.png" media="(prefers-color-scheme: dark) and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-1170-2532.png" media="(prefers-color-scheme: dark) and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-2532-1170.png" media="(prefers-color-scheme: dark) and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-1125-2436.png" media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-2436-1125.png" media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-1242-2688.png" media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-2688-1242.png" media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-828-1792.png" media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-1792-828.png" media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-1242-2208.png" media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-2208-1242.png" media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-750-1334.png" media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-1334-750.png" media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-640-1136.png" media="(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/images/apple-splash-dark-1136-640.png" media="(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
            </Head>
            <VisuallyHidden>
                <h1>{SchemaORG['name']}</h1>
                <p>{SchemaORG['description']}</p>
            </VisuallyHidden>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
            <SpeedInsights />
            <Analytics />
        </ChakraProvider>
    )
}
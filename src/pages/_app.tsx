import './main.css'

import { CacheProvider, EmotionCache } from '@emotion/react'
import { DialogResponse, Loading } from '@app/components/'

import type { AppProps } from 'next/app'
import Footer from '@app/layout/footer'
import Head from 'next/head'
import { Navigator } from '@app/layout'
import { Provider } from 'react-redux'
import React from 'react'
import Script from 'next/script'
import { ThemeProvider } from '@mui/material'
import { WattanaTheme } from '@app/config'
import createEmotionCache from '@app/libs/createEmotionCache'
import { initAuth } from '@app/libs'
import { store } from '@app/redux-store'
import { useRouter } from 'next/router'

initAuth()

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  const handleStart = () => {
    setOpen(true)
  }
  const handleComplete = () => {
    setOpen(false)
  }

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  React.useEffect(() => {
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
  }, [router])

  return (
    <CacheProvider value={emotionCache}>
      <Script type="text/javascript" src="https://cdn.omise.co/omise.js" />
      <Head>
        <title>id9property.com</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <Provider store={store}>
        <ThemeProvider theme={WattanaTheme}>
          <Navigator />
          <div style={{ flex: '1 1 0%' }}>
            <Component {...pageProps} />
          </div>
          <div style={{ marginTop: 60 }}></div>
          <Footer />
          <Loading open={open} />
          <DialogResponse />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  )
}

export default MyApp

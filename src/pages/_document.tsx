import { APP_DESCRIPTION, APP_NAME, WattanaTheme } from '@app/config'
import Document, { Head, Html, Main, NextScript } from 'next/document'

import React from 'react'
import { ServerStyleSheets } from '@mui/styles'
import createEmotionCache from '@app/libs/createEmotionCache'
import createEmotionServer from '@emotion/server/create-instance'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#FFFFFF" />
          <meta
            name="description"
            content="id9property แพลตฟอร์มจองโรงแรมออนไลน์"
          />
          <meta
            name="keywords"
            content="id9property, id9property.com,5 Star Resident Rental"
          />
          <meta
            name="theme-color"
            content={WattanaTheme.palette.primary.main}
          />
          <link rel="mainfest" href="/mainfest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props) =>
        sheets.collect(<App emotionCache={cache} {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
      sheets.getStyleElement()
    ]
  }
}

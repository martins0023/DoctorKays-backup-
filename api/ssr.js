import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { StaticRouter } from 'react-router-dom/server'
import App from '../src/App.jsx'  // adjust relative path

export default async function handler(req, res) {
  const url = req.query.pathname || '/'
  const helmetContext = {}

  // Render the app to static markup, capturing Helmet tags
  renderToStaticMarkup(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  )

  const { helmet } = helmetContext
  // Build the head override string
  const head = `
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
  `

  // Fetch your index.html from the static build
  const htmlRes = await fetch(`https://${req.headers.host}/index.html`)
  let html = await htmlRes.text()

  // Replace <head>…</head> with your rendered head
  html = html.replace(
    /<head>[\s\S]*?<\/head>/,
    `<head>\n${head}\n</head>`
  )

  res.setHeader('Content-Type', 'text/html')
  res.status(200).send(html)
}

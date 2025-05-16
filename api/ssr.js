// api/ssr.js
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { StaticRouter } from 'react-router-dom/server'
import App from '../src/App.jsx'       // adjust if your tree is different

export default async function handler(request, response) {
  const url = new URL(request.url)
  const pathname = url.searchParams.get('pathname') || '/'

  // Render the React tree for this URL
  const helmetContext = {}
  const appHtml = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={pathname}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  )

  // Extract the <head> tags Helmet generated
  const { helmet } = helmetContext
  const headTags = `
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
  `

  // Fetch your SPA shell (the index.html)
  const htmlRes = await fetch(`${url.origin}`)
  let html = await htmlRes.text()

  // Inject the Helmet <head> fragments
  html = html.replace(
    /<head>([\s\S]*?)<\/head>/,
    `<head>$1\n${headTags}\n</head>`
  )

  // Finally stream that out:
  response.status(200).send(html)
}

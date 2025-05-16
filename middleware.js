// middleware.js
import { NextResponse } from 'next/server'
import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { StaticRouter } from 'react-router-dom/server'
import App from './src/App.jsx'   // adjust if your App import path differs

// Bot User‑Agents for social previews
const BOT_USER_AGENTS = [
  /facebookexternalhit/i,
  /Twitterbot/i,
  /LinkedInBot/i,
  /Slackbot-LinkExpanding/i,
]

/** Renders your app at `url` and returns the Helmet head tags */
async function renderHelmetHead(url) {
  const helmetContext = {}
  renderToStaticMarkup(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  )
  const { helmet } = helmetContext
  return `
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
  `
}

export async function middleware(request) {
  const ua = request.headers.get('user-agent') || ''
  const isBot = BOT_USER_AGENTS.some((rx) => rx.test(ua))
  if (!isBot) {
    // Regular browser, let the SPA handle it
    return NextResponse.next()
  }

  // Bot request → fetch the static index.html
  const indexHtmlUrl = new URL('/index.html', request.url).toString()
  const res = await fetch(indexHtmlUrl)
  if (!res.ok) return res

  let html = await res.text()
  const headContent = await renderHelmetHead(request.nextUrl.pathname)

  // Inject the rendered <Helmet> tags into the existing <head>
  html = html.replace(
    /<head>([\s\S]*?)<\/head>/,
    `<head>\n${headContent}\n</head>`
  )

  return new Response(html, {
    headers: res.headers,
    status: res.status,
  })
}

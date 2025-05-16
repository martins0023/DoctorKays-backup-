// middleware.js
import { NextResponse } from '@vercel/edge'    // Vercel's edge helper
import { match } from 'path-to-regexp'         // optional, if you need patterns

const BOT_UAS = [
  /facebookexternalhit/i,
  /Twitterbot/i,
  /LinkedInBot/i,
  /Slackbot-LinkExpanding/i,
]

export const config = {
  matcher: '/:path*',  // run on every route
}

export function middleware(request) {
  const ua = request.headers.get('user-agent') || ''
  const isBot = BOT_UAS.some(rx => rx.test(ua))

  if (!isBot) {
    // normal user → serve your SPA as usual
    return NextResponse.next()
  }

  // bots → rewrite to our SSR function
  const url = request.nextUrl.clone()
  url.pathname = '/api/ssr'
  url.searchParams.set('pathname', request.nextUrl.pathname)
  return NextResponse.rewrite(url)
}

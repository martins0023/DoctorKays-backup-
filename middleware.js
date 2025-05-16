import { NextResponse } from 'next/server'

const BOT_USER_AGENTS = [
  /facebookexternalhit/i,
  /Twitterbot/i,
  /LinkedInBot/i,
  /Slackbot-LinkExpanding/i,
]

export function middleware(request) {
  const ua = request.headers.get('user-agent') || ''
  const isBot = BOT_USER_AGENTS.some(rx => rx.test(ua))

  if (!isBot) {
    // normal users: serve client‑side app
    return NextResponse.next()
  }

  // bots: rewrite to our SSR API, passing the pathname
  const url = request.nextUrl.clone()
  url.pathname = '/api/ssr'
  url.searchParams.set('pathname', request.nextUrl.pathname)
  return NextResponse.rewrite(url)
}

// apply to all routes
export const config = {
  matcher: '/:path*',
}

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * URL Routing Middleware
 * - / → BA Home (davidezieshi.vercel.app/)
 * - /Thrillsmotions/* → Creative section
 */
export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Root path → BA Home
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/ba/home', request.url));
    }

    // /Thrillsmotions → Creative section (case-insensitive)
    if (pathname.toLowerCase().startsWith('/thrillsmotions')) {
        // Map /Thrillsmotions paths to /creative paths
        const newPath = pathname.toLowerCase().replace('/thrillsmotions', '/creative');

        // If just /Thrillsmotions, go to creative home
        if (newPath === '/creative' || newPath === '/creative/') {
            return NextResponse.redirect(new URL('/creative/home', request.url));
        }

        // Otherwise rewrite to the corresponding creative path
        return NextResponse.rewrite(new URL(newPath, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match root and /Thrillsmotions paths
        '/',
        '/Thrillsmotions/:path*',
        '/thrillsmotions/:path*',
    ],
};

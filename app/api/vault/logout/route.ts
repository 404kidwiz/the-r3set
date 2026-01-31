import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    const cookieStore = await cookies();
    cookieStore.delete('vault_access');

    return NextResponse.redirect(new URL('/vault', request.url));
}

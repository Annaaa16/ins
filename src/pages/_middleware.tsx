import { NextResponse } from 'next/server';

export function middleware() {
  const response = NextResponse.next();

  response.cookie('set-1', 'value-1');
  response.cookie('set-2', 'value-2');

  response.clearCookie('hello-1');
  response.clearCookie('hello-2');

  return response;
}

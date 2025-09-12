// Production version: src/app/api/spotify-top-tracks/route.ts
import { NextResponse } from 'next/server';

let accessToken: string | null = null;
let accessTokenExpires = 0;

async function refreshAccessToken() {
  const basicAuth = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicAuth}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN || "",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to refresh token: ${JSON.stringify(data)}`);
  }

  accessToken = data.access_token;
  accessTokenExpires = Date.now() + data.expires_in * 1000;
}

export async function GET() {
  try {
    if (!accessToken || Date.now() > accessTokenExpires) {
      await refreshAccessToken();
    }

    const response = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=medium_term",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Spotify API error: ${JSON.stringify(data)}`);
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}
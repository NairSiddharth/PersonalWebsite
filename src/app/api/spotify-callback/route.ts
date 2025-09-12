// Production callback route: src/app/api/spotify-callback/route.ts
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return new Response(
      JSON.stringify({ error: "No authorization code provided" }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const basicAuth = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI || "",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Display the tokens in a nice format
      const htmlResponse = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Spotify Authorization Success</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
            .success { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
            .token { background: #f8f9fa; border: 1px solid #dee2e6; padding: 15px; border-radius: 5px; font-family: monospace; word-break: break-all; }
            .important { background: #fff3cd; color: #856404; padding: 15px; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="success">
            <h2>✅ Authorization Successful!</h2>
            <p>Copy the refresh token below to your .env.local file:</p>
          </div>
          
          <h3>Refresh Token:</h3>
          <div class="token">
            SPOTIFY_REFRESH_TOKEN=${data.refresh_token}
          </div>
          
          <div class="important">
            <h3>⚠️ Important:</h3>
            <ul>
              <li>Add the refresh token above to your <code>.env.local</code> file</li>
              <li>Restart your development server</li>
              <li>This token doesn't expire, so you only need to do this once</li>
              <li>Never commit your .env.local file to version control</li>
            </ul>
          </div>
          
          <p><a href="/">← Back to your app</a></p>
        </body>
        </html>
      `;

      return new Response(htmlResponse, {
        status: 200,
        headers: { 'Content-Type': 'text/html' }
      });
    } else {
      return new Response(
        JSON.stringify({ error: data }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
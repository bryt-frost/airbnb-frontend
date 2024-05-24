'use server';

import { cookies } from 'next/headers';

export async function handleRefresh() {
  console.log('refreshing');
  const refreshToken = await getRefreshToken();

  const token = await fetch('http://127.0.0.1:8000/api/auth/token/refresh', {
    method: 'POST',
    body: JSON.stringify({
      refresh: refreshToken,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.access) {
        cookies().set('sessions_access_token', json.access, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60,
          path: '/',
        });
        return json.access;
      } else {
        resetAuthCokkies();
      }
    })
    .catch((error) => {
      console.log(error);
      resetAuthCokkies();
    });
  return token;
}

export async function handleLogin(
  userId: string,
  accessToken: string,
  refreshToken: string,
) {
  cookies().set('sessions_userid', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  }),
    cookies().set('sessions_access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
    });

  cookies().set('sessions_refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

export async function resetAuthCokkies() {
  cookies().set('sessions_userid', '');
  cookies().set('sessions_refresh_token', '');
  cookies().set('sessions_access_token', '');
}

export async function getUserId() {
  const userId = cookies().get('sessions_userid')?.value;
  return userId ? userId : null;
}

export async function getAccessToken() {
  let accessToken = cookies().get('sessions_access_token')?.value;
  if (!accessToken) {
    accessToken = await handleRefresh();
    return accessToken;
  }
}

export async function getRefreshToken() {
  let refreshToken = cookies().get('sessions_refresh_token')?.value;
  return refreshToken;
}

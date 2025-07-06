// customBaseQuery.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { RootState } from '../store';
import { AccessTokenAction } from '../features/accessTokenSlice';

declare global {
  interface Window {
    _isLoggingOut?: boolean;
  }
}

interface IRefreshResponse {
  accessToken: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://codemap-production.up.railway.app/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.accessToken.accesstoken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

      if (refreshResult.data) {
        const newAccessToken = (refreshResult.data as IRefreshResponse).accessToken;
        api.dispatch(AccessTokenAction(newAccessToken));
        result = await baseQuery(args, api, extraOptions);
      } else {
        if (typeof window !== "undefined" && !window._isLoggingOut) {
          window._isLoggingOut = true;
          window.location.href = "/authpage";
          return { error: { status: 401, data: "Unauthorized" } };
        }
      }
    }

    return result;
  };

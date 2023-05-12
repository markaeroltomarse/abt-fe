import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { read_cookie } from 'sfcookies';

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return read_cookie('token');
  } else {
    return null;
  }
};

export const adminApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API}/api/users`,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  reducerPath: 'adminApi',
  tagTypes: ['GetAdmin'],
  endpoints: (build) => ({
    loginAdmin: build.mutation({
      query: (loginInput: { email: string; password: string }) => {
        return {
          url: `/login`,
          method: 'POST',
          body: loginInput,
        };
      },
    }),
  }),
});

export const {
  useLoginAdminMutation,
  util: { getRunningQueriesThunk, getRunningMutationsThunk },
} = adminApi;
export const { loginAdmin } = adminApi.endpoints;

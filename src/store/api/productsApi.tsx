import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { read_cookie } from 'sfcookies';

interface INewProduct {
  name: string;
}
interface ProductItemsInput {
  dateArrived: string;
  productId: string;
  quantity: number;
  kilo: number;
  from: 'IN' | 'OUT';
  recieptNumber: number;
  customer: string;
}

interface GetItemsInput {
  productId: string;
  page?: number;
  size?: number;
  from?: 'IN' | 'OUT';
  search?: string | undefined;
  startDate?: string;
  endDate?: string;
}

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return read_cookie('token');
  } else {
    return null;
  }
};

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API}/api/products`,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  reducerPath: 'productsApi',
  tagTypes: ['GetProduct', 'GetProducts'],
  endpoints: (build) => ({
    getProduct: build.mutation({
      query: (filter: GetItemsInput) => {
        console.log(filter);
        return {
          url: `/get-items`,
          method: 'POST',
          body: filter,
        };
      },
    }),

    getProducts: build.query({
      query: () => {
        return {
          url: `/all`,
          method: 'GET',
        };
      },
      providesTags: ['GetProducts'],
    }),
    createProduct: build.mutation({
      query: (newProduct: INewProduct, token?: string) => {
        return {
          url: ``,
          method: 'POST',
          body: newProduct,
          headers: {
            authorization: `Bearer ${token || getAccessToken()}`,
          },
        };
      },
    }),

    createItems: build.mutation({
      query: (newItems: ProductItemsInput, token?: string) => {
        return {
          url: `/items`,
          method: 'POST',
          body: newItems,
          headers: {
            authorization: `Bearer ${token || getAccessToken()}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetProductMutation,
  useCreateProductMutation,
  useLazyGetProductsQuery,
  useCreateItemsMutation,
  util: { getRunningQueriesThunk, getRunningMutationsThunk },
} = productsApi;
export const { getProduct, createItems, createProduct, getProducts } =
  productsApi.endpoints;

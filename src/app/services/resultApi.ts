import { TItem, UpdateTItem } from "../types";
import { api } from "./api"


export const resultApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addResult: builder.mutation<TItem, { name: string }>(
               {
                    query: (name) => ({
                         url: "result",
                         method: "POST",
                         body: name,
                    }),
               }),
          updateResult: builder.mutation<TItem, UpdateTItem>({
               query: ({ data, id }) => ({
                    url: `result/${id}`,
                    method: "PUT",
                    body: data,
               }),
          }),
          getAllResult: builder.query<{ rows: TItem[] }, void>({
               query: () => ({
                    url: "result",
                    method: "GET",
               }),
          }),
          getByIdResult: builder.query<TItem, number>({
               query: (id) => ({
                    url: `result/${id}`,
                    method: "GET",
               }),
          }),
          deleteResult: builder.mutation<void, number>({
               query: (id) => ({
                    url: `result/${id}`,
                    method: "DELETE",
               }),
          }),
     }),
})

export const {
     useAddResultMutation,
     useDeleteResultMutation,
     useGetAllResultQuery,
     useGetByIdResultQuery,
     useLazyGetAllResultQuery,
     useLazyGetByIdResultQuery,
     useUpdateResultMutation
} = resultApi
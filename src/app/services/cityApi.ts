import { TItem, UpdateTItem } from "../types";
import { api } from "./api"

export const cityApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addCity: builder.mutation<TItem, { name: string }>(
               {
                    query: ({ name }) => ({
                         url: "city",
                         method: "POST",
                         body: { name },
                    }),
               }),
          updateCity: builder.mutation<UpdateTItem, { id: number, name: string }>({
               query: ({ name, id }) => ({
                    url: `city/${id}`,
                    method: "PUT",
                    body: { name },
               }),
          }),
          getAllCity: builder.query<{ rows: TItem[] }, void>({
               query: () => ({
                    url: "city",
                    method: "GET",
               }),
          }),
          getByIdCity: builder.query<TItem, number>({
               query: (id) => ({
                    url: `city/${id}`,
                    method: "GET",
               }),
          }),
          deleteCity: builder.mutation<void, number>({
               query: (id) => ({
                    url: `city/${id}`,
                    method: "DELETE",
               }),
          }),
     }),
})

export const {
     useAddCityMutation,
     useDeleteCityMutation,
     useGetAllCityQuery,
     useGetByIdCityQuery,
     useLazyGetAllCityQuery,
     useLazyGetByIdCityQuery,
     useUpdateCityMutation
} = cityApi
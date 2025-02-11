import { TCity_TypeNumber, UpdateTCity_TypeNumber } from "../types";
import { api } from "./api"

export const cityApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addCity: builder.mutation<TCity_TypeNumber, { name: string }>(
               {
                    query: ({ name }) => ({
                         url: "city",
                         method: "POST",
                         body: { name },
                    }),
               }),
          updateCity: builder.mutation<UpdateTCity_TypeNumber, { id: number, name: string }>({
               query: ({ name, id }) => ({
                    url: `city/${id}`,
                    method: "PUT",
                    body: { name },
               }),
          }),
          getAllCity: builder.query<{ rows: TCity_TypeNumber[] }, void>({
               query: () => ({
                    url: "city",
                    method: "GET",
               }),
          }),
          getByIdCity: builder.query<TCity_TypeNumber, number>({
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
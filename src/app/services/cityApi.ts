import { City } from "../types";
import { api } from "./api"

export const cityApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addCity: builder.mutation<City, { name: string }>(
               {
                    query: ({ name }) => ({
                         url: "city",
                         method: "POST",
                         body: { name },
                    }),
               }),
          updateCity: builder.mutation<City, { id: number, name: string }>({
               query: ({ name, id }) => ({
                    url: `city/${id}`,
                    method: "PUT",
                    body: { name },
               }),
          }),
          getAllCity: builder.query<City[], void>({
               query: () => ({
                    url: "city",
                    method: "GET",
               }),
          }),
          getByIdCity: builder.query<City, number>({
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
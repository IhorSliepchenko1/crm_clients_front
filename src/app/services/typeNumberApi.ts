import { TItem, UpdateTItem } from "../types";
import { api } from "./api"

export const typeNumberApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addTypeNumber: builder.mutation<TItem, { name: string }>({
               query: ({ name }) => ({
                    url: "type-number",
                    method: "POST",
                    body: { name },
               }),
          }),
          updateTypeNumber: builder.mutation<UpdateTItem, { id: number, name: string }>({
               query: ({ name, id }) => ({
                    url: `type-number/${id}`,
                    method: "PUT",
                    body: { name },
               }),
          }),
          getAllTypeNumber: builder.query<{ rows: TItem[] }, void>({
               query: () => ({
                    url: "type-number",
                    method: "GET",
               }),
          }),
          getByIdTypeNumber: builder.query<TItem, number>({
               query: (id) => ({
                    url: `type-number/${id}`,
                    method: "GET",
               }),
          }),
          deleteTypeNumber: builder.mutation<void, number>({
               query: (id) => ({
                    url: `type-number/${id}`,
                    method: "DELETE",
               }),
          }),
     }),
})

export const {
     useAddTypeNumberMutation,
     useGetAllTypeNumberQuery,
     useLazyGetAllTypeNumberQuery,
     useGetByIdTypeNumberQuery,
     useLazyGetByIdTypeNumberQuery,
     useDeleteTypeNumberMutation,
     useUpdateTypeNumberMutation
} = typeNumberApi
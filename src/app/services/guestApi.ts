import { RaportImport } from "../types"
import { api } from "./api"

export const guestApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addGuest: builder.mutation<RaportImport, { data: FormData }>({
               query: ({ data }) => ({
                    url: "guest",
                    method: "POST",
                    body: data,
               }),
          }),

          deleteGuest: builder.mutation<string, string>({
               query: (fileName) => ({
                    url: "guest",
                    method: "DELETE",
                    body: { fileName }
               }),
          }),
     }),
})

export const {
     useAddGuestMutation,
     useDeleteGuestMutation
} = guestApi
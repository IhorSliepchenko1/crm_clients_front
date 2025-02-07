import { RaportImport } from "../types"
import { api } from "./api"

export const guestApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addGuest: builder.mutation<RaportImport, { data: FormData }>(
               {
                    query: ({ data }) => ({
                         url: "guest",
                         method: "POST",
                         body: data,
                    }),
               }),
          deleteGuest: builder.mutation<string, { name_import_guest_file: string }>({
               query: ({ name_import_guest_file }) => ({
                    url: "guest",
                    method: "DELETE",
                    body: { name_import_guest_file }
               }),
          }),
     }),
})

export const {
     useAddGuestMutation,
     useDeleteGuestMutation
} = guestApi
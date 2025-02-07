import { api } from "./api"
import { RaportImport } from "../types"

export const resultHistoriesApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addResultHistories: builder.mutation<RaportImport, { data: FormData }>(
               {
                    query: ({ data }) => ({
                         url: "result-history",
                         method: "POST",
                         body: data,
                    }),
               }),
          deleteResultHistories: builder.mutation<string, { name_import_result_file: string }>({
               query: ({ name_import_result_file }) => ({
                    url: "result-history",
                    method: "DELETE",
                    body: { name_import_result_file }
               }),
          }),
     }),
})

export const {
     useAddResultHistoriesMutation,
     useDeleteResultHistoriesMutation
} = resultHistoriesApi
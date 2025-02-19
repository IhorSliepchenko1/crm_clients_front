import { api } from "./api"
import { RaportImport } from "../types"

export const resultHistoriesApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addResultHistories: builder.mutation<RaportImport, { data: FormData }>({
               query: ({ data }) => ({
                    url: "result-history",
                    method: "POST",
                    body: data,
               }),
          }),
          deleteResultHistories: builder.mutation<string, { fileName: string }>({
               query: (fileName) => ({
                    url: "result-history",
                    method: "DELETE",
                    body: fileName
               }),
          }),
     }),
})

export const {
     useAddResultHistoriesMutation,
     useDeleteResultHistoriesMutation
} = resultHistoriesApi
import { NumberAdd, NumberDelete, ParamlList, MainRaport, FindInfoNumber, TFindNumber, UpdateNumber } from "../types";
import { api } from "./api"



export const numberApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addNumber: builder.mutation<NumberAdd, { data: FormData }>({
               query: ({ data }) => ({
                    url: "number",
                    method: "POST",
                    body: data,
               }),
          }),
          deleteNumber: builder.mutation<NumberDelete, { data: FormData }>({
               query: ({ data }) => ({
                    url: "number/delete",
                    method: "POST",
                    body: data,
               }),
          }),
          exportFile: builder.mutation<string, { params: ParamlList }>({
               query: ({ params }) => ({
                    url: "number/export-file",
                    method: "POST",
                    params,
               }),
          }),
          getRaport: builder.query<MainRaport[], { city: string }>({
               query: ({ city }) => ({
                    url: "number/raport",
                    method: "GET",
                    params: { city }
               }),
          }),
          findNumber: builder.mutation<FindInfoNumber, TFindNumber>({
               query: ({ number }) => ({
                    url: "number/find-info",
                    method: "POST",
                    body: { number }
               }),
          }),
          updateNumber: builder.mutation<string, { data: UpdateNumber, id: number }>({
               query: ({ data, id }) => ({
                    url: `number/update/${id}`,
                    method: "PUT",
                    body: data,
               }),
          }),
     }),
})

export const {
     useAddNumberMutation,
     useDeleteNumberMutation,
     useGetRaportQuery,
     useLazyGetRaportQuery,
     useExportFileMutation,
     useUpdateNumberMutation,
     useFindNumberMutation
} = numberApi
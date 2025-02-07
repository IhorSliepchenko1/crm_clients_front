import { NumberAdd, NumberDelete, ParamlList } from "../types";
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
          getExportFile: builder.query<{ fileName: string }, { params: ParamlList }>({
               query: (params) => ({
                    url: "number",
                    method: "GET",
                    params,
               }),
          }),
          getRaport: builder.query<any, { city: string }>({
               query: ({ city }) => ({
                    url: "number",
                    method: "GET",
                    params: { city }
               }),
          }),
     }),
})

export const {
     useAddNumberMutation,
     useDeleteNumberMutation,
     useGetExportFileQuery,
     useGetRaportQuery,
     useLazyGetExportFileQuery,
     useLazyGetRaportQuery,
} = numberApi
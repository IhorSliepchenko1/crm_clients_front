import {
  NumberAdd,
  ParamlList,
  FindInfoNumber,
  TFindNumber,
  UpdateNumber,
  TRaportUpdateNumberFile,
  TDataRaport,
} from "../types";
import { api } from "./api";

export const numberApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addNumber: builder.mutation<NumberAdd, { data: FormData }>({
      query: ({ data }) => ({
        url: "number",
        method: "POST",
        body: data,
      }),
    }),
    deleteNumber: builder.mutation<{ message: string }, { data: FormData }>({
      query: ({ data }) => ({
        url: "number/delete",
        method: "POST",
        body: data,
      }),
    }),
    createRaport: builder.mutation<{ message: string }, {}>({
      query: () => ({
        url: "number/create-raport",
        method: "POST",
      }),
    }),
    exportFile: builder.mutation<{ fileName: string }, { params: ParamlList }>({
      query: ({ params }) => ({
        url: "number/export-file",
        method: "POST",
        params,
      }),
    }),
    getRaport: builder.query<TDataRaport, { city: string }>({
      query: ({ city }) => ({
        url: "number/raport",
        method: "GET",
        params: { city },
      }),
    }),
    findNumber: builder.mutation<FindInfoNumber, TFindNumber>({
      query: ({ number }) => ({
        url: "number/find-info",
        method: "POST",
        body: { number },
      }),
    }),
    updateNumber: builder.mutation<string, { data: UpdateNumber; id: number }>({
      query: ({ data, id }) => ({
        url: `number/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    updateNumberFile: builder.mutation<
      TRaportUpdateNumberFile,
      { data: FormData }
    >({
      query: ({ data }) => ({
        url: "number/update-file",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddNumberMutation,
  useDeleteNumberMutation,
  useGetRaportQuery,
  useLazyGetRaportQuery,
  useExportFileMutation,
  useUpdateNumberMutation,
  useFindNumberMutation,
  useUpdateNumberFileMutation,
  useCreateRaportMutation,
} = numberApi;

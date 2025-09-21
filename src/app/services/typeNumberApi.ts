import { TItem } from "../types";
import { api } from "./api";

type TypeNumber = TItem & {
  color: string;
};

type Data = {
  data: {
    name: string;
    color: string;
  };
  id: number;
};

export const typeNumberApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addTypeNumber: builder.mutation<
      TypeNumber,
      {
        name: string;
        color: string;
      }
    >({
      query: (data) => ({
        url: "type-number",
        method: "POST",
        body: data,
      }),
    }),
    updateTypeNumber: builder.mutation<TypeNumber, Data>({
      query: ({ data, id }) => ({
        url: `type-number/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getAllTypeNumber: builder.query<{ rows: TypeNumber[] }, void>({
      query: () => ({
        url: "type-number",
        method: "GET",
      }),
    }),
    getByIdTypeNumber: builder.query<TypeNumber, number>({
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
});

export const {
  useAddTypeNumberMutation,
  useGetAllTypeNumberQuery,
  useLazyGetAllTypeNumberQuery,
  useGetByIdTypeNumberQuery,
  useLazyGetByIdTypeNumberQuery,
  useDeleteTypeNumberMutation,
  useUpdateTypeNumberMutation,
} = typeNumberApi;

import { User, UpdateUser, Register } from "../types";
import { api } from "./api"

export const userApi = api.injectEndpoints({
     endpoints: (builder) => ({
          login: builder.mutation<{ token: string }, { login: string, password: string }>({
               query: (userData) => ({
                    url: "user/login",
                    method: "POST",
                    body: userData,
               }),
          }),

          register: builder.mutation<User, Register>({
               query: (data) => ({
                    url: "user/registration",
                    method: "POST",
                    body: data,
               }),
          }),

          check: builder.query<{ token: string }, void>({
               query: () => ({
                    url: "user/check",
                    method: "GET",
               }),
          }),

          updateUser: builder.mutation<User, UpdateUser>({
               query: ({ data, id }) => ({
                    url: `/user/${id}`,
                    method: "PUT",
                    body: data,
               }),
          }),

          deleteUser: builder.mutation<void, number>({
               query: (id) => ({
                    url: `/user/${id}`,
                    method: "DELETE",
               }),
          }),

          getAllUsers: builder.query<User[], void>({
               query: () => ({
                    url: "user/",
                    method: "GET",
               }),
          }),
     }),
})

export const {
     useRegisterMutation,
     useLoginMutation,
     useCheckQuery,
     useLazyCheckQuery,
     useUpdateUserMutation,
     useDeleteUserMutation,
     useGetAllUsersQuery,
     useLazyGetAllUsersQuery,

} = userApi

export const { endpoints: { login, register, check, updateUser, deleteUser, getAllUsers } } = userApi

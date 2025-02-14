import { DeleteHistory, PageLimit } from "../types";
import { api } from "./api"

export const deleteHistoriesApi = api.injectEndpoints({
     endpoints: (builder) => ({
          allDeleteHistories: builder.query<{
               rows: DeleteHistory[];
               count: number;
          }, PageLimit>({
               query: ({ limit, page }) => ({
                    url: "histories-delete",
                    method: "GET",
                    params: { limit, page }
               }),
          }),
     }),
})

export const {
     useAllDeleteHistoriesQuery,
     useLazyAllDeleteHistoriesQuery
} = deleteHistoriesApi
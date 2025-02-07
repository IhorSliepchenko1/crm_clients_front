import { DeleteHistory, PageLimit } from "../types";
import { api } from "./api"

export const deleteHistoriesApi = api.injectEndpoints({
     endpoints: (builder) => ({
          allImportHistories: builder.query<DeleteHistory[], PageLimit>({
               query: ({ limit, page }) => ({
                    url: "histories-delete",
                    method: "GET",
                    params: { limit, page }
               }),
          }),
     }),
})

export const {
     useAllImportHistoriesQuery,
     useLazyAllImportHistoriesQuery
} = deleteHistoriesApi
import { ImportHistory, PageLimit } from "../types";
import { api } from "./api"

export const importHistoriesApi = api.injectEndpoints({
     endpoints: (builder) => ({
          allImportHistories: builder.query<{
               rows: ImportHistory[];
               count: number;
          }, PageLimit>({
               query: ({ limit, page }) => ({
                    url: "histories-import",
                    method: "GET",
                    params: { limit, page }
               }),
          }),
     }),
})

export const {
     useAllImportHistoriesQuery,
     useLazyAllImportHistoriesQuery
} = importHistoriesApi
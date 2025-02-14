import { useMemo } from "react";

export const useTotalPage = (count?: number, limit?: number): number => {
     return useMemo(() => {
          if (!count || !limit || limit <= 0) return 0;
          return Math.ceil(count / limit);
     }, [count, limit]);
};

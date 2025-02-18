import { useCallback } from "react";

export const useFileValidation = () => {
     return useCallback((file: File) => {
          if (file.type !== "text/csv") {
               throw new Error("Данный формат не поддерживается!");
          }

          if (file.size > 5_000_000) {
               throw new Error("Максимальный объём файла 5мб");
          }
     }, []);
};

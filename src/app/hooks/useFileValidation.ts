import { useReadFile } from "./useReadFile";

type Props = {
  file: File;
  headerCheck?: string[];
  fileStatus?: boolean;
};
const regex = /[а-яёА-ЯЁ ]/u;

export const useFileValidation = () => {
  return async ({ file, headerCheck, fileStatus = false }: Props) => {
    if (file.type !== "text/csv") {
      throw new Error("Данный формат не поддерживается!");
    }

    if (file.size > 25_000_000) {
      throw new Error("Максимальный объём файла 25мб");
    }

    if (regex.test(file.name)) {
      throw new Error("Уберите с названия файла кирилицу и пробелы!");
    }

    if (fileStatus && headerCheck) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const fileData = await useReadFile(file);
      const headerFile = fileData.split("\n")[0].replace("\r", "").split(";");

      if (!headerCheck.every((header) => headerFile.includes(header))) {
        throw new Error("Некорректный файл!");
      }
    }
  };
};

import { useMemo, useState } from "react";
import { Table } from "@mantine/core";
import { LoaderComponent } from "../layout/loader";
import { useCalendarInputDate } from "../../hooks/useCalendarInputDate";
import { useAllImportHistoriesQuery } from "../../services/importHistoriesApi";
import { useAllDeleteHistoriesQuery } from "../../services/deleteHistoriesApi";
import { Pagination } from "../ui/pagination";
import { useTotalPage } from "../../hooks/useTotalPage";

type Props = {
     name: "delete" | "import";
};

export const HistoriesTable: React.FC<Props> = ({ name }) => {
     const [page, setPage] = useState(1);
     const limit = 20;
     const { data: dataImport, isLoading: loadingImport } = useAllImportHistoriesQuery({ limit, page });
     const { data: dataDelete, isLoading: loadingDelete } = useAllDeleteHistoriesQuery({ limit, page });

     const histories = useMemo(() => ({
          data: name === "import" ? dataImport : dataDelete,
          loading: name === "import" ? loadingImport : loadingDelete,
          title1: name === "import" ? "Дубли" : "Удалённые",
          title2: name === "import" ? "Уникальные" : "Не найденные"
     }), [name, loadingImport, loadingDelete, dataImport, dataDelete])

     const { formatDate } = useCalendarInputDate();
     const total = useTotalPage(histories.data?.count, limit)

     const rows = histories.data?.rows?.length
          ? histories.data.rows.map((item, index) => (
               <Table.Tr key={item.id ?? item.login ?? index} className="text-xs">
                    <Table.Td>{'deleteNumber' in item ? item.deleteNumber : item.dublicate}</Table.Td>
                    <Table.Td>{'notFoundNumber' in item ? item.notFoundNumber : item.unique}</Table.Td>
                    <Table.Td>{item.incorrect}</Table.Td>
                    <Table.Td>{item.login}</Table.Td>
                    <Table.Td>{formatDate(item.createdAt)}</Table.Td>
               </Table.Tr>
          ))
          : (
               <Table.Tr>
                    <Table.Td colSpan={5} className="text-center">Нет данных</Table.Td>
               </Table.Tr>
          );

     return (
          <div className="flex flex-col justify-between items-center min-h-[750px] w-full">
               {histories.loading ? (
                    <LoaderComponent />
               ) : (<Table>
                    <Table.Thead>
                         <Table.Tr>
                              <Table.Th>{histories.title1}</Table.Th>
                              <Table.Th>{histories.title2}</Table.Th>
                              <Table.Th>Некорректные</Table.Th>
                              <Table.Th>Инициатор</Table.Th>
                              <Table.Th>Дата</Table.Th>
                         </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
               </Table>
               )}

               <Pagination total={total} setPage={setPage} />
          </div>
     );
};

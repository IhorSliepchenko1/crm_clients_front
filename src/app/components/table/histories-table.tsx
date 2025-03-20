import { useState } from "react";
import { Table } from "@mantine/core";
import { LoaderComponent } from "../layout/loader";
import { useCalendarInputDate } from "../../hooks/useCalendarInputDate";
import { useAllImportHistoriesQuery } from "../../services/importHistoriesApi";
import { Pagination } from "../ui/pagination";
import { useTotalPage } from "../../hooks/useTotalPage";
import { IMPORT_STATUS } from "../../../utils/import";
import { Statuses } from "../../types";

export const HistoriesTable = () => {
     const [page, setPage] = useState(1);
     const limit = 20;
     const { data, isLoading } = useAllImportHistoriesQuery({ limit, page });

     const { formatDate } = useCalendarInputDate();
     const total = useTotalPage(data?.count, limit)

     const importStatusGradiens = (status: Statuses) => {
          switch (status) {
               case IMPORT_STATUS.SUCCESS:
                    return "#2f9e44";
               case IMPORT_STATUS.IN_PROGRESS:
                    return "#f08c00";
               case IMPORT_STATUS.ERROR:
                    return "#e03131";
               default:
                    return "";
          }
     };


     const rows = data?.rows?.length
          ? data.rows.map((item, index) => (
               <Table.Tr key={item.id ?? item.login ?? index} className="text-xs">
                    <Table.Td>{item.duplicates_in_base}</Table.Td>
                    <Table.Td>{item.duplicates_in_file}</Table.Td>
                    <Table.Td>{item.unique_numbers}</Table.Td>
                    <Table.Td>{item.incorrect_numbers}</Table.Td>
                    <Table.Td>{item.delete_numbers}</Table.Td>
                    <Table.Td>{item.not_found_numbers}</Table.Td>
                    <Table.Td>{item.login}</Table.Td>
                    <Table.Td>{item.import_time}</Table.Td>
                    <Table.Td style={{ background: importStatusGradiens(item.import_status) }}>{item.import_status}</Table.Td>
                    <Table.Td style={{ background: item.import_type ? item.import_type.includes("ADD") ? "#2f9e44" : "#e03131" : '' }}>{item.import_type}</Table.Td>
                    <Table.Td>{formatDate(item.updatedAt)}</Table.Td>
               </Table.Tr>
          ))
          : (
               <Table.Tr>
                    <Table.Td colSpan={5} className="text-center">Нет данных</Table.Td>
               </Table.Tr>
          );

     return (
          <div className="flex flex-col justify-between items-center min-h-[750px] w-full">
               {isLoading ? (
                    <LoaderComponent />
               ) : (<Table>
                    <Table.Thead>
                         <Table.Tr>
                              <Table.Th>Дубли в базе</Table.Th>
                              <Table.Th>Дубли в файле</Table.Th>
                              <Table.Th>Импортировано</Table.Th>
                              <Table.Th>Некорректные</Table.Th>
                              <Table.Th>Удалено</Table.Th>
                              <Table.Th>Не обнаружен</Table.Th>
                              <Table.Th>Инициатор</Table.Th>
                              <Table.Th>Завершено за (сек)</Table.Th>
                              <Table.Th>Статус</Table.Th>
                              <Table.Th>Тип</Table.Th>
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

import { useMemo, useState } from "react"
import { useAllImportHistoriesQuery } from "../../services/deleteHistoriesApi"
import { Pagination, Table } from "@mantine/core"
import { LoaderComponent } from "../layout/loader"
import { useCalendarInputDate } from "../../hooks/useCalendarInputDate";

export const DeleteHistoriesTable = () => {
     const [page, setPage] = useState(1)
     let limit = 15
     const { data, isLoading } = useAllImportHistoriesQuery({ limit, page })
     const { calendarDate } = useCalendarInputDate()

     const total = useMemo(() => {
          return data?.count ? Math.ceil(data.count / limit) : 0;
     }, [data?.count, limit]);

     const rows = data?.rows.map((item) => (
          <Table.Tr key={item.id} className="text-xs">
               <Table.Td>{item.deleteNumber}</Table.Td>
               <Table.Td>{item.notFoundNumber}</Table.Td>
               <Table.Td>{item.incorrect}</Table.Td>
               <Table.Td>{item.login}</Table.Td>
               <Table.Td>{calendarDate(item.createdAt)}</Table.Td>
          </Table.Tr>
     ));

     return (
          <div className="flex flex-col justify-between items-center h-[95vh] w-full">
               {isLoading ? (
                    <LoaderComponent />
               ) : (
                    <Table>
                         <Table.Thead>
                              <Table.Tr>
                                   <Table.Th>Удалённые</Table.Th>
                                   <Table.Th>Не найденные</Table.Th>
                                   <Table.Th>Некорректные</Table.Th>
                                   <Table.Th>Удалял</Table.Th>
                                   <Table.Th>Дата удаления</Table.Th>
                              </Table.Tr>
                         </Table.Thead>
                         <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
               )}
               <div className="flex justify-center mt-5">
                    <Pagination total={total} defaultValue={1} onChange={(page) => setPage(page)} />
               </div>
          </div>
     );
};


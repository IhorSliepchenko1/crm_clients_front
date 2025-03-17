import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa"
import { KeyMainRaport } from "../../types"
import { Table } from "@mantine/core"

type Props = {
     sortKey: KeyMainRaport | null
     item: KeyMainRaport
     sortOrder: "asc" | "desc"
     sortData: (key: KeyMainRaport) => void
     title: string
     background: string
}

export const ThRaportTable: React.FC<Props> = ({ sortKey, item, sortOrder, sortData, title, background }) => {
     return (
          <Table.Th onClick={() => sortData(item)} style={{ background: background }}>
               <div className="flex items-center justify-center gap-1">
                    <span className="text-wrap">{title}</span>
                    <span>{sortKey === item ? sortOrder === "asc" ? <FaLongArrowAltUp /> : <FaLongArrowAltDown /> : ''}
                    </span>
               </div>
          </Table.Th>
     )
} 

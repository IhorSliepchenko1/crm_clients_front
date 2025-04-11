import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa"
import { KeyMainRaport } from "../../types"
import { NumberFormatter, Table } from "@mantine/core"

type Props = {
     sortKey: KeyMainRaport | null
     item: KeyMainRaport
     sortOrder: "asc" | "desc"
     sortData: (key: KeyMainRaport) => void
     title: string
     background: string
     numberTitle?: number | string
     procent?: boolean
}

export const ThRaportTable: React.FC<Props> = ({ sortKey, item, sortOrder, sortData, title, background, numberTitle, procent = false }) => {
     return (
          <Table.Th onClick={() => sortData(item)} style={{ background: background }}>
               <div className="flex items-center justify-center gap-1">
                    <div className="grid justify-center items-center">
                         <span className="text-wrap">{title}</span>
                         <span className="text-wrap">
                              {procent ? numberTitle : <NumberFormatter value={numberTitle}
                                   thousandSeparator=" "
                                   decimalSeparator="," />}
                         </span>
                    </div>
                    <span>{sortKey === item ? sortOrder === "asc" ? <FaLongArrowAltUp /> : <FaLongArrowAltDown /> : ''}
                    </span>
               </div>
          </Table.Th>
     )
} 

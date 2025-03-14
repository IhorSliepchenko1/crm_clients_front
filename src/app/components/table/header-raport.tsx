import { Table } from '@mantine/core'
import { ThRaportTable } from '../ui/title-raport-table'
import { KeyMainRaport } from '../../types'

type Props = {
     sortKey: KeyMainRaport | null
     sortOrder: "asc" | "desc"
     sortData: (key: KeyMainRaport) => void
}

type HeaderData = { item: KeyMainRaport, title: string, background: string }

export const HeaderRaport: React.FC<Props> = ({ sortKey, sortOrder, sortData }) => {

     const headerData: HeaderData[] = [
          { item: KeyMainRaport.name, title: "Название", background: '#000000' },
          { item: KeyMainRaport.all_numbers, title: "Всего", background: '#5b5be3' },
          { item: KeyMainRaport.remainder, title: "Остаток", background: '#47478c' },
          { item: KeyMainRaport.procentRemainder, title: "% ост", background: '#3434a4' },
          { item: KeyMainRaport["Согласие"], title: "Согласие", background: '#036936' },
          { item: KeyMainRaport["Не уверенный"], title: "Не уверен", background: '#07934d' },
          { item: KeyMainRaport.procentConsent, title: "% согл", background: '#014c26' },
          { item: KeyMainRaport.numbersOneConsent, title: "номер/согл", background: '#008080' },
          { item: KeyMainRaport["Отказ"], title: "Отказ", background: '#ff0000' },
          { item: KeyMainRaport["Ошибка(возраст)"], title: "Ошибка(возр)", background: '#e6572b' },
          { item: KeyMainRaport["Ошибка(км)"], title: "Ошибка(км)", background: '#a72b06' },
          { item: KeyMainRaport["Но"], title: "Но", background: '#808080' },
          { item: KeyMainRaport.guests, title: "Гости", background: '#4caf50' },
          { item: KeyMainRaport.pairs, title: "Пары", background: '#3d8340' },
          { item: KeyMainRaport.procentGuests, title: "% явки", background: '#147218' },
     ]

     return (
          <Table.Thead >
               <Table.Tr className="text-white text-[12px] sticky -top-1">
                    {
                         headerData.map((item, index) => (
                              <ThRaportTable
                                   key={index}
                                   sortKey={sortKey}
                                   item={KeyMainRaport[item.item]}
                                   sortOrder={sortOrder}
                                   sortData={sortData}
                                   title={item.title}
                                   background={item.background}
                              />
                         ))
                    }
               </Table.Tr>
          </Table.Thead>
     )
}

import { Table } from '@mantine/core'
import { ThRaportTable } from '../ui/title-raport-table'
import { KeyMainRaport, ExampleRaport } from '../../types'
import { RESULT } from '../../../utils/result'



type Props = {
     sortKey: KeyMainRaport | null
     sortOrder: "asc" | "desc"
     sortData: (key: KeyMainRaport) => void
     headerTotal: ExampleRaport
}

type HeaderData = {
     item: KeyMainRaport,
     title: string,
     background: string
     numberTitle?: number | string
}

export const HeaderRaport: React.FC<Props> = ({ sortKey, sortOrder, sortData, headerTotal }) => {

     const headerData: HeaderData[] = [
          { item: KeyMainRaport.name, title: "Название", background: '#000000' },
          { item: KeyMainRaport.all_numbers, title: `Всего`, background: '#5b5be3', numberTitle: headerTotal.all_numbers },
          { item: KeyMainRaport.remainder, title: `Остаток`, background: '#47478c', numberTitle: headerTotal.remainder },
          { item: KeyMainRaport.procentRemainder, title: `% ост`, background: '#3434a4', numberTitle: ` ${headerTotal.procentRemainder.toFixed(2)} %` },
          { item: KeyMainRaport[RESULT.AGREEMENT], title: `Согласие`, background: '#036936', numberTitle: headerTotal[RESULT.AGREEMENT] },
          { item: KeyMainRaport[RESULT.NOT_SURE], title: `Не увере`, background: '#07934d', numberTitle: headerTotal[RESULT.NOT_SURE] },
          { item: KeyMainRaport.procentConsent, title: `% согл`, background: '#014c26', numberTitle: `${headerTotal.procentConsent.toFixed(2)} %` },
          { item: KeyMainRaport.numbersOneConsent, title: `номер/согл`, background: '#008080', numberTitle: headerTotal.numbersOneConsent.toFixed(2) },
          { item: KeyMainRaport[RESULT.REFUSAL], title: `Отказ`, background: '#ff0000', numberTitle: headerTotal[RESULT.REFUSAL] },
          { item: KeyMainRaport[RESULT.ERROR_AGE], title: `Ошибка(возр)`, background: '#e6572b', numberTitle: headerTotal[RESULT.ERROR_AGE] },
          { item: KeyMainRaport[RESULT.ERROR_KM], title: `Ошибка(км)`, background: '#a72b06', numberTitle: headerTotal[RESULT.ERROR_KM] },
          { item: KeyMainRaport[RESULT.NOT_ANSWER], title: `Но`, background: '#808080', numberTitle: headerTotal[RESULT.NOT_ANSWER] },
          { item: KeyMainRaport.guests, title: `Гости`, background: '#4caf50', numberTitle: headerTotal.guests },
          { item: KeyMainRaport.pairs, title: `Пары`, background: '#3d8340', numberTitle: headerTotal.pairs },
          { item: KeyMainRaport.procentGuests, title: `% явки`, background: '#147218', numberTitle: `${headerTotal.procentGuests.toFixed(2)} %` },
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
                                   numberTitle={item.numberTitle}
                              />
                         ))
                    }
               </Table.Tr>
          </Table.Thead>
     )
}

import { Table } from '@mantine/core';
import { useMemo } from 'react'
import { KeyMainRaport, MainRaport } from '../../types';

type Props = {
     dataRaport: MainRaport[] | undefined
     sortKey: KeyMainRaport | null
     sortOrder: "asc" | "desc"
}

export const BodyRaport: React.FC<Props> = ({ dataRaport, sortKey, sortOrder }) => {

     const gradientGuestsConsent = (num: number) => {
          if (num > 30) {
               return "#38761d";
          } else if (num > 25) {
               return "#6aa84f";
          } else if (num > 20) {
               return "#93c47d";
          } else if (num >= 15) {
               return "#f6b26b";
          } else {
               return "#ff0000";
          }
     }
     const gradientRemainder = (num: number) => {
          if (num > 50) {
               return "#93c47d";
          } else if (num > 40) {
               return "#f1c232";
          } else if (num >= 35) {
               return "#ffe599";
          } else {
               return "#e06666";
          }
     }
     const gradientNumbersOneConsent = (num: number) => {
          if (num === 0) {
               return "#38761d";
          } else if (num < 4) {
               return "#38761d";
          } else if (num < 6) {
               return "#93c47d";
          } else if (num > 9) {
               return "#f1c232";
          } else if (num <= 15) {
               return "#e06666";
          } else {
               return "#ff0000";
          }
     }


     const rows = useMemo(() => {
          if (!dataRaport) return [];
          let sortedData = [...dataRaport]

          if (sortKey) {
               sortedData = sortedData.sort((a, b) => {
                    const valueA = a[sortKey]
                    const valueB = b[sortKey]

                    return typeof valueA === "number" && typeof valueB === "number"
                         ? sortOrder === "asc" ? valueA - valueB
                              : valueB - valueA
                         : sortOrder === "asc" ? String(valueA).localeCompare(String(valueB))
                              : String(valueB).localeCompare(String(valueA))
               });
          }

          return sortedData.map((item) => {
               return (
                    <Table.Tr key={item.name}>
                         <Table.Td style={{ background: item.color, color: "white" }}>{item.name}</Table.Td>
                         <Table.Td className="limit-w" >{item.all_numbers}</Table.Td>
                         <Table.Td className="limit-w" >{item.remainder}</Table.Td>
                         <Table.Td className="limit-w" style={{ background: gradientRemainder(item.procentRemainder) }}>{item.procentRemainder.toFixed(2)} %</Table.Td>
                         <Table.Td className="limit-w" >{item["Не уверенный"]}</Table.Td>
                         <Table.Td className="limit-w" >{item["Согласие"]}</Table.Td>
                         <Table.Td className="limit-w" style={{ background: gradientGuestsConsent(item.procentConsent) }}>{item.procentConsent.toFixed(2)} %</Table.Td>
                         <Table.Td className="limit-w" style={{ background: gradientNumbersOneConsent(item.numbersOneConsent) }}>{item.numbersOneConsent.toFixed(2)}</Table.Td>
                         <Table.Td className="limit-w" >{item["Отказ"]}</Table.Td>
                         <Table.Td className="limit-w" >{item["Ошибка(возраст)"]}</Table.Td>
                         <Table.Td className="limit-w" >{item["Ошибка(км)"]}</Table.Td>
                         <Table.Td className="limit-w" >{item["Но"]}</Table.Td>
                         <Table.Td className="limit-w" >{item.guests}</Table.Td>
                         <Table.Td className="limit-w" >{item.pairs}</Table.Td>
                         <Table.Td className="limit-w" style={{ background: gradientGuestsConsent(item.procentGuests) }}>{item.procentGuests.toFixed(2)} %</Table.Td>
                    </Table.Tr>
               );
          });
     }, [dataRaport, sortKey, sortOrder]);

     return (
          <Table.Tbody >{rows}</Table.Tbody>
     )
}

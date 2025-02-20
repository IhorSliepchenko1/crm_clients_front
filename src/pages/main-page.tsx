import { Button, Select, Table } from "@mantine/core"
import { useGetAllCityQuery } from "../app/services/cityApi"
import { useGetRaportQuery } from "../app/services/numberApi"
import { useMemo, useRef, useState } from "react"
import { LoaderComponent } from "../app/components/layout/loader"
import { useDownloadPDF } from "../app/hooks/useDownloadPDF"

export const MainPage = () => {
  const [value, setValue] = useState<string | null>('Tashkent');

  const { data: dataCity, isLoading: loadingCity } = useGetAllCityQuery()
  const { data: dataRaport, isLoading: loadingRaport } = useGetRaportQuery({ city: value as string })

  const data = useMemo(() => {
    if (dataCity) {
      const data = dataCity.rows.map((item) => item.name)
      return data
    }

  }, [loadingCity, dataCity])


  const rows = useMemo(() => {
    if (!dataRaport) return null
    return Object.entries(dataRaport).map(([item, details]) => {
      const remainder =
        details.all_numbers > 0
          ? details.all_numbers -
          details["Ошибка(возраст)"] -
          details["Ошибка(км)"] -
          details["Согласие"] -
          details["Отказ"] -
          details["Не уверенный"]
          : 0;

      const procentRemainder =
        details.all_numbers > 0 ? (remainder / details.all_numbers) * 100 : 0;

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

      const procentGuests =
        details["Согласие"] + details["Не уверенный"] > 0
          ? (details.guests /
            (details["Согласие"] + details["Не уверенный"])) *
          100
          : 0;


      const procentConsent = details['Согласие'] > 0 || details['Не уверенный']
        ? ((
          details["Согласие"] +
          details["Не уверенный"]
        )
          /
          (
            details["Ошибка(возраст)"] +
            details["Ошибка(км)"] +
            details["Согласие"] +
            details["Отказ"] +
            details["Не уверенный"]
          )) *
        100
        : 0;

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


      const numbersOneConsent = details["Согласие"] > 0 || details["Не уверенный"] > 0 ?
        ((
          details["Ошибка(возраст)"] +
          details["Ошибка(км)"] +
          details["Согласие"] +
          details["Отказ"] +
          details["Не уверенный"] +
          details["Согласие"] +
          details["Не уверенный"]
        )) / (
          details["Согласие"] +
          details["Не уверенный"]
        )

        : 0

      const gradientNumbersOneConsent = (num: number) => {
        if (num < 4) {
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

      return (
        <Table.Tr key={item}>
          <Table.Td style={{ background: details.color, color: "white" }}>{item}</Table.Td>
          <Table.Td>{details.all_numbers}</Table.Td>
          <Table.Td>{remainder}</Table.Td>
          <Table.Td style={{ background: gradientRemainder(procentRemainder) }}>{procentRemainder.toFixed(2)} %</Table.Td>
          <Table.Td>{details["Согласие"]}</Table.Td>
          <Table.Td>{details["Не уверенный"]}</Table.Td>
          <Table.Td style={{ background: gradientGuestsConsent(procentConsent) }}>{procentConsent.toFixed(2)} %</Table.Td>
          <Table.Td style={{ background: gradientNumbersOneConsent(numbersOneConsent) }}>{numbersOneConsent.toFixed(2)}</Table.Td>
          <Table.Td>{details["Отказ"]}</Table.Td>
          <Table.Td>{details["Ошибка(возраст)"]}</Table.Td>
          <Table.Td>{details["Ошибка(км)"]}</Table.Td>
          <Table.Td>{details["Но"]}</Table.Td>
          <Table.Td>{details.guests}</Table.Td>
          <Table.Td>{details.pairs}</Table.Td>
          <Table.Td style={{ background: gradientGuestsConsent(procentGuests) }}>{procentGuests.toFixed(2)} %</Table.Td>
        </Table.Tr>
      );
    });
  }, [dataRaport]);


  const pdfRef = useRef<HTMLTableElement>(null)

  const { downloadPDF } = useDownloadPDF({
    pdfRef,
    fileName: "raport"
  })

  const handleDownload = () => downloadPDF();
  // const handleClose = () => setRaport(null);

  return (
    <div className="flex flex-col gap-10">
      <Select
        label="Города"
        placeholder="Выберите город для показа рапорта"
        data={data}
        value={value}
        onChange={setValue} />

      {loadingRaport ? <LoaderComponent styles="h-[25vw]" /> :
        <Table className="table-raport" ref={pdfRef}>
          <Table.Thead >
            <Table.Tr style={{ color: "white" }}>
              <Table.Th style={{ background: "black" }}>Название</Table.Th>
              <Table.Th style={{ background: "#5b5be3" }}>К-во номеров</Table.Th>
              <Table.Th style={{ background: "#47478c" }}>Остаток</Table.Th>
              <Table.Th style={{ background: "#3434a4" }}>% остатка</Table.Th>
              <Table.Th style={{ background: "#07934d" }}>Не уверенный</Table.Th>
              <Table.Th style={{ background: "#036936" }}>Согласие</Table.Th>
              <Table.Th style={{ background: "#014c26" }}>% согласий+неув</Table.Th>
              <Table.Th style={{ background: "teal" }}>номер на 1 согл</Table.Th>
              <Table.Th style={{ background: "red" }}>Отказ</Table.Th>
              <Table.Th style={{ background: "#e6572b" }}>Ошибка(возраст)</Table.Th>
              <Table.Th style={{ background: "#a72b06" }}>Ошибка(км)</Table.Th>
              <Table.Th style={{ background: "gray" }}>Но</Table.Th>
              <Table.Th style={{ background: "#4caf50" }}>Гости</Table.Th>
              <Table.Th style={{ background: "#3d8340" }}>Пары</Table.Th>
              <Table.Th style={{ background: "#147218" }}>% явки</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody >{rows}</Table.Tbody>
        </Table>
      }
      <Button
        variant="outline"
        color="green"
        size="xs"
        radius="xs"
        onClick={handleDownload}>
        скачать PDF
      </Button>
    </div>
  )
}

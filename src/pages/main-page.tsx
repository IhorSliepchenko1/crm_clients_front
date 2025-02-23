import { Button, Select, Table } from "@mantine/core"
import { useGetAllCityQuery } from "../app/services/cityApi"
import { useGetRaportQuery } from "../app/services/numberApi"
import { useMemo, useRef, useState } from "react"
import { LoaderComponent } from "../app/components/layout/loader"
import { useDownloadPDF } from "../app/hooks/useDownloadPDF"
import { KeyMainRaport } from "../app/types"
import { ThRaportTable } from "../app/components/ui/title-raport-table"
import { HeaderRaport } from "../app/components/table/header-raport"

export const MainPage = () => {
  const [value, setValue] = useState<string | null>('Tashkent');

  const { data: dataCity, isLoading: loadingCity } = useGetAllCityQuery()
  const { data: dataRaport, isLoading: loadingRaport } = useGetRaportQuery({ city: value as string })

  const [sortKey, setSortKey] = useState<KeyMainRaport | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const pdfRef = useRef<HTMLTableElement>(null)

  const { downloadPDF } = useDownloadPDF({
    pdfRef,
    fileName: "raport"
  })
  const handleDownload = () => downloadPDF();
  const sortData = (key: KeyMainRaport) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };
  const data = useMemo(() => {
    if (dataCity) {
      const data = dataCity.rows.map((item) => item.name)
      return data
    }

  }, [loadingCity, dataCity])
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
    loadingRaport ? <LoaderComponent /> :
      <div className="flex flex-col gap-20">

        <Select
          label="Города"
          placeholder="Выберите город для показа рапорта"
          data={data}
          value={value}
          onChange={setValue}
        />

        <div className="flex flex-col w-fit m-auto gap-2">
          <Button
            variant="outline"
            color="green"
            size="xs"
            radius="xs"
            onClick={handleDownload}>
            скачать PDF
          </Button>
          <Table className="table-raport" ref={pdfRef}>
            <HeaderRaport sortKey={sortKey} sortOrder={sortOrder} sortData={sortData} />
            <Table.Tbody >{rows}</Table.Tbody>
          </Table>
        </div>
      </div>

  )
}

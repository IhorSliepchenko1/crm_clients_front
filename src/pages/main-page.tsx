import { useMemo, useRef, useState } from "react"
import { Button, Select, Table } from "@mantine/core"
import { useGetAllCityQuery } from "../app/services/cityApi"
import { useGetRaportQuery } from "../app/services/numberApi"
import { LoaderComponent } from "../app/components/layout/loader"
import { useDownloadPDF } from "../app/hooks/useDownloadPDF"
import { KeyMainRaport } from "../app/types"
import { HeaderRaport } from "../app/components/table/header-raport"
import { BodyRaport } from "../app/components/table/body-raport"

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

  return (
    loadingRaport ? <LoaderComponent /> :
      <div className="flex flex-col gap-5">

        <Select
          label="Города"
          placeholder="Выберите город для показа рапорта"
          data={data}
          value={value}
          onChange={setValue}
          allowDeselect={false}
        />

        <div className="flex flex-col w-fit m-auto gap-2 pb-10">
          <Button
            variant="outline"
            color="green"
            size="xs"
            radius="xs"
            onClick={handleDownload}>
            скачать PDF
          </Button>
          <div className="container-table">
            <Table className="table-raport" ref={pdfRef}>
              <HeaderRaport sortKey={sortKey} sortOrder={sortOrder} sortData={sortData} />
              <BodyRaport dataRaport={dataRaport} sortKey={sortKey} sortOrder={sortOrder} />
            </Table>
          </div>
        </div>
      </div>

  )
}

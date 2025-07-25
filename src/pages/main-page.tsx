import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Select, Table } from "@mantine/core";
import { useGetAllCityQuery } from "../app/services/cityApi";
import { useGetRaportQuery } from "../app/services/numberApi";
import { LoaderComponent } from "../app/components/layout/loader";
import { useDownloadPDF } from "../app/hooks/useDownloadPDF";
import { KeyMainRaport } from "../app/types";
import { HeaderRaport } from "../app/components/table/header-raport";
import { BodyRaport } from "../app/components/table/body-raport";
import { useCalendarInputDate } from "../app/hooks/useCalendarInputDate";
import { CreateRaport } from "../app/components/button/create-raport";
import { useCheckValidToken } from "../app/hooks/useCheckValidToken";
import { ROLES } from "../utils/role-list";
import { RESULT } from "../utils/result";

export const MainPage = () => {
  const { decoded } = useCheckValidToken();

  const [value, setValue] = useState<string | null>("Tashkent");

  const { data: dataCity, isLoading: loadingCity } = useGetAllCityQuery();
  const { data: dataRaport, isLoading: loadingRaport } = useGetRaportQuery({
    city: value as string,
  });

  const [sortKey, setSortKey] = useState<KeyMainRaport | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sticky, setSticky] = useState(true);
  const pdfRef = useRef<HTMLTableElement>(null);
  const { formatDate } = useCalendarInputDate();
  const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const { downloadPDF } = useDownloadPDF({
    pdfRef,
    fileName: value ? value : "raport",
  });
  const handleDownload = async () => {
    setSticky(false);
    await wait(100);
    downloadPDF();
    setSticky(true);
  };

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
      const data = dataCity.rows.map((item) => item.name);
      return data;
    }
  }, [loadingCity, dataCity]);

  const headerTotal = useMemo(() => {
    if (dataRaport) {
      return dataRaport.headerTotal;
    } else {
      return {
        all_numbers: 0,
        remainder: 0,
        [RESULT.AGREEMENT]: 0,
        [RESULT.NOT_SURE]: 0,
        [RESULT.REFUSAL]: 0,
        [RESULT.ERROR_AGE]: 0,
        [RESULT.ERROR_KM]: 0,
        [RESULT.NOT_ANSWER]: 0,
        guests: 0,
        pairs: 0,
        procentConsent: 0,
        procentRemainder: 0,
        numbersOneConsent: 0,
        procentGuests: 0,
      };
    }
  }, [loadingRaport, dataRaport]);

  return loadingRaport ? (
    <LoaderComponent />
  ) : (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 items-center">
        <Button color="green" size="xs" radius="xs" onClick={handleDownload}>
          скачать PDF
        </Button>
        {[ROLES.ADMIN, ROLES.USER].includes(decoded.role) && (
          <CreateRaport city={value as string} />
        )}
      </div>
      {dataRaport ? (
        <div className="flex flex-col w-fit m-auto gap-2 pb-10">
          <Select
            label="Города"
            placeholder="Выберите город для показа рапорта"
            data={data}
            value={value}
            onChange={setValue}
            allowDeselect={false}
          />
          <p>
            Рапорт был обновлён:{" "}
            {<b>{formatDate(dataRaport.lastUpdateRaport)}</b>}
          </p>
          <div className="max-h-[550px] overflow-y-auto scroll-w">
            <Table className="bg-white text-black border-style" ref={pdfRef}>
              <HeaderRaport
                headerTotal={headerTotal}
                sortKey={sortKey}
                sortOrder={sortOrder}
                sortData={sortData}
                sticky={sticky}
              />
              <BodyRaport
                dataRaport={dataRaport.raport}
                sortKey={sortKey}
                sortOrder={sortOrder}
              />
            </Table>
          </div>
        </div>
      ) : (
        <p>
          Данных на сервере не обнаружено, задействуйте принудительное создание
          рапорта
        </p>
      )}
    </div>
  );
};

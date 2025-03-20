import { useExportFileMutation } from "../app/services/numberApi"
import { useForm } from "@mantine/form";
import { errorMessages } from "../utils/has-error-field";
import { useNotification } from "../app/hooks/useNotification/useNotification";
import { ParamlList } from "../app/types";
import { useEffect, useMemo, useState } from "react";
import { BASE_URL } from "../constants";
import { Button, Tabs } from "@mantine/core";
import { FilterForm } from "../app/components/form/filter-form";
import { FindNumber } from "../app/components/features/numbers/find-number";
import { useGetAllCityQuery } from "../app/services/cityApi";
import { useGetAllTypeNumberQuery } from "../app/services/typeNumberApi";
import { useGetAllResultQuery } from "../app/services/resultApi";
import { UpdateNumberFile } from "../app/components/features/numbers/update-number-file";
import { useAutoDownloadFile } from "../app/hooks/useAutoDownloadFile";

export const FilterDatabase = () => {
  const form = useForm({
    mode: 'uncontrolled',

    validate: {
      dob: (value) => (value && (value.split("-").length > 2 || value.split("-").length < 2) ? "Заполните как указано в примере!" : null),
      update_count: (value) => (value && (value.split("-").length > 2 || value.split("-").length < 2) ? "Заполните как указано в примере!" : null),
      first_call_date: (value) => (value && (value.split("-").length > 2 || value.split("-").length < 2) ? "Заполните как указано в примере!" : null),
      last_call_date: (value) => (value && (value.split("-").length > 2 || value.split("-").length < 2) ? "Заполните как указано в примере!" : null),
      presentation_date: (value) => (value && (value.split(".").length > 3 || value.split(".").length < 3) ? "Заполните как указано в примере!" : null),
    },
  });

  const [exportFile, { isLoading }] = useExportFileMutation()
  const { succeed, error } = useNotification()
  const [fileName, setFileName] = useState('')

  const { data: city, isLoading: loadingCity } = useGetAllCityQuery()
  const { data: typeNumber, isLoading: loadingTypeNumber } = useGetAllTypeNumberQuery()
  const { data: result, isLoading: loadingResult } = useGetAllResultQuery()

  const dataCity = useMemo(() => {
    if (city) {
      const data = city.rows.map((item) => item.name)
      return data
    }
  }, [loadingCity, city])


  const dataTypeNumber = useMemo(() => {
    if (typeNumber) {
      const data = typeNumber.rows.map((item) => item.name)
      return data
    }
  }, [loadingTypeNumber, typeNumber])

  const dataResult = useMemo(() => {
    if (result) {
      const data = result.rows.map((item) => item.name)
      const dataCopy = JSON.parse(JSON.stringify(data))
      dataCopy.push('Не звонили')
      return dataCopy
    }
  }, [loadingResult, result])

  const onSubmit = async (params: ParamlList) => {
    try {
      const response = await exportFile({ params }).unwrap();
      setFileName(response)
      succeed("Файл успешно импортирован");
      form.reset()

    } catch (err) {
      form.reset()
      error(errorMessages(err));
    }
  }

  const { autoDownloadFile } = useAutoDownloadFile()

  useEffect(() => {
    if (fileName) {
      autoDownloadFile(BASE_URL, fileName)
    }
    setFileName('')
  }, [fileName])

  const cleanForm = () => form.reset()


  return (

    <Tabs defaultValue="main" variant="pills" radius="xs" >
      <Tabs.List>
        <Tabs.Tab value="main" color="green" >
          Поиск базы/номера
        </Tabs.Tab>
        <Tabs.Tab value="changes">
          блок/разблок через файл
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="main" className='p-5'>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <div className="flex justify-end">
              <Button variant="filled" color="gray" size="xs" radius="md" onClick={cleanForm}>очистить</Button>
            </div>
            <FilterForm
              form={form}
              onSubmit={onSubmit}
              isLoading={isLoading}
              dataCity={dataCity}
              dataResult={dataResult}
              dataTypeNumber={dataTypeNumber}
            />
          </div>
          <div>
            <FindNumber
              dataCity={dataCity}
              dataResult={dataResult}
              dataTypeNumber={dataTypeNumber}
            />
          </div>
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="changes" className='p-5'>
        <UpdateNumberFile />
      </Tabs.Panel>
    </Tabs>
  )
}
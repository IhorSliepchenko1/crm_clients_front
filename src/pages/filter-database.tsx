import { useExportFileMutation } from "../app/services/numberApi"
import { useForm } from "@mantine/form";
import { errorMessages } from "../utils/has-error-field";
import { useNotification } from "../app/hooks/useNotification/useNotification";
import { ParamlList } from "../app/types";
import { useEffect, useMemo, useState } from "react";
import { ButtonSubmit } from "../app/components/button/button-submit";
import { BASE_URL } from "../constants";
import { Button, Select, TextInput } from "@mantine/core";
import { useGetAllCityQuery } from "../app/services/cityApi";
import { useGetAllResultQuery } from "../app/services/resultApi";
import { useGetAllTypeNumberQuery } from "../app/services/typeNumberApi";

export const FilterDatabase = () => {
  const form = useForm({
    mode: 'uncontrolled',

    validate: {
      dob: (value) => (value && (value.split("-").length > 2 || value.split("-").length < 2) ? "Заполните как указано в примере!" : null),
      blocking_period: (value) => (value && (value.split("-").length > 2 || value.split("-").length < 2) ? "Заполните как указано в примере!" : null),
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
  const { data: result, isLoading: loadingResult } = useGetAllResultQuery()
  const { data: typeNumber, isLoading: loadingTypeNumber } = useGetAllTypeNumberQuery()

  const dataCity = useMemo(() => {
    if (city) {
      const data = city.rows.map((item) => item.name)
      return data
    }
  }, [loadingCity, city])

  const dataResult = useMemo(() => {
    if (result) {
      const data = result.rows.map((item) => item.name)
      return data
    }
  }, [loadingResult, result])

  const dataTypeNumber = useMemo(() => {
    if (typeNumber) {
      const data = typeNumber.rows.map((item) => item.name)
      return data
    }
  }, [loadingTypeNumber, typeNumber])

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

  const autoDownloadFile = () => {
    const link = document.createElement(`a`);
    link.setAttribute(`href`, `${BASE_URL}/${fileName}`);
    link.setAttribute(`download`, `${fileName}`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    return
  }

  useEffect(() => {
    if (fileName) {
      autoDownloadFile()
    }
    setFileName('')
  }, [fileName])

  const cleanForm = () => form.reset()
  const yesOrNo = ["да", "нет"]

  return (
    <div>
      <div className="flex justify-end">
        <Button variant="filled" color="gray" size="xs" radius="md" onClick={cleanForm}>очистить</Button>
      </div>
      <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-5 my-10 px-5">
        <div className="flex justify-between items-center">
          <Select
            key={form.key("city")}
            {...form.getInputProps("city")}
            placeholder="Tashkent"
            label="Город"
            data={dataCity}
          />
          <Select
            key={form.key("result")}
            {...form.getInputProps("result")}
            placeholder="Согласие"
            label="Результат"
            data={dataResult}
          />
          <Select
            key={form.key("typeNumber")}
            {...form.getInputProps("typeNumber")}
            placeholder="Жёлтая_1"
            label="Тип базы"
            data={dataTypeNumber}
          />
          <TextInput
            key={form.key("dob")}
            {...form.getInputProps("dob")}
            label="Возраст"
            placeholder="01.01.1980-01.01.1990"
          />
          <TextInput
            key={form.key("blocking_period")}
            {...form.getInputProps("blocking_period")}
            label="Период блокирования"
            placeholder="01.01.1980-01.01.1990"
          />
        </div>
        <div className="flex justify-between items-center">
          <TextInput
            key={form.key("update_count")}
            {...form.getInputProps("update_count")}
            label="К-во попыток набора на номер"
            placeholder="0-5"
          />
          <TextInput
            key={form.key("first_call_date")}
            {...form.getInputProps("first_call_date")}
            label="Дата первого звонка"
            placeholder="01.01.1980-01.01.1990"
          />
          <TextInput
            key={form.key("last_call_date")}
            {...form.getInputProps("last_call_date")}
            label="Дата последнего звонка звонка"
            placeholder="01.01.1980-01.01.1990"
          />
          <TextInput
            key={form.key("presentation_date")}
            {...form.getInputProps("presentation_date")}
            label="Дата презентации (для согласий)"
            placeholder="08.12.2001"
          />
          <Select
            key={form.key("name")}
            {...form.getInputProps("name")}
            placeholder="да"
            label="Наличие имени?"
            data={yesOrNo}
          />
          <Select
            key={form.key("guest")}
            {...form.getInputProps("guest")}
            placeholder="да"
            label="Был ли гостем?"
            data={yesOrNo}
          />
        </div>
        <ButtonSubmit loading={isLoading} text="Скачать базу по фильтру" />
      </form>
    </div>

  )
}
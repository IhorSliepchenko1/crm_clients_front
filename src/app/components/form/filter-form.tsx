import { Select, ComboboxItem, OptionsFilter, TextInput } from '@mantine/core';
import { UseFormReturnType } from "@mantine/form"
import { useGetAllCityQuery } from "../../services/cityApi"
import { useGetAllResultQuery } from "../../services/resultApi"
import { useGetAllTypeNumberQuery } from "../../services/typeNumberApi"
import { useMemo } from "react"
import { ButtonSubmit } from "../button/button-submit"
import { ParamlList } from "../../types"

type Props = {
     form: UseFormReturnType<any>
     onSubmit: (params: ParamlList) => Promise<void>
     isLoading: boolean
}

export const FilterForm: React.FC<Props> = ({ form, onSubmit, isLoading }) => {
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


     const optionsFilter: OptionsFilter = ({ options, search }) => {
          const splittedSearch = search.toLowerCase().trim().split(' ');
          return (options as ComboboxItem[]).filter((option) => {
               const words = option.label.toLowerCase().trim().split(' ');
               return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
          });
     };


     const yesOrNo = ["да", "нет"]
     return (
          <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-5 my-10 px-5">
               <div className="flex justify-between items-center">
                    <Select
                         key={form.key("city")}
                         {...form.getInputProps("city")}
                         placeholder="Tashkent"
                         label="Город"
                         data={dataCity}
                         filter={optionsFilter}
                         searchable
                    />
                    <Select
                         key={form.key("result")}
                         {...form.getInputProps("result")}
                         placeholder="Согласие"
                         label="Результат"
                         data={dataResult}
                         filter={optionsFilter}
                         searchable
                    />
                    <Select
                         key={form.key("typeNumber")}
                         {...form.getInputProps("typeNumber")}
                         placeholder="Жёлтая_1"
                         label="Тип базы"
                         data={dataTypeNumber}
                         filter={optionsFilter}
                         searchable
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
     )
}

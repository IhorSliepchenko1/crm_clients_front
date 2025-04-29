import { Select, ComboboxItem, OptionsFilter, TextInput, MultiSelect } from '@mantine/core';
import { UseFormReturnType } from "@mantine/form"
import { ButtonSubmit } from "../button/button-submit"
import { ParamlList } from "../../types"

type Props = {
     form: UseFormReturnType<any>
     onSubmit: (params: ParamlList) => Promise<void>
     isLoading: boolean
     dataCity: string[] | undefined
     dataResult: string[] | undefined,
     dataTypeNumber: string[] | undefined
}

export const FilterForm: React.FC<Props> = ({ form, onSubmit, isLoading, dataCity, dataResult, dataTypeNumber }) => {
     const optionsFilter: OptionsFilter = ({ options, search }) => {
          const splittedSearch = search.toLowerCase().trim().split(' ');
          return (options as ComboboxItem[]).filter((option) => {
               const words = option.label.toLowerCase().trim().split(' ');
               return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
          });
     };

     const yesOrNo = ["да", "нет"]
     return (
          <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col 2xl:gap-5">
               <div className="2xl:flex justify-between items-center ">
                    <Select
                         key={form.key("city")}
                         {...form.getInputProps("city")}
                         placeholder="Tashkent"
                         label="Город"
                         data={dataCity}
                         filter={optionsFilter}
                         searchable
                    />
                    <MultiSelect
                         key={form.key("result")}
                         {...form.getInputProps("result")}
                         label="Результат"
                         data={dataResult}
                         filter={optionsFilter}
                         searchable
                         className='max-w-[300px]'
                    />

                    <MultiSelect
                         key={form.key("typeNumber")}
                         {...form.getInputProps("typeNumber")}
                         label="Тип базы"
                         data={dataTypeNumber}
                         filter={optionsFilter}
                         searchable
                         className='max-w-[500px]'
                    />
                    <TextInput
                         key={form.key("dob")}
                         {...form.getInputProps("dob")}
                         label="Год рождения"
                         placeholder="1980-1990"
                    />

                    <Select
                         key={form.key("blocking_status")}
                         {...form.getInputProps("blocking_status")}
                         placeholder="да"
                         label="Заблокирован?"
                         data={yesOrNo}
                    />
               </div>
               <div className="2xl:flex justify-between items-center">
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
               <ButtonSubmit loading={isLoading} text="Скачать базу по фильтру" color='green' />
          </form>
     )
}

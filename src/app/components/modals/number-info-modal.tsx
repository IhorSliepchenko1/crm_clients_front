import { Divider, Modal, Select, Textarea, TextInput } from "@mantine/core"
import { FindInfoNumber, UpdateNumber } from "../../types"
import { useForm } from "@mantine/form"
import { ButtonSubmit } from "../button/button-submit"
import { useUpdateNumberMutation } from "../../services/numberApi"
import { useNotification } from "../../hooks/useNotification/useNotification"
import { errorMessages } from "../../../utils/has-error-field"
import { useCalendarInputDate } from "../../hooks/useCalendarInputDate"
import { useMemo } from "react"

type Props = {
     opened: boolean
     close: () => void
     numberInfo: FindInfoNumber
     dataCity: string[] | undefined
     dataTypeNumber: string[] | undefined
}

export const NumberInfoModal: React.FC<Props> = ({ opened, close, numberInfo, dataCity, dataTypeNumber }) => {
     const { full_name, dob, blocking_status, city, typeNumber, createdAt, guests, histories, id, number } = numberInfo

     const form = useForm({
          mode: "uncontrolled",
          initialValues: {
               full_name,
               dob,
               blocking_status: blocking_status ? "да" : "нет",
               city: city.name,
               typeNumber: typeNumber.name
          },

          validate: {
               dob: (value: string | any[]) => (value && (value.length > 4 || value.length < 4) ? "Вы должны ввести только год рождения!" : null),
          },
     });

     const [updateNumber, { isLoading }] = useUpdateNumberMutation()
     const { succeed, error } = useNotification()
     const { formatDate } = useCalendarInputDate()

     const hiatoriesGuest = useMemo(() => {
          const array: string[] = []
          guests.forEach((item) => {

               const itemArray = [
                    `Дата: ${formatDate(item.presentation_date, false)}`,
                    `Время: ${item.presentation_time}`,
                    `Гости/пары: ${item.guests}/${item.pairs}`,
               ].join('\n')

               array.push(itemArray)
          })
          return array.join(`\n\n`)
     }, [guests])

     const hiatoriesCall = useMemo(() => {
          const array: string[] = []

          histories.forEach((item) => {
               const dateEvent = `Дата время встречи: ${item.presentation_date && item.presentation_time
                    ? formatDate(item.presentation_date, false) + " " + item.presentation_time : "-"}`

               const itemArray = [
                    `Дата звонка: ${item.call_date ? formatDate(item.call_date, false) : '-'}`,
                    `Оператор: ${item.operator ?? '-'}`,
                    `Результат: ${item.result.name ?? '-'}`,
                    dateEvent,
                    `Заметка: ${item.note ?? '-'}`
               ].join('\n')

               array.push(itemArray)
          })

          return array.join(`\n\n`)
     }, [histories])


     const onSubmit = async (data: UpdateNumber) => {
          try {
               await updateNumber({ data, id }).unwrap();
               succeed(`Номер обновлён!`)
               form.reset();
               close()

          } catch (err) {
               error(errorMessages(err));
          }
     }

     return (
          <Modal opened={opened} onClose={close} title={`Информация о номере: ${number}`} size="100%">

               <form onSubmit={form.onSubmit(onSubmit)} className="flex justify-between gap-3">
                    <div className="flex flex-col w-[50%] gap-2">
                         <TextInput
                              key={form.key("full_name")}
                              {...form.getInputProps("full_name")}
                              label="ФИО"
                              placeholder="Фамилия Имя Отчество"
                         />
                         <Select
                              key={form.key("city")}
                              {...form.getInputProps("city")}
                              label="Город"
                              data={dataCity}
                         />
                         <Select
                              key={form.key("typeNumber")}
                              {...form.getInputProps("typeNumber")}
                              label="Тип номера"
                              data={dataTypeNumber}
                         />
                         <Select
                              key={form.key("blocking_status")}
                              {...form.getInputProps("blocking_status")}
                              label="Номер заблокирован?"
                              data={["да", "нет"]}
                         />
                         <TextInput
                              key={form.key("dob")}
                              {...form.getInputProps("dob")}
                              label="Год рождения"
                              placeholder="гггг"
                         />
                         <ButtonSubmit loading={isLoading} text="Изменить" disabled={!form.isDirty()} />
                    </div>

                    <Divider orientation="vertical" />
                    <div className="flex flex-col gap-2 w-[50%]">
                         <TextInput
                              label="Добавлен в базу"
                              defaultValue={new Date(createdAt).toLocaleDateString('ru-RU')}
                              disabled
                         />
                         <Textarea
                              resize="vertical"
                              label="История посещения"
                              placeholder="История посещения"
                              defaultValue={hiatoriesGuest}
                         />
                         <Textarea
                              resize="vertical"
                              label="История прозвона"
                              placeholder="История прозвона"
                              defaultValue={hiatoriesCall}
                         />
                    </div>
               </form>
          </Modal>
     )
}
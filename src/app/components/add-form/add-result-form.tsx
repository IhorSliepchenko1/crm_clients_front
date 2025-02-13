import { useForm } from "@mantine/form";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { hasErrorField } from "../../../utils/has-error-field";
import { Select } from "@mantine/core";
import { ButtonSubmit } from "../button/button-submit";
import { useAddResultMutation, useLazyGetAllResultQuery } from "../../services/resultApi";
import { useMemo } from "react";
import { TItem } from "../../types";

type Props = {
     data: {
          rows: TItem[];
     } | undefined
     dataLoading: boolean
}

type Data = { name: string }

const requireResults = [
     "Но",
     "Согласие",
     "Не уверенный",
     "Отказ",
     "Ошибка(км)",
     "Ошибка(возраст)",
];

export const AddResultForm: React.FC<Props> = ({ data, dataLoading }) => {
     const [addResult, { isLoading }] = useAddResultMutation()
     const [triggerAllResultQuery] = useLazyGetAllResultQuery()
     const { succeed, error } = useNotification()

     const missingResult = useMemo(() => {
          if (data) {
               const existingResults = data.rows.map((item) => item.name)
               const resultArray = requireResults.filter(item => {
                    return existingResults.indexOf(item) < 0
               })
               return resultArray
          }

     }, [dataLoading, triggerAllResultQuery, data])

     const form = useForm<Data>({
          mode: "uncontrolled",
          initialValues: { name: "-" },
          validate: {
               name: (value) => (missingResult?.length === 0
                    ? "Все необходимые результаты уже были добавлены!"
                    : requireResults.indexOf(value) < 0
                         ? "Данный результат добавить нельзя!" : null),
          },
     });

     const onSubmit = async (data: Data) => {
          try {
               await addResult(data).unwrap();
               succeed("Новое свойство добавлено!");
               form.reset()
               await triggerAllResultQuery().unwrap();
          } catch (err) {
               console.error(err);
               if (hasErrorField(err)) error(err.data.message)
               else error("Что-то пошло не так. Попробуйте снова.")
          }
     }

     return (
          <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
               <Select
                    label="Результат"
                    placeholder="Выберите результат для добавления"
                    data={missingResult}
                    searchable
                    key={form.key("name")}
                    {...form.getInputProps("name")}
                    disabled={missingResult?.length === 0}
               />
               <ButtonSubmit loading={isLoading} text={"Добавить"} />
          </form>
     )
}

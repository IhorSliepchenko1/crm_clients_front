import { useForm } from "@mantine/form";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { Select } from "@mantine/core";
import { ButtonSubmit } from "../button/button-submit";
import { useAddResultMutation, useLazyGetAllResultQuery } from "../../services/resultApi";
import { useMemo } from "react";
import { TItem } from "../../types";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";
import { ROLES } from "../../../utils/role-list";
import { errorMessages } from "../../../utils/has-error-field";
import { RESULT } from "../../../utils/result";

type Props = {
     data: { rows: TItem[] } | undefined
     dataLoading: boolean
}

type Data = { name: string }



export const AddResultForm: React.FC<Props> = ({ data, dataLoading }) => {
     const form = useForm<Data>({
          mode: "uncontrolled",
          initialValues: { name: "-" },
          validate: {
               name: (value) => (missingResult?.length === 0
                    ? "Все необходимые результаты уже были добавлены!"
                    : RESULT.indexOf(value) < 0
                         ? "Данный результат добавить нельзя!" : null),
          },
     });

     const [addResult, { isLoading }] = useAddResultMutation()
     const [triggerAllResultQuery] = useLazyGetAllResultQuery()
     const { succeed, error } = useNotification()
     const { decoded } = useCheckValidToken()

     const missingResult = useMemo(() => {
          if (data) {
               const existingResults = data.rows.map((item) => item.name)
               const resultArray = RESULT.filter(item => {
                    return existingResults.indexOf(item) < 0
               })
               return resultArray
          }

     }, [dataLoading, triggerAllResultQuery, data])

     const onSubmit = async (data: Data) => {
          try {
               await addResult(data).unwrap();
               succeed("Новый результат добавлен!");
               form.reset()
               await triggerAllResultQuery().unwrap();

          } catch (err) {
               error(errorMessages(err));
          }
     }

     return (
          decoded.role === ROLES.ADMIN && <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
               <Select
                    label="Результат"
                    placeholder="Выберите результат для добавления"
                    key={form.key("name")}
                    {...form.getInputProps("name")}
                    data={missingResult}
                    disabled={missingResult?.length === 0}
               />
               <ButtonSubmit loading={isLoading} text={"Добавить"} />
          </form>
     )
}

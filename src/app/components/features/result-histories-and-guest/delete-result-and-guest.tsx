import { useForm } from "@mantine/form"
import { useNotification } from "../../../hooks/useNotification/useNotification";
import { useDeleteResultHistoriesMutation } from "../../../services/resultHistoriesApi";
import { DontLeave } from "../../ui/dont-leave";
import { ButtonSubmit } from "../../button/button-submit";
import { TextInput } from "@mantine/core";
import { useDeleteGuestMutation } from "../../../services/guestApi";
import { useMemo } from "react";
import { errorMessages } from "../../../../utils/has-error-field";

type Props = {
     type: "result" | "guest"
}

type Data = { fileName: string }

export const DeleteResultAndGuest: React.FC<Props> = ({ type }) => {
     const form = useForm<{ fileName: string }>({
          mode: "uncontrolled",
          initialValues: { fileName: "" },
          validate: {
               fileName: (value) => (!value ? "Обязательное поле!" : null),
          },
     })

     const [deleteResultHistories, { isLoading: isLoadingResult }] = useDeleteResultHistoriesMutation()
     const [deleteGuest, { isLoading: isLoadingGuest }] = useDeleteGuestMutation()

     const actions = useMemo(() => (
          {
               delete: type === "result" ? deleteResultHistories : deleteGuest,
               loading: type === "result" ? isLoadingResult : isLoadingGuest
          }
     ), [type])

     const { succeed, error } = useNotification()

     const onSubmit = async (data: Data) => {
          try {
               const response = await actions.delete(data).unwrap();
               succeed(response)
               form.reset()

          } catch (err) {
               form.reset()
               error(errorMessages(err));
          }
     }

     return (
          <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
               <p>Впишите полное название файла для удаления</p>
               <TextInput
                    key={form.key("fileName")}
                    placeholder="Введите имя файла для удаления"
                    {...form.getInputProps("fileName")}
               />
               <DontLeave />
               <ButtonSubmit loading={actions.loading} text="Удалить" color="red" />
          </form>
     )
}

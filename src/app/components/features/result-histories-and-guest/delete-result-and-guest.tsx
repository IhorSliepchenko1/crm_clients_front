import { useForm } from "@mantine/form"
import { hasErrorField } from "../../../../utils/has-error-field";
import { useNotification } from "../../../hooks/useNotification/useNotification";
import { useDeleteResultHistoriesMutation } from "../../../services/resultHistoriesApi";
import { DontLeave } from "../../ui/dont-leave";
import { ButtonSubmit } from "../../button/button-submit";
import { TextInput } from "@mantine/core";
import { useDeleteGuestMutation } from "../../../services/guestApi";

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

     const actions = type === "result" ? { delete: deleteResultHistories, loading: isLoadingResult, name: "name_import_result_file" } : { delete: deleteGuest, loading: isLoadingGuest, name: "name_import_guest_file" }

     const { succeed, error } = useNotification()

     const onSubmit = async (data: Data) => {
          try {
               const response = await actions.delete(data).unwrap();
               succeed(response)
               form.reset()

          } catch (err: any) {
               console.error(err);
               form.reset()
               const message = hasErrorField(err)
                    ? err?.data?.message
                    : err?.message ?? "Что-то пошло не так. Попробуйте снова.";

               error(message);
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

import { useForm } from "@mantine/form"
import { hasErrorField } from "../../utils/has-error-field";
import { useNotification } from "../hooks/useNotification/useNotification";
import { useDeleteResultHistoriesMutation } from "../services/resultHistoriesApi";
import { DontLeave } from "./ui/dont-leave";
import { ButtonSubmit } from "./button/button-submit";
import { TextInput } from "@mantine/core";

type Data = { name_import_result_file: string }

export const DeleteResultHistories = () => {
     const form = useForm<Data>({
          mode: "uncontrolled",
          initialValues: { name_import_result_file: "" },
          validate: {
               name_import_result_file: (value) => (!value ? "Обязательное поле!" : null),
          },
     })

     const [addFile, { isLoading }] = useDeleteResultHistoriesMutation()
     const { succeed, error } = useNotification()

     const onSubmit = async ({ name_import_result_file }: Data) => {
          try {
               await addFile({ name_import_result_file }).unwrap();
               succeed('Файл успешно импортирован')
               form.reset()

          } catch (err: any) {
               form.reset()
               const message = hasErrorField(err) ? err.data.message : err.message || "Что-то пошло не так. Попробуйте снова.";
               error(message);
          }
     }

     return (
          <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
               <p>Загрузите файл с номера для удаления</p>
               <TextInput
                    key={form.key("name_import_result_file")}
                    placeholder="Введите имя файла для удаления"
                    {...form.getInputProps("name_import_result_file")}
               />
               <DontLeave />
               <ButtonSubmit loading={isLoading} text="Удалить" color="red" />
          </form>
     )
}
